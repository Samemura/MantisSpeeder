function initialize(){
	console.log("tool bar initialized.");
	document.getElementById("btnUpdate").addEventListener('click', btnUpdate_clickHandler);
	document.getElementById("btnAssign").addEventListener('click', btnAssign_clickHandler);
	document.getElementById("btnChangeStatus").addEventListener('click', btnChangeStatus_clickHandler);
	document.getElementById("btnAddNote").addEventListener('click', btnAddNote_clickHandler);

	window.parent.postMessage({ type: "loaded"}, "*");
}

// event handller ************************************************************************
function btnUpdate_clickHandler(e) {
	window.parent.postMessage({ type: "post", request: "show_update" }, "*");
}
function btnAssign_clickHandler(e) {
	window.parent.postMessage({ type: "post", request: "assign_to", assignee: document.getElementById("select_assignee").selectedOptions[0].value}, "*");
}
function btnChangeStatus_clickHandler(e) {
	window.parent.postMessage({ type: "post", request: "change_status_to", status: document.getElementById("select_status").selectedOptions[0].value}, "*");
}
function btnAddNote_clickHandler(e) {
	window.parent.postMessage({ type: "post", request: "add_note", note: document.getElementById("textare_note").value}, "*");
}

document.addEventListener('DOMContentLoaded', initialize);


window.addEventListener("message", function(event) {
	if (event.source == window.parent){
		switch (event.data.type) {
		case "post":
			switch (event.data.request) {
			case "update_param":
				console.log("tool bar response received");
				document.getElementById("select_assignee").innerHTML = event.data.assignee_selection_html;
				document.getElementById("select_status").innerHTML = event.data.status_selection_html;
				document.getElementById("textare_note").value = event.data.note;
				break;
			break;
			}
		}
	
	}else{
		console.log('message from unknown');
	}

}, false);

