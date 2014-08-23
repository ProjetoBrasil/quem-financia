'use strict';

function pegaDadosFinanciamento(id, anoEleitoral){
  var html = '';
  var jqxhr =
    $.ajax({
      url : 'http://api.transparencia.org.br:80/sandbox/v1/candidatos/' + id + '/doadores?anoEleitoral=' + anoEleitoral,
      type : 'GET',
      beforeSend : function(xhr){
        xhr.setRequestHeader('App-Token', 'WlnfiCtWlgg7');
      },
      success : function(data) {
        // alert( "success" );
        html = montaTabelaFinanciamento(data);
      },
      async : false
    });
  return html;
}

function pegaDadosPolitico(id){
  var html = '';
  var jqxhr =
    $.ajax({
      url : 'http://api.transparencia.org.br:80/sandbox/v1/candidatos/' + id,
      type : 'GET',
      beforeSend : function(xhr){
        xhr.setRequestHeader('App-Token', 'WlnfiCtWlgg7');
      },
      success : function(data) {
        // alert( "success" );
        html = montaTabelaDadosPoliticos(data);
      },
      async : false
    });
  return html;
}

function pegaBensPolitico(id){
  var html = '';
  var jqxhr =
    $.ajax({
      url : 'http://api.transparencia.org.br:80/sandbox/v1/candidatos/' + id + '/bens/',
      type : 'GET',
      beforeSend : function(xhr){
        xhr.setRequestHeader('App-Token', 'WlnfiCtWlgg7');
      },
      success : function(data) {
        // alert( "success" );
        html = montaTabelaBensPoliticos(data);
      },
      async : false
    });
  return html;
}

function showHideQFMenu(id){



}

function montaTabelaDadosPoliticos(data){
  return '<div class="qf-box">'+
          '<div class="qf-cabecalho qf-full-width qf-cf">'+
            // '<a href="javascript:;"" class="close-tooltip">click to close</a>'+
            '<div class="qf-foto" style="background-image: url('+ data.foto +');">'+
            '</div><div class="qf-infos-pessoais">'+
              '<h1 class="qf-nome qf-no-margin qf-bold">' + data.apelido + ' - <small class="qf-partido">' + data.partido + '</small></h1>'+
              '<p class="fq-cargo-atual qf-no-margin">' + data.cargo + ' - <span class="qf-estado">' + data.estado + '</span></p>'+
              // '<p class="qf-montante-financiado qf-no-margin">' + data + '</p>'+
            '</div>'+
            '</div><div id="qf-menu-poitico"><span class="qf-botoes-tabelas" onclick="$(\'#qf-table-\' + this.id).show().siblings().hide();" id="bens">Bens</span><span class="qf-botoes-tabelas" onclick="$(\'#qf-table-\' + this.id).show().siblings().hide();" id="doacoes">Doações</span></div>';

}

function montaTabelaFinanciamento(data){

  var tableHtml = '<div id="qf-table-doacoes" class="qf-body qf-full-width">'+
            '<table class="qf-table">'+
              '<thead>'+
                '<th class="qf qf-coluna-doador text-left">Doador</th>'+
                '<th class="qf qf-coluna-valor text-right">Montante (R$)</th>'+
              '</thead>'+
              '<tbody>';
  $.each(data, function(){
    tableHtml = tableHtml + '<tr class="qf">';
    tableHtml = tableHtml + '<td class="qf">' + this.nome + '</td>';
    tableHtml = tableHtml + '<td class="qf">' + this.montante + '</td>';
    tableHtml = tableHtml + '</tr>';
  });
  tableHtml = tableHtml + '</tbody>'+
              '<tfoot>'+
                '<tr>'+
                  '<td colspan="2"></td>'+
                '</tr>'+
              '</tfoot>'+
            '</table>'+
          '</div>';
  return tableHtml;
};

function montaTabelaBensPoliticos(data){

  var tableHtml = '<div id="qf-table-bens" class="qf-body qf-full-width qf-hide">'+
            '<table class="qf-table">'+
              '<thead>'+
                '<th class="qf qf-coluna-doador text-left">Bem</th>'+
                '<th class="qf qf-coluna-valor text-right">Valor (R$)</th>'+
              '</thead>'+
              '<tbody>';
  $.each(data, function(){
    tableHtml = tableHtml + '<tr class="qf">';
    tableHtml = tableHtml + '<td class="qf">' + this.bem + '</td>';
    tableHtml = tableHtml + '<td class="qf">' + this.montante + '</td>';
    tableHtml = tableHtml + '</tr>';
  });
  tableHtml = tableHtml + '</tbody>'+
              '<tfoot>'+
                '<tr>'+
                  '<td colspan="2"></td>'+
                '</tr>'+
              '</tfoot>'+
            '</table>'+
          '</div>';
  return tableHtml;
};

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
    		var html = pegaDadosPolitico($(this).attr('data-qf-id')) + '<div>' +
                   pegaDadosFinanciamento($(this).attr('data-qf-id'), 2010) +
                   pegaBensPolitico($(this).attr('data-qf-id')) + '</div>';
                   // pegaDadosFinanciamento($(this).attr('data-qf-id'), 2010) +
                   // pegaDadosFinanciamento($(this).attr('data-qf-id'), 2008);

    		return html;

    	}, {
    		padding: false,
    		radius: false,
    		showOn: {
  			  element: 'mouseenter',
  			  tooltip: 'mouseenter'
  			}
    	});
    });

}, function(err) {
  console.log(err); // Error: "It broke"
});

// Verificação inicial se o ícone será mostrado ou não.
if (window == top) {

  chrome.extension.onRequest.addListener(function(req, sender, sendResponse) {
	chrome.storage.sync.get("blockedUrls", function(obj)
		{
			sendResponse(findCandidato(obj));
		});
  });
}

// Verificação da URL da página atual
function escape_regexp(s, ignore) {
  var special = ["\\", "?", ".", "+", "(", ")", "{", "}", "[", "]", "$", "^", "*"];
  special.forEach(function(re) {
    if (!ignore || ignore.indexOf(re) < 0)
      s = s.replace(new RegExp("\\" + re, "g"), "\\" + re);
  });
  return s;
}

// Verificar lista de sites bloqueados
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

// Método responsável por mostrar ou não o icone do Quem Financia na barra de endereços.
// Se retornar algo, ele será a Tooltip, se não retornar nada (NULL), não mostrará o ícone.
var findCandidato = function(options) {

	var blacklisted = check_blacklist(options.blockedUrls);

	// Disable blacklisted sites completely
	//if (blacklisted && !search.mode)
	if (blacklisted)
		return;

	// Retornar algum nome para mostrar como Tooltip no icone do Quem Financia.

	return "Quem financia?";
};

