$(document).ready(function(){
	console.log('document ready');
	$( "#vibrarCel" ).click(function() {
        console.log('vibra');
        navigator.vibrate(3000);
    });

});
