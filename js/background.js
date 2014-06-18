var tabCurr, urlMantis, idBug, htmlAssigneeSelection, htmlStatusSelection, strNote;
strNote = "";

function showUpdateIssuePage(){
	chrome.tabs.update(null, {url: urlMantis + "bug_update_advanced_page.php?bug_id=" + idBug}, null);
}
function assignTo(assignee){
	chrome.tabs.update(null, {url: urlMantis + "bug_assign.php?bug_id=" + idBug + "&handler_id=" + assignee}, null);
}
function changeStatusTo(status){
	chrome.tabs.update(null, {url: urlMantis + "bug_update.php?bug_id=" + idBug + "&status=" + status}, null);
}
function addNote(note){
	chrome.tabs.update(null, {url: urlMantis + "bugnote_add.php?bug_id=" + idBug + "&bugnote_text=" + note}, null);
	strNote = note;
}


function initialize(url, id, assignee, status){
	
	urlMantis = url.substring(0, url.lastIndexOf("/") + 1);
  	idBug = id;
	htmlAssigneeSelection = assignee;
	htmlStatusSelection = status;
	
	var pagePopup = chrome.extension.getViews({type:"popup"})[0];
	if (pagePopup != null){
		pagePopup.initialize();
	}
}

// event handller ************************************************************************
chrome.extension.onConnect.addListener(function(port) {
  console.assert(port.name == "content_background");
  
  port.onMessage.addListener(function(msg) {
        if(msg.status == "loaded"){
			initialize(msg.url, msg.bug_id, msg.assignee_selection_html, msg.status_selection_html);
        }
  });
});

chrome.tabs.onSelectionChanged.addListener(function(tabid){
	chrome.tabs.sendRequest(tabid, {status: "changed"}, function(response) {});
});

chrome.commands.onCommand.addListener(function(command) {
    if(command == "show_update"){
	    showUpdateIssuePage();
	}
});
