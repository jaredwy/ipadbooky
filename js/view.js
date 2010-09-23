var addCal = function(title){
    var toAdd = $('<li class="arrow">'+ title +'</li>').bind('click',function(e) { 
        
    });
    $(".rounded").append(toAdd);
};
$(window).load(function(){
    $.jQTouch();    
});