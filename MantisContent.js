var portBg;

function getBugId(){
	var node = document.evaluate("/html/body/table[3]/tbody/tr[3]/td[1]", document, null, XPathResult.ANY_TYPE, null ).iterateNext();
	return node.textContent.replace(/\t/g, "").replace(/\r?\n/g, "");
}

function getHandlerSelectionHtml(){
	var node = document.evaluate("/html/body/table[3]/tbody/tr[28]/td/table/tbody/tr/td[2]/form/select", document, null, XPathResult.ANY_TYPE, null ).iterateNext();
	console.log(node.innerHTML);
	return node.innerHTML;
}

function getNewStatusSelectionHtml(){
	var node = document.evaluate("/html/body/table[3]/tbody/tr[28]/td/table/tbody/tr/td[3]/form/select", document, null, XPathResult.ANY_TYPE, null ).iterateNext();
	console.log(node.innerHTML);
	return node.innerHTML;
}


// onLoad ************************************************************************
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