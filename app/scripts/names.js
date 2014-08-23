

/*$('.highlight-quem-financia').each(function() {  	
	var currentKey = $(this).text();
	$('.quem-financia-citados').append("<li>"+currentKey + "</li>");
});*/

$.each(nick, function(key, value) {
	$(".quem-financia-citados").append("<li>" + key + "</li>");
});