(function() {
    var scope = "https://www.google.com/calendar/feeds/",
    feed = "https://www.google.com/calendar/feeds/default/allcalendars/full",
    calendarService,
    token, time = 1;
    
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
        var timer = setTimeout(function() { location.hash.length ? poll() : verify(); } ,time);
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
        var entries = result.feed.entry, summary;
        for (var i = 0, ii = entries.length; i < ii; i++) {
            summary = entries[i].getSummary();
            if(summary && summary.getText().match(/-meeting room/)) {
                console.log(entries[i].getTitle().getText());
            }
        }

    };

    google.setOnLoadCallback(init);
})();

