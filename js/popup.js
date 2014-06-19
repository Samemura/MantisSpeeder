var pageBg;

function initialize(){
	console.log("popup, init");
	pageBg = chrome.extension.getBackgroundPage();
	document.getElementById("select_assignee").innerHTML = pageBg.htmlAssigneeSelection;
	document.getElementById("select_status").innerHTML = pageBg.htmlStatusSelection;
	document.getElementById("textare_note").value = pageBg.strNote;
	console.log(pageBg.strNote);
}

// event handller ************************************************************************
function btnUpdate_clickHandler(e) {
	pageBg.showUpdateIssuePage();
}
function btnAssign_clickHandler(e) {
	pageBg.assignTo(document.getElementById("select_assignee").selectedOptions[0].value);
}
function btnChangeStatus_clickHandler(e) {
	pageBg.changeStatusTo(document.getElementById("select_status").selectedOptions[0].value);
}
function btnAddNote_clickHandler(e) {
	pageBg.addNote(document.getElementById("textare_note").value);
}

// Add event listeners once the DOM has fully loaded by listening for the
// `DOMContentLoaded` event on the document, and adding your listeners to
// specific elements when it triggers.
document.addEventListener('DOMContentLoaded', function () {

	 // Initialization work goes here.
	document.getElementById("btnUpdate").addEventListener('click', btnUpdate_clickHandler);
	document.getElementById("btnAssign").addEventListener('click', btnAssign_clickHandler);
	document.getElementById("btnChangeStatus").addEventListener('click', btnChangeStatus_clickHandler);
	document.getElementById("btnAddNote").addEventListener('click', btnAddNote_clickHandler);
	
	document.getElementById("btnAssign").focus();

	initialize();
});

