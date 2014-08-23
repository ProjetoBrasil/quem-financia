window.addEventListener('load', function(ev) { 
  document.getElementById("btnBlockUrl").addEventListener("click", function(ev) {
    addBlockedUrlPA();
  }); 
});

function addBlockedUrlPA() {

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
			alert('URL Bloqueada');

		});

	});
	
}