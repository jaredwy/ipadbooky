var bookRooms = (function() {
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
    };

    var handleError = function(error) {
        console.error("There was an error!");
        console.error(error.cause ? error.cause.statusText: error.message);
    };

    var loadCalendars = function(callback) {
        calendarService = new google.gdata.calendar.CalendarService('Atlassian-IpadMeetingRoom');
        calendarService.getAllCalendarsFeed(feed, function(result){
            entries = result.feed.entry;
            var summary;
            for (var i = 0, ii = entries.length; i < ii; i++) {
                summary = entries[i].getSummary();
                if (summary && summary.getText().match(/-meeting room/)) {
                    listOfCal.push({
                        title: entries[i].getTitle().getText(),
                        calandar: entries[i]
                    });
                }
            }
            callback(listOfCal); 
        }, function(result) { callback("error")});
    };
    
    var getCalanderForTitle = function(title) {
          for (var i = 0, ii = listOfCal.length; i < ii; i++) {
              if(listOfCal[i].title == title) return listOfCal[i];
          }
          return "";
    };
   var loadEventForCalander  = function(calanderTitle,dateFrom,dateTo,callback) {
            var query = feed,
            calander = getCalanderForTitle(calanderTitle);
            if(dateFrom) {
                query = new google.gdata.calendar.CalendarEventQuery(feed);
                var min = google.gdata.DateTime.fromIso8601(dateFrom.toISOString()),
                max = google.gdata.DateTime.fromIso8601(dateFrom.toISOString());
                query.setMinimumStartTime(min);
                query.setMaximumStartTime(max);
            }
            calendarService.getEventsFeed(query,callback, handleError);
    }
    var doesHaveEvent = function(calanderTitle,dateFrom,dateTo,callback){
        loadEventForCalander(calanderTitle,dateFrom,dateTo,function(root) {
            for (var i = 0; i < root.feed.entry.length; i++ ) {
                var eventEntry = entries[i];
                var eventTitle = eventEntry.getTitle().getText();
                if(eventTitle == calanderTitle) {
                    eventEntry
                }
            }
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
    };
    var bookRoom = function(calanderTitle,dateFrom,dateTo) {
        alert('booked');
    }
    
    google.setOnLoadCallback(init);
    return {
        getAllMeetingRooms : function(callback) {
            loadCalendars(callback);
        },
        getBookings: function(calanderTitle,dateFrom,dateTo,callback) {
            loadEventForCalander(calanderTitle,dateFrom,dateTo,callback);
        },
        isBooked: function(calanderTitle,dateFrom,dateTo,callback) {
            doesHaveEvent(calanderTitle,dateFrom,dateTo,callback);
        },
        getNextFree: function(calanderTitle,dateFrom,dateTo,callback) {
            alert('hello world');
        },
        bookRoom: function(calanderTitle,dateFrom,dateTo) {
            bookRoom(calanderTitle,dateFrom,dateTo);
        }
    };

})();
