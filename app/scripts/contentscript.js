'use strict';

if (window == top) {
  chrome.extension.onRequest.addListener(function(req, sender, sendResponse) {
	chrome.storage.sync.get("blockedUrls", function(obj)
		{
			sendResponse(findCandidato(obj));
		});
  });
}

function escape_regexp(s, ignore) {        
  var special = ["\\", "?", ".", "+", "(", ")", "{", "}", "[", "]", "$", "^", "*"];
  special.forEach(function(re) {
    if (!ignore || ignore.indexOf(re) < 0) 
      s = s.replace(new RegExp("\\" + re, "g"), "\\" + re);
  });
  return s;
}

function check_blacklist(sites_blacklist) {
  if (sites_blacklist) {
    var url = window.location.href;
    var urls = sites_blacklist.split('\n');
    for (var i=0; i < urls.length; i++) {
      var s = urls[i].replace(/^\s+|\s+$/g, '');
      if (s[0] == '#') {
        // If URL starts with #, ignore it       
        continue;
      } else if (s[0] == '|') {
        // If URL starts with | assume it is a real regexp.
        var regexp = new RegExp('^' + s.slice(1) + '$');
        if (url.match(regexp))
          return true;
      } else {
      // Otherwise compare with the URL ('*' is the only wildcard available)
        var s2 = escape_regexp(s, ["*"]).replace(new RegExp("\\*", "g"), ".*");
        var regexp = new RegExp('^' + s2 + '$');
        if (url.match(regexp))
          return true;
      }
    }
  }
  return false;
}

var findCandidato = function(options) {
	
	var blacklisted = check_blacklist(options.blockedUrls);

	// Disable blacklisted sites completely
	//if (blacklisted && !search.mode)
	if (blacklisted)
		return; 
	
	// Retornar algum nome para mostrar como Tooltip no icone do Quem Financia.
	
	return "Quem financia?";
};
