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
		bookRooms.getAllMeetingRooms(function(loadedCals) {
		    var overlayMap = overlay(); 
            for (var i = loadedCals.length - 1; i >= 0; i--) {
                    var room = findRoom(loadedCals[i].title);
                    if(room) {
                        bookRooms.isBooked(loadedCals[i].title,Date.today(),Date.today(),function(isBooked) {
                           alert(isBooked); 
                        });
                        overlayMap.drawRoom(room);
                        var item  = $("<li>" + loadedCals[i].title + "</li>").click(function() {
                    	    overlayMap.showBookingForm(room);
                    	}).mouseover(function(e) {
                        	    room.drawnRoom.animate({scale: "1.1,1.1"},1000, function(){
                        		    this.animate({scale: "1.0,1.0"}, 1000);
                        	    });
                    	});
                    	$("#cal-list ul").append(item);
                    }
                    else {
                        //alert to an error finding a matching room
                    }
            };
		});
		
		var findRoom = function(name) {
             for (var i = meetings.length - 1; i >= 0; i--){
                if(meetings[i].name == name) return meetings[i];
             };
             return "";
         }
		
});


