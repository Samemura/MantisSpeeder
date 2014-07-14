var nodeSelectAssignee, nodeSelectStatus, nodeTextareaNote;

function initialize(){
	console.log("tool bar initialized.");
	document.getElementById("btnUpdate").addEventListener('click', btnUpdate_clickHandler);
	document.getElementById("btnAssign").addEventListener('click', btnAssign_clickHandler);
	document.getElementById("btnChangeStatus").addEventListener('click', btnChangeStatus_clickHandler);
	document.getElementById("btnAddNote").addEventListener('click', btnAddNote_clickHandler);

	nodeSelectAssignee = document.getElementById("select_assignee");
	nodeSelectStatus = document.getElementById("select_status");
	nodeTextareaNote = document.getElementById("textare_note");

	window.parent.postMessage({ type: "loaded"}, "*");
}

// event handller ************************************************************************
function btnUpdate_clickHandler(e) {
	window.parent.postMessage({ type: "post", request: "show_update" }, "*");
}
function btnAssign_clickHandler(e) {
	window.parent.postMessage({ type: "post", request: "assign_to", assignee: nodeSelectAssignee.selectedOptions[0].value}, "*");
}
function btnChangeStatus_clickHandler(e) {
	window.parent.postMessage({ type: "post", request: "change_status_to", status: nodeSelectStatus.selectedOptions[0].value}, "*");
}
function btnAddNote_clickHandler(e) {
	window.parent.postMessage({ type: "post", request: "add_note", note: nodeTextareaNote.value}, "*");
}

document.addEventListener('DOMContentLoaded', initialize);


window.addEventListener("message", function(event) {
	if (event.source == window.parent){
		switch (event.data.type) {
		case "post":
			switch (event.data.request) {
			case "update_param":
				console.log("tool bar response received");
				nodeSelectAssignee.innerHTML = event.data.assignee_selection_html;
				nodeSelectStatus.innerHTML = event.data.status_selection_html;
				nodeTextareaNote.value = event.data.note;
				break;
			break;
			}
		}
	
	}else{
		console.log('message from unknown');
	}

}, false);

