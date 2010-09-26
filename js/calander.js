var meetingRooms = (function() {
    var scope = "https://www.google.com/calendar/feeds/",
    feed = "https://www.google.com/calendar/feeds/default/allcalendars/full",
    calendarService,
    token,
    time = 1,
    entries,
    listOfCal = [];

    google.load("gdata", "2.x", {
        packages: ["calendar"]
    });


    var init = function() {
        google.gdata.onLoad();
        location.hash.length ? poll() : verify();
    };
    var verify = function() {
        if (!!google.accounts.user.checkLogin(scope)) {
            processAfterLogin();
        } else {
            google.accounts.user.login(scope);
        }
    };
    var poll = function() {
        var timer = setTimeout(function() {
            location.hash.length ? poll() : verify();
        },
        time);
        time = time * 2;
    };

    var processAfterLogin = function() {
        calendarService = new google.gdata.calendar.CalendarService('Atlassian-IpadMeetingRoom');
        calendarService.getAllCalendarsFeed(feed, loadCalendars, handleError);
    };

    var handleError = function(error) {
        console.error("There was an error!");
        console.error(error.cause ? error.cause.statusText: error.message);
    };

    var loadCalendars = function(result) {
        entries = result.feed.entry;
        var summary;
        for (var i = 0, ii = entries.length; i < ii; i++) {
            summary = entries[i].getSummary();
            if (summary && summary.getText().match(/-meeting room/)) {
                listOfCal.push({
                    title: entries[i].getTitle().getText(),
                    calandar: entries[i]
                });
                addCal(entries[i].getTitle().getText());
            }
        }
    };
    
    var getCalanderForTitle = function(title) {
          for (var i = 0, ii = listOfCal.length; i < ii; i++) {
              if(listOfCal[i].title == title) return listOfCal[i];
          }
          return "";
    };
    loadEventForCalander : function(calanderTitle,dateFrom,dateTo,callback) {
            var query = feed,
            calander = getCalanderForTitle(calanderTitle);
            if(dateFrom) {
                query = new google.gdata.calendar.CalendarEventQuery(feed);
                var min = google.gdata.DateTime.fromIso8601(dateFrom.toISOString()),
                max = google.gdata.DateTime.fromIso8601(dateFrom.toISOString());
                when.setMinimumStartTime(min);
                when.setMaximumStartTime(max);
            }
            calendarService.getEventsFeed(query,callback, handleError);
    }
    var doesHaveEvent = function(calanderTitle,dateFrom,dateTo,callback){
        loadEventForCalander(calanderTitle,dateFrom,dateTo,function(root) {
            callback(!!root.feed.getEntries().length);
        });
    };
    
    var nextFree = function(calanderTitle,callback) {
        var now = Date.today();
        loadEventForCalander(calanderTitle,now,now.set({ hour: 24, minute: 00 }), function(root) {
            if(root.feed.getEntries().length) {
                
            }
            else {
                callback("Room free till end of day");
            }
        });
        )
    };
    
    google.setOnLoadCallback(init);

    return {
        getBookings: function(calanderTitle,dateFrom,dateTo,callback) {
            loadEventForCalander(calanderTitle,dateFrom,dateTo,callback);
        },
        isBooked: function(calanderTitle,dateFrom,dateTo,callback) {
            doesHaveEvent(calanderTitle,dateFrom,dateTo,callback);
        },
        getNextFree: function(calanderTitle,dateFrom,dateTo,callback) {
            
        }
    };

})();
