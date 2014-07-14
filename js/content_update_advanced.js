function updateIssue(){
	document.getElementsByTagName("form")[2].submit();
}

function scrollToIssueInfo(doc){
	var xpathResult = doc.evaluate("/html/body/form/table/tbody/tr[1]/td[1]", doc, null, XPathResult.ANY_TYPE, null);
	xpathResult.iterateNext().scrollIntoView(true);
}

// event handller ************************************************************************
chrome.runtime.onMessage.addListener(function(msg, sender) {
    if (sender.tab == undefined){	// from extention
	    if (msg.request == "update_issue"){
	    	updateIssue();
	    }
	}
});

// script loaded ************************************************************************
scrollToIssueInfo(document);
