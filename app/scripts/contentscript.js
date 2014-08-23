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
    	Tipped.create($(this), function(){
    		var html = 	'<div class="qf-box">'+
    			'<div class="qf-cabecalho qf-full-width qf-cf">'+
    				'<div class="qf-foto" style="background-image: url(\'http:\/\/divulgacand2014\.tse\.jus\.br\/divulga-cand-2014\/eleicao\/2014\/UF\/MG\/foto\/130000000836\.jpg\');">'+
    				'</div><div class="qf-infos-pessoais">'+
    					'<h1 class="qf-nome qf-no-margin qf-bold">Alexandre Marques - <small class="qf-partido">PPP</small></h1>'+
    					'<p class="fq-cargo-atual qf-no-margin">Deputador Estadual - <span class="qf-estado">MG</span></p>'+
    					'<p class="qf-montante-financiado qf-no-margin">R$ 1.000.000,00</p>'+
    				'</div>'+
    			'</div>'+
    			'<div class="qf-body qf-full-width">'+
    				'<table class="qf-table">'+
    					'<thead>'+
    						'<th class="qf qf-coluna-doador text-left">Doador</th>'+
    						'<th class="qf qf-coluna-valor text-right">Valor ($)</th>'+
    					'</thead>'+
    					'<tbody>'+
    						'<tr class="qf">'+
    							'<td class="qf">ELEICAO 2012 ALEXANDRE DE MORAIS MARQUES VEREADOR</td>'+
    							'<td class="qf">3500.00</td>'+
    						'</tr>'+
    						'<tr class="qf">'+
    							'<td class="qf">EVANDRO FERNANDES MEDEIROS</td>'+
    							'<td class="qf">3500.00</td>'+
    						'</tr>'+
    						'<tr class="qf">'+
    							'<td class="qf">ELEICAO 2012 COMITE FINANCEIRO MG UNICO PMDB JUIZ DE FORA</td>'+
    							'<td class="qf"></td>'+
    						'</tr>'+
    						'<tr class="qf">'+
    							'<td class="qf">ELEICAO 2012 COMITE FINANCEIRO MG UNICO PMDB JUIZ DE FORA</td>'+
    							'<td class="qf">127.80</td>'+
    						'</tr>'+
    					'</tbody>'+
    					'<tfoot>'+
    						'<tr>'+
    							'<td colspan="2"></td>'+
    						'</tr>'+
    					'</tfoot>'+
    				'</table>'+
    			'</div>'+
    		'</div>';

    		return html;

    	}, {
    		// behavior: 'hide',
    		hideOnClickOutside: true,
    		// hideOthers: true,
    		padding: false,
    		radius: false,
    		showOn: {
			  element: 'mouseenter',
			  tooltip: 'mouseenter'
			},
			hideOn: 'click',
			detach: false
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

