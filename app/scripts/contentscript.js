'use strict';

console.log('\'Allo \'Allo! Content script');

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
  console.log(nick); 
  $.each(nick, function(key, value) {
      $("p").highlight(key, {caseSensitive: false, className: 'highlight-quem-financia', wordsOnly:true });
    });
    
    $('.highlight-quem-financia').each(function() {  	
    	var currentKey = $(this).text();
    	nick[currentKey]
    });

}, function(err) {
  console.log(err); // Error: "It broke"
});