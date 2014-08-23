'use strict';

var nick = {};
var total = 0;
var promise = new Promise(function(resolve, reject) {
	$.ajax({
		url: "http://api.transparencia.org.br:80/sandbox/v1/candidatos?estado=MG&cargo=1",
		headers: {"App-Token": "WlnfiCtWlgg7"},
		success: function (data) {
			data.forEach(function(element){
				nick[element.apelido] = element.id;
				total++;
				if(total == 28) resolve();
			});
		}
	});

	var estados = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];

	estados.forEach(function(data){
		$.ajax({
			url: "http://api.transparencia.org.br:80/sandbox/v1/candidatos?estado=" + data + "&cargo=3",
			headers: {"App-Token": "WlnfiCtWlgg7"},
			success: function (data) {
				data.forEach(function(element){
					nick[element.apelido] = element.id;
				});
				total++;
				if(total == 28) resolve();
			}
		});
	});
});

promise.then(function(result) {
  	$.each(nick, function(key, value) {
	  $("p").highlight(key, {caseSensitive: false, className: 'highlight-quem-financia', wordsOnly:true });
	});

    $('.highlight-quem-financia').each(function() {
    	var currentKey = $(this).text();
    	$(this).attr('data-qf-id', nick[currentKey.toUpperCase()]);
    	$(this).attr('rel', 'popover');
    });

    $(document).on('click', '.highlight-quem-financia', function(){
    	Tipped.create($(this), 'Some tooltip text', {
    		behavior: 'sticky'
    	});
    });

}, function(err) {
  console.log(err); // Error: "It broke"
});


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

