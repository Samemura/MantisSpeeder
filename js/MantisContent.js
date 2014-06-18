var portBg;

function getBugId(){
	var node = document.getElementsByName("bug_id")[1];
	return node.value;
}

function getHandlerSelectionHtml(){
	var node = document.getElementsByName("handler_id")[0];
	console.log(node.innerHTML);
	return node.innerHTML;
}

function getNewStatusSelectionHtml(){
	var node = document.getElementsByName("new_status")[0];
	console.log(node.innerHTML);
	return node.innerHTML;
}

function startConnection(){
	portBg = chrome.runtime.connect({name: "content_background"});
	portBg.postMessage({
		status:"loaded",
		url: document.location.href,
		bug_id: getBugId(),
		assignee_selection_html: getHandlerSelectionHtml(),
		status_selection_html: getNewStatusSelectionHtml()
	});

	portBg.onMessage.addListener(function(msg) {
	    console.log("onMessage");
	});
}

// event handler **********************************************************
chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
	if(request.status == "changed"){
	    startConnection();
	}
  }
);

// onLoad ************************************************************************
startConnection();

