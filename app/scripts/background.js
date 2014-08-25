
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

function cleanUpSpecialChars(str)
{
    str = str.replace(/[ÀÁÂÃÄÅ]/g,"A");
    str = str.replace(/[àáâãäå]/g,"a");
    str = str.replace(/[ÈÉÊË]/g,"E");
    //.... all the rest
    return str;//.replace(/[^a-z0-9]/gi,''); // final clean up
}

function generateUrl(str) {
	var tratar = cleanUpSpecialChars(str);
	tratar = tratar.toLowerCase();
	tratar = tratar.replace(' ', '_');
	
	return tratar;
}

function navigate(url) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.update(tabs[0].id, {url: url});
  });
}

function searchStringInArray(str, strArray) {
	var retorno = [];
	var busca = str.toLowerCase();
    for (var j=0; j<strArray.length; j++) {
	
        if (strArray[j].apelido.toLowerCase().search(busca) >= 0)
		{
			retorno.push({content:strArray[j].apelido,description:'<match><url>' + strArray[j].numero + '</url></match>  ' + strArray[j].apelido + ' - <dim>' + strArray[j].cargo + '</dim>' });
		}
		
		if (retorno.length >= 10)
			break;
    }

    return retorno;
}

var candidatos = [{"id":"1511086","numero":"45","apelido":"AÉCIO NEVES","nome":"AÉCIO NEVES DA CUNHA","cargo":"Presidente"},{"id":"1511105","numero":"13","apelido":"DILMA","nome":"DILMA VANA ROUSSEFF","cargo":"Presidente"},{"id":"1511103","numero":"43","apelido":"EDUARDO JORGE","nome":"EDUARDO JORGE MARTINS ALVES SOBRINHO","cargo":"Presidente"},{"id":"1511096","numero":"27","apelido":"EYMAEL","nome":"JOSE MARIA EYMAEL","cargo":"Presidente"},{"id":"1511092","numero":"28","apelido":"LEVY FIDELIX","nome":"JOSÉ LEVY FIDELIX DA CRUZ","cargo":"Presidente"},{"id":"1511094","numero":"50","apelido":"LUCIANA GENRO","nome":"LUCIANA KREBS GENRO","cargo":"Presidente"},{"id":"1511083","numero":"40","apelido":"MARINA SILVA","nome":"MARIA OSMARINA MARINA DA SILVA VAZ DE LIMA","cargo":"Presidente"},{"id":"1511080","numero":"21","apelido":"MAURO IASI","nome":"MAURO LUÍS IASI","cargo":"Presidente"},{"id":"1511084","numero":"20","apelido":"PASTOR EVERALDO","nome":"EVERALDO DIAS PEREIRA","cargo":"Presidente"},{"id":"1511088","numero":"29","apelido":"RUI COSTA PIMENTA","nome":"RUI COSTA PIMENTA","cargo":"Presidente"},{"id":"1511090","numero":"16","apelido":"ZÉ MARIA","nome":"JOSÉ MARIA DE ALMEIDA","cargo":"Presidente"},{"id":"1511086","numero":"45","apelido":"AÉCIO NEVES","nome":"AÉCIO NEVES DA CUNHA","cargo":"Presidente"},{"id":"1511105","numero":"13","apelido":"DILMA","nome":"DILMA VANA ROUSSEFF","cargo":"Presidente"},{"id":"1511103","numero":"43","apelido":"EDUARDO JORGE","nome":"EDUARDO JORGE MARTINS ALVES SOBRINHO","cargo":"Presidente"},{"id":"1511096","numero":"27","apelido":"EYMAEL","nome":"JOSE MARIA EYMAEL","cargo":"Presidente"},{"id":"1511092","numero":"28","apelido":"LEVY FIDELIX","nome":"JOSÉ LEVY FIDELIX DA CRUZ","cargo":"Presidente"},{"id":"1511094","numero":"50","apelido":"LUCIANA GENRO","nome":"LUCIANA KREBS GENRO","cargo":"Presidente"},{"id":"1511083","numero":"40","apelido":"MARINA SILVA","nome":"MARIA OSMARINA MARINA DA SILVA VAZ DE LIMA","cargo":"Presidente"},{"id":"1511080","numero":"21","apelido":"MAURO IASI","nome":"MAURO LUÍS IASI","cargo":"Presidente"},{"id":"1511084","numero":"20","apelido":"PASTOR EVERALDO","nome":"EVERALDO DIAS PEREIRA","cargo":"Presidente"},{"id":"1511088","numero":"29","apelido":"RUI COSTA PIMENTA","nome":"RUI COSTA PIMENTA","cargo":"Presidente"},{"id":"1511090","numero":"16","apelido":"ZÉ MARIA","nome":"JOSÉ MARIA DE ALMEIDA","cargo":"Presidente"},{"id":"1511086","numero":"45","apelido":"AÉCIO NEVES","nome":"AÉCIO NEVES DA CUNHA","cargo":"Presidente"},{"id":"1511105","numero":"13","apelido":"DILMA","nome":"DILMA VANA ROUSSEFF","cargo":"Presidente"},{"id":"1511103","numero":"43","apelido":"EDUARDO JORGE","nome":"EDUARDO JORGE MARTINS ALVES SOBRINHO","cargo":"Presidente"},{"id":"1511096","numero":"27","apelido":"EYMAEL","nome":"JOSE MARIA EYMAEL","cargo":"Presidente"},{"id":"1511092","numero":"28","apelido":"LEVY FIDELIX","nome":"JOSÉ LEVY FIDELIX DA CRUZ","cargo":"Presidente"},{"id":"1511094","numero":"50","apelido":"LUCIANA GENRO","nome":"LUCIANA KREBS GENRO","cargo":"Presidente"},{"id":"1511083","numero":"40","apelido":"MARINA SILVA","nome":"MARIA OSMARINA MARINA DA SILVA VAZ DE LIMA","cargo":"Presidente"},{"id":"1511080","numero":"21","apelido":"MAURO IASI","nome":"MAURO LUÍS IASI","cargo":"Presidente"},{"id":"1511084","numero":"20","apelido":"PASTOR EVERALDO","nome":"EVERALDO DIAS PEREIRA","cargo":"Presidente"},{"id":"1511088","numero":"29","apelido":"RUI COSTA PIMENTA","nome":"RUI COSTA PIMENTA","cargo":"Presidente"},{"id":"1511090","numero":"16","apelido":"ZÉ MARIA","nome":"JOSÉ MARIA DE ALMEIDA","cargo":"Presidente"},{"id":"1507940","numero":"333","apelido":"DR. ROBERTO DUARTE","nome":"ROBERTO DUARTE JUNIOR","cargo":"Senador"},{"id":"1507655","numero":"111","apelido":"GLADSON CAMELI","nome":"GLADSON DE LIMA CAMELI","cargo":"Senador"},{"id":"1507729","numero":"654","apelido":"PERPÉTUA ALMEIDA","nome":"MARIA PERPETUA DE ALMEIDA","cargo":"Senador"},{"id":"1507812","numero":"500","apelido":"PROFESSOR FORTUNATO","nome":"FORTUNATO MARTINS FILHO","cargo":"Senador"},{"id":"1508236","numero":"144","apelido":"COLLOR","nome":"FERNANDO AFFONSO COLLOR DE MELLO","cargo":"Senador"},{"id":"1508326","numero":"511","apelido":"CORONEL  BRITO","nome":"MARCOS ANTONIO CARDOSO DE BRITO","cargo":"Senador"},{"id":"1508704","numero":"456","apelido":"EDUARDO MAGALHAES","nome":"EDUARDO MAGALHAES JUNIOR","cargo":"Senador"},{"id":"1508706","numero":"369","apelido":"ELIAS BARROS","nome":"ELIAS BARROS DIAS","cargo":"Senador"},{"id":"1508640","numero":"500","apelido":"HELOÍSA HELENA","nome":"HELOÍSA HELENA LIMA DE MORAES","cargo":"Senador"},{"id":"1508332","numero":"192","apelido":"MARCOS AGUIAR","nome":"MARCOS BARROS AGUIAR","cargo":"Senador"},{"id":"1508274","numero":"288","apelido":"OLDEMBERG PARANHOS","nome":"OLDEMBERG FONSECA PARANHOS","cargo":"Senador"},{"id":"1508362","numero":"255","apelido":"OMAR","nome":"OMAR COELHO DE MELLO","cargo":"Senador"},{"id":"1509291","numero":"333","apelido":"JONATAS ALMEIDA","nome":"JONATAS ALMEIDA DE OLIVEIRA","cargo":"Senador"},{"id":"1508854","numero":"161","apelido":"JÚLIO FERRAZ","nome":"JULIO CEZAR FERRAZ DE SOUZA","cargo":"Senador"},{"id":"1509140","numero":"400","apelido":"MARCELO SERAFIM","nome":"MARCELO AUGUSTO DA EIRA CORREA","cargo":"Senador"},{"id":"1509088","numero":"555","apelido":"OMAR AZIZ","nome":"OMAR JOSE ABDEL AZIZ","cargo":"Senador"},{"id":"1508816","numero":"131","apelido":"PRACIANO","nome":"FRANCISCO EDNALDO PRACIANO","cargo":"Senador"},{"id":"1509600","numero":"369","apelido":"CORONEL PALMIRA","nome":"PALMIRA DAS NEVES BITTENCOURT","cargo":"Senador"},{"id":"1509616","numero":"255","apelido":"DAVI ALCOLUMBRE","nome":"DAVID SAMUEL ALCOLUMBRE TOBELEM","cargo":"Senador"},{"id":"1509933","numero":"131","apelido":"DORA NASCIMENTO","nome":"DORALICE NASCIMENTO DE SOUZA","cargo":"Senador"},{"id":"1509520","numero":"152","apelido":"GILVAM","nome":"GILVAM PINHEIRO BORGES","cargo":"Senador"},{"id":"1509609","numero":"280","apelido":"MARQUINHO ABREU","nome":"MARCO ANTONIO REIS DE ABREU","cargo":"Senador"},{"id":"1509936","numero":"441","apelido":"PASTOR JORVAN","nome":"JORVAN TAVARES NASCIMENTO","cargo":"Senador"},{"id":"1509596","numero":"161","apelido":"PROFESSOR PAULO RICARDO","nome":"PAULO RICARDO OLIVEIRA FARIAS","cargo":"Senador"},{"id":"1509654","numero":"511","apelido":"PROMOTOR MOISÉS","nome":"MOISES RIVALDO PEREIRA","cargo":"Senador"},{"id":"1509603","numero":"333","apelido":"RAQUEL CAPIBRIBE","nome":"RAQUEL CAPIBERIBE DA SILVA","cargo":"Senador"},{"id":"1511002","numero":"400","apelido":"ELIANA CALMON","nome":"ELIANA CALMON ALVES","cargo":"Senador"},{"id":"1510499","numero":"150","apelido":"GEDDEL VIEIRA LIMA","nome":"GEDDEL QUADROS VIEIRA LIMA","cargo":"Senador"},{"id":"1510097","numero":"500","apelido":"HAMILTON ASSIS","nome":"HAMILTON MOREIRA DE ASSIS","cargo":"Senador"},{"id":"1510347","numero":"555","apelido":"OTTO ALENCAR","nome":"OTTO ROBERTO MENDONCA DE ALENCAR","cargo":"Senador"},{"id":"1511165","numero":"400","apelido":"GEOVANA CARTAXO","nome":"GEOVANA MARIA CARTAXO DE ARRUDA FREIRE","cargo":"Senador"},{"id":"1511638","numero":"900","apelido":"MAURO FILHO","nome":"CARLOS MAURO BENEVIDES FILHO","cargo":"Senador"},{"id":"1511471","numero":"161","apelido":"RAQUEL DIAS","nome":"RAQUEL DIAS ARAUJO","cargo":"Senador"},{"id":"1511701","numero":"456","apelido":"TASSO JEREISSATI","nome":"TASSO RIBEIRO JEREISSATI","cargo":"Senador"},{"id":"1512221","numero":"500","apelido":"ALDEMARIO","nome":"ALDEMARIO ARAUJO CASTRO","cargo":"Senador"},{"id":"1512732","numero":"290","apelido":"EXPEDITO MENDONÇA","nome":"EXPEDITO CARNEIRO DE MENDONÇA","cargo":"Senador"},{"id":"1512209","numero":"144","apelido":"GIM ARGELLO","nome":"JORGE AFONSO ARGELLO","cargo":"Senador"},{"id":"1511990","numero":"211","apelido":"JAMIL MAGARI","nome":"JAMIL MAGARI","cargo":"Senador"},{"id":"1512841","numero":"133","apelido":"MAGELA","nome":"GERALDO MAGELA PEREIRA","cargo":"Senador"},{"id":"1512494","numero":"123","apelido":"REGUFFE","nome":"JOSÉ ANTONIO MACHADO REGUFFE","cargo":"Senador"},{"id":"1511995","numero":"160","apelido":"ROBSON","nome":"ROBSON RAYMUNDO DA SILVA","cargo":"Senador"},{"id":"1512929","numero":"456","apelido":"SANDRA QUEZADO","nome":"SANDRA SUELI QUEZADO SOARES","cargo":"Senador"},{"id":"1513638","numero":"500","apelido":"ANDRE MOREIRA","nome":"ANDRE LUIZ MOREIRA","cargo":"Senador"},{"id":"1513620","numero":"131","apelido":"JOAO COSER","nome":"JOAO CARLOS COSER","cargo":"Senador"},{"id":"1513760","numero":"433","apelido":"NEUCIMAR FRAGA","nome":"NEUCIMAR FERREIRA FRAGA","cargo":"Senador"},{"id":"1513178","numero":"161","apelido":"RAPHAEL FURTADO","nome":"RAPHAEL GÓES FURTADO","cargo":"Senador"},{"id":"1513549","numero":"156","apelido":"ROSE DE FREITAS","nome":"ROSILDA DE FREITAS","cargo":"Senador"},{"id":"1514044","numero":"401","apelido":"AGUIMAR JENUÍNO","nome":"AGUIMAR JESUÍNO DA SILVA","cargo":"Senador"},{"id":"1513983","numero":"271","apelido":"ALDO MURO","nome":"ALDO MURO JUNIOR","cargo":"Senador"},{"id":"1514730","numero":"210","apelido":"ANTÔNIO NETO","nome":"ANTÔNIO VIEIRA NETO","cargo":"Senador"},{"id":"1514151","numero":"500","apelido":"ELBER SAMPAIO","nome":"ELBER SAMPAIO","cargo":"Senador"},{"id":"1514033","numero":"131","apelido":"MARINA SANT\u0027ANNA","nome":"MARINA PIGNATARO SANT\u0027ANNA","cargo":"Senador"},{"id":"1514532","numero":"251","apelido":"RONALDO CAIADO","nome":"RONALDO RAMOS CAIADO","cargo":"Senador"},{"id":"1514307","numero":"551","apelido":"VILMAR ROCHA","nome":"VILMAR DA SILVA ROCHA","cargo":"Senador"},{"id":"1515383","numero":"212","apelido":"EVAN DE ANDRADE","nome":"EVANDNILSON CONCEIÇÃO DE ANDRADE","cargo":"Senador"},{"id":"1515334","numero":"151","apelido":"GASTÃO VIEIRA","nome":"GASTÃO DIAS VIEIRA","cargo":"Senador"},{"id":"1515211","numero":"541","apelido":"GERSÃO","nome":"GERSON DOS SANTOS CARDOSO DA SILVA","cargo":"Senador"},{"id":"1515032","numero":"500","apelido":"HAROLDO SABOIA","nome":"HAROLDO FREITAS PIRES DE SABOIA","cargo":"Senador"},{"id":"1515169","numero":"163","apelido":"MARCOS SILVA","nome":"MARCOS ANTONIO SILVA DO NASCIMENTO","cargo":"Senador"},{"id":"1515150","numero":"400","apelido":"ROBERTO ROCHA","nome":"ROBERTO COELHO ROCHA","cargo":"Senador"},{"id":"1517564","numero":"456","apelido":"ANTONIO ANASTASIA","nome":"ANTONIO AUGUSTO JUNHO ANASTASIA","cargo":"Senador"},{"id":"1516950","numero":"700","apelido":"EDILSON NASCIMENTO","nome":"EDILSON JOSE DO NASCIMENTO","cargo":"Senador"},{"id":"1516285","numero":"161","apelido":"GERALDO BATATA","nome":"GERALDO DE ARAÚJO SILVA","cargo":"Senador"},{"id":"1516377","numero":"290","apelido":"GRAÇA","nome":"MARIA DAS GRAÇAS SOUSA VIEIRA","cargo":"Senador"},{"id":"1517568","numero":"150","apelido":"JOSUÉ ALENCAR","nome":"JOSUÉ CHRISTIANO GOMES DA SILVA","cargo":"Senador"},{"id":"1517128","numero":"400","apelido":"MARGARIDA VIEIRA","nome":"MARGARIDA LUIZA DE MATOS VIEIRA","cargo":"Senador"},{"id":"1517547","numero":"210","apelido":"PABLO LIMA","nome":"PABLO LUIZ DE OLIVEIRA LIMA","cargo":"Senador"},{"id":"1516491","numero":"270","apelido":"TARCISIO","nome":"JOSE TARCISIO DOS SANTOS","cargo":"Senador"},{"id":"1518183","numero":"111","apelido":"ALCIDES BERNAL","nome":"ALCIDES JESUS PERALTA BERNAL","cargo":"Senador"},{"id":"1517958","numero":"555","apelido":"ANTONIO JOÃO","nome":"ANTONIO JOAO HUGO RODRIGUES","cargo":"Senador"},{"id":"1518301","numero":"500","apelido":"LUCIEN REZENDE","nome":"LUCIEN ROBERTO GARCIA DE REZENDE","cargo":"Senador"},{"id":"1518095","numero":"133","apelido":"RICARDO AYACHE","nome":"RICARDO AYACHE","cargo":"Senador"},{"id":"1518057","numero":"151","apelido":"SIMONE TEBET","nome":"SIMONE NASSAR TEBET","cargo":"Senador"},{"id":"1517980","numero":"167","apelido":"VALDEMIR DO PSTU","nome":"VALDEMIR CASSIMIRO DE SOUZA","cargo":"Senador"},{"id":"1518452","numero":"500","apelido":"GILBERTO LOPES FILHO","nome":"GILBERTO LOPES FILHO","cargo":"Senador"},{"id":"1518772","numero":"456","apelido":"ROGÉRIO SALLES","nome":"JOSE ROGÉRIO SALLES","cargo":"Senador"},{"id":"1518716","numero":"555","apelido":"RUI PRADO","nome":"RUI CARLOS OTTONI PRADO","cargo":"Senador"},{"id":"1518835","numero":"222","apelido":"WELLINGTON FAGUNDES","nome":"WELLINGTON ANTONIO FAGUNDES","cargo":"Senador"},{"id":"1519215","numero":"161","apelido":"ANGELA AZEVEDO","nome":"ANGELA SOARES DE AZEVEDO","cargo":"Senador"},{"id":"1519346","numero":"141","apelido":"DUCIOMAR COSTA","nome":"DUCIOMAR GOMES DA COSTA","cargo":"Senador"},{"id":"1519792","numero":"280","apelido":"ELIEZER BARROS","nome":"ELIEZER BARROS DOS REIS","cargo":"Senador"},{"id":"1519343","numero":"555","apelido":"HELENILSON PONTES","nome":"HELENILSON CUNHA PONTES","cargo":"Senador"},{"id":"1519513","numero":"111","apelido":"JEFFERSON LIMA","nome":"JEFFERSON ELY VALE DE LIMA","cargo":"Senador"},{"id":"1519803","numero":"456","apelido":"MARIO COUTO","nome":"MARIO COUTO FILHO","cargo":"Senador"},{"id":"1519439","numero":"131","apelido":"PAULO ROCHA","nome":"PAULO ROBERTO GALVAO DA ROCHA","cargo":"Senador"},{"id":"1519212","numero":"500","apelido":"PEDRINHO MAIA","nome":"PEDRO HOLANDA MAIA","cargo":"Senador"},{"id":"1519045","numero":"433","apelido":"PROFESSOR SIMÃO","nome":"SIMÃO HERNAN BENDAYAN","cargo":"Senador"},{"id":"1519848","numero":"211","apelido":"RENATO ROLIM","nome":"JOÃO RENATO DA SILVA ROLIM","cargo":"Senador"},{"id":"1520033","numero":"155","apelido":"JOSE MARANHÃO","nome":"JOSÉ TARGINO MARANHÃO","cargo":"Senador"},{"id":"1520147","numero":"133","apelido":"LUCÉLIO CARTAXO","nome":"LUCÉLIO CARTAXO PIRES DE SÁ","cargo":"Senador"},{"id":"1520117","numero":"500","apelido":"NELSON JÚNIOR","nome":"NELSON ALEIXO DA SILVA JÚNIOR","cargo":"Senador"},{"id":"1520081","numero":"360","apelido":"WALTER BRITO","nome":"WALTER CORREIA DE BRITO FILHO","cargo":"Senador"},{"id":"1520409","numero":"145","apelido":"WILSON SANTIAGO","nome":"JOSÉ WILSON SANTIAGO","cargo":"Senador"},{"id":"1521028","numero":"500","apelido":"ALBANISE PIRES","nome":"ALBANISE PIRES FERREIRA DE AZEVEDO","cargo":"Senador"},{"id":"1520706","numero":"400","apelido":"FERNANDO BEZERRA COELHO","nome":"FERNANDO BEZERRA DE SOUZA COELHO","cargo":"Senador"},{"id":"1521053","numero":"130","apelido":"JOÃO PAULO","nome":"JOÃO PAULO LIMA E SILVA","cargo":"Senador"},{"id":"1520680","numero":"211","apelido":"OXIS","nome":"ANTONIO ELIAS PEREIRA","cargo":"Senador"},{"id":"1520698","numero":"162","apelido":"SIMONE FONTANA","nome":"SIMONE FONTANA","cargo":"Senador"},{"id":"1521482","numero":"211","apelido":"ALDIR NUNES","nome":"ALDIR SILVA DE ALMEIDA NUNES","cargo":"Senador"},{"id":"1521570","numero":"141","apelido":"ELMANO - O VEÍN TRABALHADOR","nome":"ELMANO FÉRRER DE ALMEIDA","cargo":"Senador"},{"id":"1521420","numero":"160","apelido":"GERALDO CARVALHO","nome":"GERALDO DO NASCIMENTO CARVALHO","cargo":"Senador"},{"id":"1521331","numero":"200","apelido":"GUSTAVO HENRIQUE","nome":"GUSTAVO HENRIQUE LEITE FEIJÓ","cargo":"Senador"},{"id":"1521431","numero":"544","apelido":"PROFESSOR CLAUDIONOR","nome":"CLAUDIONOR CHAVES DE OLIVEIRA","cargo":"Senador"},{"id":"1521442","numero":"400","apelido":"WILSON MARTINS","nome":"WILSON NUNES MARTINS","cargo":"Senador"},{"id":"1522176","numero":"282","apelido":"ADILSON SENADOR DA FAMILIA","nome":"ADILSON DOS SANTOS SILVA","cargo":"Senador"},{"id":"1522235","numero":"456","apelido":"ALVARO DIAS","nome":"ALVARO FERNANDES DIAS","cargo":"Senador"},{"id":"1522489","numero":"160","apelido":"CASTAGNA","nome":"EVANDRO JOSÉ CASTAGNA","cargo":"Senador"},{"id":"1522789","numero":"360","apelido":"LUIZ BARBARA","nome":"LUIZ ANTONIO BARBARA","cargo":"Senador"},{"id":"1522031","numero":"151","apelido":"MARCELO ALMEIDA","nome":"MARCELO BELTRAO DE ALMEIDA","cargo":"Senador"},{"id":"1522676","numero":"444","apelido":"MAURI VIANA","nome":"MAURI VIANA PEREIRA","cargo":"Senador"},{"id":"1521722","numero":"505","apelido":"PROFESSOR PIVA","nome":"LUIZ ROMEIRO PIVA","cargo":"Senador"},{"id":"1522091","numero":"650","apelido":"RICARDO GOMYDE","nome":"RICARDO CRACHINESKI GOMYDE","cargo":"Senador"},{"id":"1525902","numero":"123","apelido":"CARLOS LUPI","nome":"CARLOS ROBERTO LUPI","cargo":"Senador"},{"id":"1524532","numero":"255","apelido":"CESAR MAIA","nome":"CESAR EPITACIO MAIA","cargo":"Senador"},{"id":"1524337","numero":"100","apelido":"DIPLOMATA SEBASTIÃO NEVES","nome":"SEBASTIÃO NEVES","cargo":"Senador"},{"id":"1523044","numero":"211","apelido":"EDUARDO SERRA","nome":"EDUARDO GONÇALVES SERRA","cargo":"Senador"},{"id":"1522977","numero":"161","apelido":"HEITOR FERNANDES","nome":"HEITOR FERNANDES FILHO","cargo":"Senador"},{"id":"1523644","numero":"901","apelido":"LILIAM SÁ","nome":"LILIAM SÁ DE PAULA","cargo":"Senador"},{"id":"1523269","numero":"500","apelido":"PEDRO ROSA","nome":"PEDRO ROSA CABRAL","cargo":"Senador"},{"id":"1523536","numero":"400","apelido":"ROMÁRIO","nome":"ROMÁRIO DE SOUZA FARIA","cargo":"Senador"},{"id":"1526194","numero":"161","apelido":"ANA CELIA","nome":"ANA CÉLIA SIQUEIRA FERREIRA","cargo":"Senador"},{"id":"1526276","numero":"131","apelido":"FÁTIMA","nome":"MARIA DE FÁTIMA BEZERRA","cargo":"Senador"},{"id":"1526230","numero":"500","apelido":"PROFESSOR LAILSON","nome":"LAILSON DE ALMEIDA","cargo":"Senador"},{"id":"1526209","numero":"177","apelido":"ROBERTO RONCONI","nome":"CARLOS ROBERTO RONCONI","cargo":"Senador"},{"id":"1526126","numero":"400","apelido":"VILMA MARIA DE FARIA","nome":"WILMA MARIA DE FARIA","cargo":"Senador"},{"id":"1526689","numero":"123","apelido":"ACIR GURGACZ","nome":"ACIR MARCOS GURGACZ","cargo":"Senador"},{"id":"1526979","numero":"500","apelido":"ALUIZIO VIDAL","nome":"ALUIZIO VIDAL FLOR","cargo":"Senador"},{"id":"1526763","numero":"111","apelido":"IVONE CASSOL","nome":"IVONE MEZZOMO CASSOL","cargo":"Senador"},{"id":"1526627","numero":"555","apelido":"MOREIRA MENDES","nome":"RUBENS MOREIRA MENDES FILHO","cargo":"Senador"},{"id":"1527071","numero":"456","apelido":"ANCHIETA","nome":"JOSE DE ANCHIETA JUNIOR","cargo":"Senador"},{"id":"1527076","numero":"160","apelido":"DIONISIO ALVES","nome":"DIONISIO ALVES DA SILVA","cargo":"Senador"},{"id":"1527480","numero":"545","apelido":"DRª JOSY CARVALHO","nome":"JOSY KEILA BERNARDES DE CARVALHO","cargo":"Senador"},{"id":"1527111","numero":"223","apelido":"LUCIANO CASTRO","nome":"LUCIANO DE SOUZA CASTRO","cargo":"Senador"},{"id":"1527235","numero":"144","apelido":"MOZARILDO","nome":"FRANCISCO MOZARILDO DE MELO CAVALCANTI","cargo":"Senador"},{"id":"1527249","numero":"123","apelido":"TELMÁRIO MOTA","nome":"TELMÁRIO MOTA DE OLIVEIRA","cargo":"Senador"},{"id":"1527785","numero":"333","apelido":"CIRO MACHADO","nome":"CIRO CASTILHO MACHADO","cargo":"Senador"},{"id":"1527796","numero":"444","apelido":"GOLD","nome":"RUBENS GOLDENBERG","cargo":"Senador"},{"id":"1527662","numero":"160","apelido":"JULIO FLORES","nome":"JULIO CEZAR LEIRIAS FLORES","cargo":"Senador"},{"id":"1527790","numero":"123","apelido":"LASIER MARTINS","nome":"LASIER COSTA MARTINS","cargo":"Senador"},{"id":"1527692","numero":"131","apelido":"OLÍVIO DUTRA","nome":"OLÍVIO DE OLIVEIRA DUTRA","cargo":"Senador"},{"id":"1528059","numero":"111","apelido":"SIMONE LEITE","nome":"SIMONE REGINA DIEFENTHAELER LEITE","cargo":"Senador"},{"id":"1529088","numero":"333","apelido":"ALAN ALVES MOREIRA","nome":"ALAN ALVES MOREIRA","cargo":"Senador"},{"id":"1528876","numero":"155","apelido":"DÁRIO","nome":"DÁRIO ELIAS BERGER","cargo":"Senador"},{"id":"1528995","numero":"130","apelido":"MILTON MENDES","nome":"MILTON MENDES DE OLIVEIRA","cargo":"Senador"},{"id":"1529203","numero":"401","apelido":"PAULO BORNHAUSEN","nome":"PAULO ROBERTO BARRETO BORNHAUSEN","cargo":"Senador"},{"id":"1528750","numero":"444","apelido":"PROFESSORA JUNARA FERRAZ","nome":"JUNARA APARECIDA GONCALVES FERRAZ","cargo":"Senador"},{"id":"1528866","numero":"160","apelido":"ROSANE DE SOUZA","nome":"ROSANE DE SOUZA","cargo":"Senador"},{"id":"1528707","numero":"500","apelido":"SARGENTO SOARES","nome":"AMAURI SOARES","cargo":"Senador"},{"id":"1529619","numero":"543","apelido":"BILA","nome":"MOACIR CRUZ DOS SANTOS","cargo":"Senador"},{"id":"1529414","numero":"161","apelido":"LEANDRO","nome":"EDIVALDO SOARES LEANDRO","cargo":"Senador"},{"id":"1529418","numero":"251","apelido":"MARIA DO CARMO","nome":"MARIA DO CARMO DO NASCIMENTO ALVES","cargo":"Senador"},{"id":"1529371","numero":"212","apelido":"PROFESSOR MARQUES","nome":"JOSÉ ANTÔNIO MARQUES DE OLIVEIRA","cargo":"Senador"},{"id":"1529412","numero":"131","apelido":"ROGÉRIO","nome":"ROGÉRIO CARVALHO SANTOS","cargo":"Senador"},{"id":"1532784","numero":"161","apelido":"ANA LUIZA","nome":"ANA LUIZA DE FIGUEIREDO GOMES","cargo":"Senador"},{"id":"1532102","numero":"210","apelido":"EDMILSON COSTA","nome":"EDMILSON SILVA COSTA","cargo":"Senador"},{"id":"1529976","numero":"131","apelido":"EDUARDO SUPLICY","nome":"EDUARDO MATARAZZO SUPLICY","cargo":"Senador"},{"id":"1532754","numero":"441","apelido":"FERNANDO LUCAS","nome":"LUIZ FERNANDO AMARAL LUCAS","cargo":"Senador"},{"id":"1532203","numero":"400","apelido":"GENILDO MOREIRA","nome":"GENILDO MOREIRA SILVA","cargo":"Senador"},{"id":"1530872","numero":"555","apelido":"GILBERTO KASSAB","nome":"GILBERTO KASSAB","cargo":"Senador"},{"id":"1530523","numero":"456","apelido":"JOSÉ SERRA","nome":"JOSÉ SERRA","cargo":"Senador"},{"id":"1530423","numero":"290","apelido":"JURACI GARCIA","nome":"JURACI BAENA GARCIA","cargo":"Senador"},{"id":"1530186","numero":"430","apelido":"KAKA WERA","nome":"CARLOS ALBERTO DOS SANTOS","cargo":"Senador"},{"id":"1530938","numero":"140","apelido":"MARLENE CAMPOS MACHADO","nome":"MARLENE OLIVEIRA DE CAMPOS MACHADO","cargo":"Senador"},{"id":"1533220","numero":"281","apelido":"SENADOR FLÁQUER","nome":"RICARDO SIMON FLAQUER","cargo":"Senador"},{"id":"1533337","numero":"211","apelido":"CEIÇA","nome":"MARIA DA CONCEIÇÃO SILVA DE OLIVEIRA","cargo":"Senador"},{"id":"1533608","numero":"777","apelido":"EDUARDO GOMES","nome":"CARLOS EDUARDO TORRES GOMES","cargo":"Senador"},{"id":"1533645","numero":"500","apelido":"ELVIO QUIRINO","nome":"ELVIO QUIRINO PEREIRA","cargo":"Senador"},{"id":"1533575","numero":"280","apelido":"JOEL MATOS","nome":"JOEL MATOS DA SILVA","cargo":"Senador"},{"id":"1533346","numero":"155","apelido":"KATIA ABREU","nome":"KATIA REGINA DE ABREU","cargo":"Senador"},{"id":"1533495","numero":"900","apelido":"SARGENTO ARAGÃO","nome":"MANOEL ARAGÃO DA SILVA","cargo":"Senador"}];

chrome.omnibox.onInputEntered.addListener(function (text, venum) {
	chrome.tabs.update({
     url: "http://projetobrasil.org/#!/cand/" + generateUrl(text)
	});
	
	//navigate("http://projetobrasil.org/#!/cand/" + generateUrl(text));
});

chrome.omnibox.onInputChanged.addListener(function (text, suggest) {
	var retorno = searchStringInArray(text, candidatos);
	suggest(retorno);

	/*
	suggest([
      {content: text + " one", description: "the first one"},
      {content: text + " number two", description: "the second entry"},
	  {content: "Candidata a Presidêcia da República", description:"<url>endereco do site</url><match>es<dim>se</dim>\nteste\noutro é</match><dim> o texto do teste...</dim>testando blá blá blá..."}
    ]);*/
});

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


