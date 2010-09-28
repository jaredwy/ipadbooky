$(document).ready(function() {
	var bookedColour = "#bf0000",
	emptyColour = "#26bf00",
    img = document.getElementById("plan"),
    normalOpacity = ".3",
    overOpacity = ".8";
    img.style.display = "none";
    var r = Raphael("info", 800,800);
    r.image(img.src, 0, 0, 800, 800);	    
	for(var i = 0,length = meetings.length; i < length; i++){
	 	(function(currentRoom) {
			currentRoom["test"] = 100;
			fillValue = currentRoom.isBooked ? bookedColour : emptyColour;
			currentRoom["drawnRoom"] = r.path(currentRoom.path)
			.attr({stroke: fillValue, fill: fillValue, "fill-opacity": normalOpacity })
			.mouseover(function () {
       			this.animate({"fill-opacity": overOpacity}, 700) 
      		}).mouseout(function() {
      			this.animate({"fill-opacity": normalOpacity}, 700) 
      		}).click(function() { showBookingForm(currentRoom); });
  		})(meetings[i]);
	}

	$("#cal-list ul li").click(function(e) {
    	var meetingRoom = findRoom(jQuery.trim($(this).text()));
    	if(meetingRoom) {
    	    meetingRoom.drawnRoom.animate({scale: "1.1,1.1"},1000, function(){
    		    this.animate({scale: "1.0,1.0"}, 1000);
    	    });
	    }
	});	
	var findRoom = function(name) {
	    for (var i = meetings.length - 1; i >= 0; i--){
	       if(meetings[i].name == name) return meetings[i];
	    };
	    return "";
	}
	var showBookingForm = function (meeting) { 
    		$( "#bookingForm" ).dialog('open');
    }
	
	
});