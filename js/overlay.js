var overlay = function() {
    var bookedColour = "#bf0000",
	emptyColour = "#26bf00",
    img = document.getElementById("plan"),
    normalOpacity = ".3",
    overOpacity = ".8";
    img.style.display = "none";
    
    var r = Raphael("info", 800,800);
    r.image(img.src, 0, 0, 800, 800);
    

    return {
        drawRoom : function(meetingRoom) {	    
            fillValue = meetingRoom.isBooked ? bookedColour : emptyColour;
    		meetingRoom["drawnRoom"] = r.path(meetingRoom.path)
    		.attr({stroke: fillValue, fill: fillValue, "fill-opacity": normalOpacity })
    		.mouseover(function () {
       			this.animate({"fill-opacity": overOpacity}, 700) 
      		}).mouseout(function() {
      			this.animate({"fill-opacity": normalOpacity}, 700) 
      		}).click(function() {showBookingForm(meetingRoom); });
        },
        showBookingForm : function (meetingRoom) { 
        		$( "#bookingForm" ).dialog('open');
        }
    };
};




