
// Global accessor that the popup uses.
var candidatos = {};
var selectedCandidato = null;
var selectedId = null;

function updateAddress(tabId) {
  chrome.tabs.sendRequest(tabId, {}, function(candidato) {
    candidatos[tabId] = candidato;
    if (!candidato) {
      chrome.pageAction.hide(tabId);
    } else {
      chrome.pageAction.show(tabId);
      if (selectedId == tabId) {
        updateSelected(tabId);
      }
    }
  });
}

function updateSelected(tabId) {
  selectedCandidato = candidatos[tabId];
  if (selectedCandidato)
    chrome.pageAction.setTitle({tabId:tabId, title:selectedCandidato});
}

chrome.tabs.onUpdated.addListener(function(tabId, change, tab) {
  if (change.status == "complete") {
    updateAddress(tabId);
  }
});

chrome.tabs.onSelectionChanged.addListener(function(tabId, info) {
  selectedId = tabId;
  updateSelected(tabId);
});

// Ensure the current selected tab is set up.
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  updateAddress(tabs[0].id);
});

chrome.pageAction.onClicked.addListener(function (tab){
	// addBlockedUrl();
})

function addBlockedUrl() {
	var blockedUrls = [];
	var key = "blockedUrls";
	
	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {

		var url = tabs[0].url + "*";
		
		chrome.storage.sync.get(key, function(obj)
		{
			blockedUrls = obj[key];
			blockedUrls = blockedUrls + "\n" + url;

			var object = {};
			object[key] = blockedUrls;
			chrome.storage.sync.set(object);
			

		});

	});
	
}

function saveOptions() {
	
}