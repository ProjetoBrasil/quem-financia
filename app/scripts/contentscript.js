'use strict';

var apiBaseUrl = 'http://api.transparencia.org.br:80/api/v1/candidatos';
var appToken = "WlnfiCtWlgg7";

function pegaDadosFinanciamento(id, anoEleitoral){
	var html = '';
	var jqxhr =
	$.ajax({
		url : apiBaseUrl + '/' + id + '/doadores?anoEleitoral=' + anoEleitoral,
		type : 'GET',
		beforeSend : function(xhr){
			xhr.setRequestHeader('App-Token', appToken);
		},
		success : function(data) {
			html = montaTabela(data, "doacoes", "Doador", "Montante (R$)", "nome", false);
		},
		async : false
	});
	return html;
}

function pegaDadosPolitico(id){
	var html = '';
	var jqxhr =
	$.ajax({
		url : apiBaseUrl + '/' + id,
		type : 'GET',
		beforeSend : function(xhr){
			xhr.setRequestHeader('App-Token', appToken);
		},
		success : function(data) {
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
		url : apiBaseUrl + '/' + id + '/bens/',
		type : 'GET',
		beforeSend : function(xhr){
			xhr.setRequestHeader('App-Token', appToken);
		},
		success : function(data) {
			html = montaTabela(data, "bens", "Bem", "Valor (R$)", "bem", true);
		},
		async : false
	});
	return html;
}

function fechaQFBox(){
	return '<div class="row">' +
			'<div class="col-xs-12">' +
				'<p class="qf-disclaimer">' +
					'<strong>Fonte dos dados:</strong> Transparência Brasil, projetos Excelências e Às Claras. A Transparência Brasil não se responsabiliza pelo uso que venha a ser feito desses dados nesta aplicação.' +
				'</p>' +
			'</div>' +
		'</div>' +
	'</div>';
}

function montaTabelaDadosPoliticos(data){
	return '<div class="qf-box qf-bootstrap">' +
						'<a href="//www.projetobrasil.org" target="_blank" class="qf-logo-projeto-brasil">' +
							'<img src="//projetobrasil.org/images/logo-projeto-brasil.png" alt="Logo do Projeto Brasil">' +
						'</a>' +
						'<div class="row qf-cabecalho">' +
							'<div class="col-xs-4">' +
								'<div class="qf-foto" style="background-image: url('+ data.foto +');">' +
								'</div>' +
							'</div>' +
							'<div class="col-xs-8">' +
								'<h2>' + data.apelido + ' - ' + data.partido +  '</h2>' +
								'<h4>' + data.cargo + ' - ' + data.estado + '</h4>' +
							'</div>' +
						'</div>' +
						'<div class="row">' +
							'<div class="col-xs-12 text-center">' +
								'<div class="btn-group">' +
								  '<button type="button" class="btn btn-success" onclick="$(this).addClass(\'active\').siblings().first().removeClass(\'active\'); $(\'#qf-table-doacoes\').show(); $(\'#qf-table-bens\').hide();" id="doacoes">Doações</button>' +
								  '<button type="button" class="btn btn-success" onclick="$(this).addClass(\'active\').siblings().first().removeClass(\'active\'); $(\'#qf-table-bens\').show(); $(\'#qf-table-doacoes\').hide();" id="bens">Bens</button>' +
								'</div>' +
							'</div>' +
						'</div>';
}

function montaTabela(data, id, head1, head2, itemName, hiddenFlag){

	var hiddenClass = "";
	if(hiddenFlag){
		hiddenClass = "qf-hide"
	}

	var tableHtml = '<div class="row '+ hiddenClass + '" id="qf-table-' + id + '">' +
										'<div class="col-xs-12">' +
											'<table class="table table-striped table-condensed">' +
												'<thead>' +
													'<tr>' +
														'<th class="qf-coluna-esq">' + head1 + '</th>' +
														'<th class="qf-coluna-dir text-right">' + head2 + '</th>' +
													'</tr>' +
												'</thead>' +
												'<tbody>';

	$.each(data, function(){
		tableHtml = tableHtml + '<tr>';
		tableHtml = tableHtml + '<td class="qf-coluna-esq text-left">' + this[itemName] + '</td>';
		tableHtml = tableHtml + '<td class="qf-coluna-dir text-right">' + formataValor(this.montante) + '</td>';
		tableHtml = tableHtml + '</tr>';
	});
	tableHtml += '</tbody>' +
							'</table>' +
						'</div>' +
					'</div>';

	return tableHtml;
}


function formataValor(valor) {
	if (valor)
	{
		if (valor > 999999)
		{
			return (valor / 1000000).toFixed(1) + " Milhões";
		}
		else if (valor > 999)
		{
			return (valor / 1000).toFixed(1) + " Mil";
		}
		else
		{
			return valor;
		}
	}
	else
	{
		return "-";
	}
}

function alteraPagina(){
	var nick = {
	        "AÉCIO NEVES" : "1511109",
	        "DILMA" : "1511125",
	        "EDUARDO JORGE" : "1511123",
	        "EYMAEL" : "1511121",
	        "LEVY FIDÉLIX" : "1511116",
	        "LUCIANA GENRO" : "1511119",
	        "MARINA SILVA" : "1511108",
	        "MAURO IÁSI" : "1511102",
	        "PASTOR EVERALDO" : "1511106",
	        "RUI COSTA PIMENTA" : "1511111",
	        "ZÉ MARIA" : "1511114",

	        "ATAÍDES OLIVEIRA" : "1533398",
	        "EULA ANGELIM" : "1533669",
	        "LUÍS CLÁUDIO" : "1533542",
	        "MARCELO MIRANDA" : "1533391",
	        "POTENGY" : "1533385",
	        "SANDOVAL CARDOSO" : "1533579",

	        "GERALDO ALCKMIN" : "1530645",
	        "GILBERTO NATALINI" : "1531427",
	        "LAÉRCIO BENKO" : "1532761",
	        "MARINGONI" : "1532716",
	        "PADILHA" : "1529910",
	        "RAIMUNDO SENA" : "1530419",
	        "SKAF" : "1530712",
	        "WAGNER FARIAS" : "1532968",
	        "WALTER CIGLIONI" : "1530802",

	        "AIRTON DA CGTB" : "1529416",
	        "BETINHO" : "1529575",
	        "EDUARDO AMORIM" : "1529429",
	        "JACKSON BARRETO" : "1529418",
	        "PROF. SÔNIA MEIRE" : "1529442",

	        "AFRÂNIO BOPPRÉ" : "1528852",
	        "CLAUDIO VIGNATTI" : "1528807",
	        "ELPÍDIO NEVES" : "1528752",
	        "GILMAR SALGADO" : "1528939",
	        "JANAINA DEITOS" : "1529256",
	        "MARLENE SOCCAS" : "1529089",
	        "PAULO BAUER" : "1529219",
	        "RAIMUNDO COLOMBO" : "1528949",

	        "ANA AMELIA LEMOS" : "1528132",
	        "ESTIVALETE" : "1527999",
	        "HUMBERTO CARVALHO" : "1528126",
	        "JOAO CARLOS RODRIGUES" : "1527892",
	        "JOSÉ IVO SARTORI" : "1527716",
	        "ROBERTO ROBAINA" : "1527692",
	        "TARSO GENRO" : "1527731",
	        "VIEIRA DA CUNHA" : "1527900",

	        "ANGELA PORTELA" : "1527431",
	        "CHICO RODRIGUES" : "1527517",
	        "HAMILTON" : "1527220",
	        "NEUDO CAMPOS" : "1527198",

	        "CONFUCIO MOURA" : "1526725",
	        "EXPEDITO JÚNIOR" : "1526558",
	        "JAQUELINE CASSOL" : "1526765",
	        "PADRE TON" : "1526800",
	        "PIMENTA DE RONDONIA" : "1526697",

	        "ARAKEN" : "1526243",
	        "HENRIQUE ALVES" : "1526162",
	        "PROFESSOR ROBÉRIO PAULINO" : "1526215",
	        "ROBINSON FARIA" : "1526310",
	        "SIMONE DUTRA" : "1526228",

	        "DAYSE OLIVEIRA" : "1523112",
	        "GAROTINHO" : "1523676",
	        "LINDBERG FARIAS" : "1523571",
	        "LUIZ FERNANDO PEZÃO" : "1524564",
	        "MARCELO CRIVELLA" : "1524351",
	        "NEY NUNES" : "1523006",
	        "TARCISIO MOTTA" : "1523303",

	        "BERNARDO PILOTTO" : "1521765",
	        "BETO RICHA" : "1522228",
	        "GEONISIO MARINHO" : "1522302",
	        "GLEISI HOFFMANN" : "1522192",
	        "OGIER BUCHI" : "1522670",
	        "REQUIAO" : "1522041",
	        "RODRIGO TOMAZINI" : "1522483",
	        "TULIO BANDEIRA" : "1522782",

	        "DANIEL SOLON" : "1521379",
	        "LOURDES MELO" : "1521386",
	        "MAKLANDEL" : "1521470",
	        "MÃO SANTA" : "1521707",
	        "NETO SAMBAIBA" : "1521427",
	        "WELLINGTON DIAS" : "1521401",
	        "ZÉ FILHO" : "1521435",

	        "ARMANDO MONTEIRO" : "1521272",
	        "JAIR PEDRO" : "1520734",
	        "MIGUEL ANACLETO" : "1520717",
	        "PANTALEÃO" : "1521303",
	        "PAULO CÂMARA" : "1520736",
	        "ZÉ GOMES" : "1521129",

	        "ANTONIO RADICAL" : "1520351",
	        "CASSIO CUNHA LIMA" : "1520438",
	        "MAJOR FÁBIO" : "1520508",
	        "RICARDO COUTINHO" : "1520066",
	        "TÁRCIO" : "1520117",
	        "VITAL" : "1520166",

	        "ELTON BRAGA" : "1519856",
	        "HELDER BARBALHO" : "1519410",
	        "MARCO ANTONIO" : "1519865",
	        "MARCO CARRERA" : "1519119",
	        "SIMÃO JATENE" : "1519756",
	        "ZE CARLOS DO PV" : "1519128",

	        "DELCÍDIO" : "1518089",
	        "EVANDER VENDRAMINI" : "1518208",
	        "NELSINHO TRAD" : "1518088",
	        "PROF. MONJE" : "1518038",
	        "PROFESSOR SIDNEY MELO" : "1518362",
	        "REINALDO AZAMBUJA" : "1518048",

	        "CLEIDE DONÁRIA" : "1516466",
	        "EDUARDO FERREIRA" : "1516321",
	        "FERNANDO PIMENTEL" : "1517668",
	        "FIDÉLIS" : "1516250",
	        "PIMENTA DA VEIGA" : "1516118",
	        "PROFESSOR TULIO LOPES" : "1517494",
	        "TARCISIO DELGADO" : "1517043",

	        "FLAVIO DINO" : "1515176",
	        "LOBÃO FILHO" : "1515254",
	        "PEDROSA" : "1515062",
	        "PROF.JOSIVALDO" : "1515408",
	        "SAULO ARCANGELI" : "1515195",
	        "ZELUIS LAGO" : "1515307",

	        "ALEXANDRE MAGALHÃES" : "1514083",
	        "ANTÔNIO GOMIDE" : "1514022",
	        "IRIS REZENDE" : "1514370",
	        "MARCONI PERILLO" : "1514837",
	        "MARTA JANE" : "1514711",
	        "PROFESSOR WESLEI" : "1514282",
	        "VANDERLAN CARDOSO" : "1514105",

	        "CAMILA VALADÃO" : "1513664",
	        "CASAGRANDE" : "1513439",
	        "MAURO RIBEIRO" : "1513349",
	        "PAULO HARTUNG" : "1513610",
	        "ROBERTO CARLOS" : "1513536",

	        "AGNELO QUEIROZ" : "1512891",
	        "ARRUDA" : "1512082",
	        "LUIZ PITIMAN" : "1513014",
	        "PERCI MARRARA" : "1512788",
	        "ROLLEMBERG" : "1512482",
	        "TONINHO DO PSOL" : "1512096",

	        "AILTON LOPES" : "1511876",
	        "CAMILO" : "1511767",
	        "ELIANE NOVAIS" : "1511142",
	        "EUNÍCIO" : "1511688",

	        "DA LUZ" : "1510925",
	        "LIDICE DA MATA" : "1510283",
	        "MARCOS MENDES" : "1510156",
	        "PAULO SOUTO" : "1510518",
	        "RENATA MALLET" : "1510150",
	        "RUI COSTA" : "1510435",

	        "BRUNO MINEIRO" : "1509763",
	        "CAMILO CAPIBERIBE" : "1509966",
	        "DÉCIO GOMES" : "1509632",
	        "GENIVAL CRUZ" : "1509596",
	        "JORGE AMANAJAS" : "1509728",
	        "LUCAS BARRETO" : "1509559",
	        "WALDEZ" : "1509590",

	        "ABEL ALVES" : "1509226",
	        "CHICO PRETO" : "1509335",
	        "EDUARDO BRAGA" : "1508851",
	        "HERBERT AMAZONAS" : "1509450",
	        "JOSÉ MELO" : "1509154",
	        "LUIZ NAVARRO" : "1508781",
	        "MARCELO RAMOS" : "1509104",

	        "BIU" : "1508254",
	        "CORONEL GOULART" : "1508395",
	        "GOLBERY LESSA" : "1508609",
	        "JOATHAS ALBUQUERQUE" : "1508707",
	        "JULIO CEZAR" : "1508624",
	        "LUCIANO BALBINO" : "1508401",
	        "MÁRIO AGRA" : "1508235",
	        "RENAN FILHO" : "1508272",

	        "ANTONIO ROCHA" : "1507815",
	        "BOCALOM" : "1507819",
	        "MÁRCIO BITTAR" : "1507726",
	        "TIÃO VIANA" : "1507761"
	    };


	$.each(nick, function(key, value) {
		$("p").highlight(key, {caseSensitive: false, className: 'highlight-quem-financia', wordsOnly:true });
	});

	$('.highlight-quem-financia').each(function() {
		var currentKey = $(this).text();
		$(this).attr('data-qf-id', nick[currentKey.toUpperCase()]);
		Tipped.create($(this), function(){
			var html = pegaDadosPolitico($(this).attr('data-qf-id')) + '<div>' +
			pegaDadosFinanciamento($(this).attr('data-qf-id'), 2010) +
			pegaBensPolitico($(this).attr('data-qf-id')) + fechaQFBox();;

			return html;
		},
		{
			padding: false,
			radius: false,
			showOn: {
				element: 'mouseenter',
				tooltip: 'mouseenter'
			}
		});
	});
}

// Para persistir o tooltip de maneira a facilitar o debug, troque a opção showOn da chamada do Tipped pelos parametros abaixo.
// close: true,
// hideOn: false

alteraPagina();

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

