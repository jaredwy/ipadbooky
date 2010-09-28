$(document).ready(function(){
    	$( "#bookingForm" ).dialog({
					autoOpen: false,
					height: 300,
					width: 350,
					modal: true,
					buttons: {
						Book: function() {
								alert('hello');
							},
						Cancel: function() {
							$( this ).dialog( "close" );
						}
					},
					close: function() {
					}
		});
       
});