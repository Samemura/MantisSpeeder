var iframe_tool_bar, iframe_mantis, idBug, htmlAssigneeSelection, htmlStatusSelection, strNote;

function initialize(){
	var tool_bar_height = 80;
	iframe_tool_bar = document.createElement('iframe');
	iframe_tool_bar.src = chrome.extension.getURL('html/tool_bar.html');
	iframe_tool_bar.style.width = '99%';
	iframe_tool_bar.style.height = tool_bar_height + 'px';

	iframe_mantis = document.createElement('iframe');
	iframe_mantis.src = document.location;
	iframe_mantis.style.width = '99%';
	iframe_mantis.style.height = (document.documentElement.clientHeight - tool_bar_height - 30) + 'px';

	document.documentElement.appendChild(iframe_tool_bar);
	document.documentElement.appendChild(iframe_mantis);
	chrome.runtime.sendMessage({request: "tell_me_note"}, function(response) {
		console.log("note: "+response.note);
		strNote = response.note;
	});
}

function showUpdateIssuePage(bugid){
	document.location = "bug_update_advanced_page.php?bug_id=" + bugid;
}
function assignTo(bugid, assignee){
	document.location =  "bug_assign.php?bug_id=" + bugid + "&handler_id=" + assignee;
}
function changeStatusTo(bugid, status){
	document.location =  "bug_update.php?bug_id=" + bugid + "&status=" + status;
}
function addNote(bugid, note){
	document.location =  "bugnote_add.php?bug_id=" + bugid + "&bugnote_text=" + (note.replace(/\r?\n/g, "%0d%0a")).replace(/\t/g, "%09");
	strNote = note;
	chrome.runtime.sendMessage({request: "remember_note", note: note});
}

function getBugId(document){
	var n = document.getElementsByName("bug_id")[1];
	return n ? n.value : "";
}

function getHandlerSelectionHtml(document){
	var n = document.getElementsByName("handler_id")[0];
	return n ? n.innerHTML : "";
}

function getNewStatusSelectionHtml(document){
	var n = document.getElementsByName("new_status")[0];
	return n ? n.innerHTML : "";
}

function updateParameter(){
	console.log("Mantis content script: update param");
	
	idBug = getBugId(iframe_mantis.contentDocument);
	htmlAssigneeSelection = getHandlerSelectionHtml(iframe_mantis.contentDocument);
	htmlStatusSelection = getNewStatusSelectionHtml(iframe_mantis.contentDocument);
	
	iframe_tool_bar.contentWindow.postMessage({ type: "post",
		                               request: "update_param",
		                               assignee_selection_html: htmlAssigneeSelection,
		                               status_selection_html: htmlStatusSelection,
		                               note: strNote},
		                               "*");
}
function scrollToIssueInfo(doc){
	var xpathResult = doc.evaluate("/html/body/table[3]/tbody/tr[12]/td[1]", doc, null, XPathResult.ANY_TYPE, null);
	xpathResult.iterateNext().scrollIntoView(true);
}

function jumpToNote(doc){
	doc.location = doc.location + "#bugnotes";
}

function dispatchATag(event){
	event.preventDefault();
    window.location = this.href;
}

// event handler **********************************************************
window.addEventListener("message", function(event) {
	if (event.source == iframe_tool_bar.contentWindow){

		switch (event.data.type) {
		case "loaded":
		    console.log("Content script received: tool bar loaded");
			iframe_mantis.contentWindow.addEventListener('load', function(){
				updateParameter();
				scrollToIssueInfo(iframe_mantis.contentDocument);
				
				// prevent link in Iframe.
				var Anchors = iframe_mantis.contentDocument.getElementsByTagName("a");
				for (var i = 0; i < Anchors.length ; i++) {
					if (Anchors[i].outerHTML.indexOf("onclick") < 0){
						Anchors[i].addEventListener("click", dispatchATag, false);
					}
				}

			});
			break;
		
		case "post":
			switch (event.data.request) {
			case "show_update":
				showUpdateIssuePage(idBug);
				break;
			case "assign_to":
				assignTo(idBug, event.data.assignee);
				break;
			case "change_status_to":
				changeStatusTo(idBug, event.data.status);
				break;
			case "add_note":
				addNote(idBug, event.data.note);
				break;
			}
			break;
		}
		
	}else{
		console.log('message from unknown');
	}
}, false);

chrome.runtime.onMessage.addListener(function(msg, sender) {
    if (sender.tab == undefined){	// from background
	    switch(msg.request){
		case "update_issue":
			showUpdateIssuePage(idBug);
			break;
		case "jump_to_note":
			jumpToNote(iframe_mantis.contentDocument);
			break;

	    }
	}
});

document.addEventListener('DOMContentLoaded', function(){
	console.log("Mantis content document: loaded");
	document.body.innerHTML = ""
});

// script loaded ************************************************************************
// window.stop();	// 他のExtension（high contrast）のリトライが終わらなくなる、ファビコンも取得できない。
initialize();
