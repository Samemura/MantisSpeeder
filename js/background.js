var strNote="";

// event handller ************************************************************************
chrome.commands.onCommand.addListener(function(command) {
    switch(command){
	case "update_issue":
		console.log("command, update issue");
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {request: "update_issue"});
		});
		break;
	case "jump_to_note":
		console.log("command, jump to note");
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {request: "jump_to_note"});
		});
		break;
	}
});

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (sender.tab){	// from extention
	    switch(msg.request){
		case "remember_note":
			strNote = msg.note;
			break;
		case "tell_me_note":
			console.log("note: " + strNote);
			sendResponse({note: strNote});
			break;
	    }
	}
});
