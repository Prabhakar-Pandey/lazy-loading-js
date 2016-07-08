var LazyLoad = function() {
    var LazyLoad = {};

    LazyLoad.init = function(containerId) {
        if (containerId) {
            LazyLoad.containerId = containerId;
        }
        window.onscroll = LazyLoad.scrollHandler;
    }

    LazyLoad.scrollHandler = function() {
        var scrollPos = window.pageYOffset; //gives scroller position on browser
        var screenHeight = window.innerHeight; //gives the the height of window screen
        var contentHeight;
        if (LazyLoad.containerId) { // if there is id availble for parent div
            contentHeight = document.getElementById(LazyLoad.containerId).offsetHeight;
        } else {
            contentHeight = document.getElementsByTagName('body')[0].offsetHeight;
        }

        if (scrollPos + screenHeight >= contentHeight) {
            events.emit('newPageCalled', LazyLoad.pageNo);
        }
    }

    return LazyLoad;
};

var events = {
    events: {},
    on: function(eventName, fn) {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(fn);
    },
    off: function(eventName, fn) {
        if (this.events[eventName]) {
            for (var i = 0; i < this.events[eventName].length; i++) {
                if (this.events[eventName][i] === fn) {
                    this.events[eventName].splice(i, 1);
                    break;
                }
            };
        }
    },
    emit: function(eventName, data) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(function(fn) {
                fn(data);
            });
        }
    }
};
