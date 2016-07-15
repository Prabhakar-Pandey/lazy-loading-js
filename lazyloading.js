var LazyLoad = function() {
    var LazyLoad = {};
    LazyLoad.events = {};

    LazyLoad.on = function(eventName, fn) {
        LazyLoad.events[eventName] = LazyLoad.events[eventName] || [];
        LazyLoad.events[eventName].push(fn);
    },
    LazyLoad.off = function(eventName, fn) {
        if (LazyLoad.events[eventName]) {
            for (var i = 0; i < LazyLoad.events[eventName].length; i++) {
                if (LazyLoad.events[eventName][i] === fn) {
                    LazyLoad.events[eventName].splice(i, 1);
                    break;
                }
            };
        }
    },
    LazyLoad.emit = function(eventName, data) {
        if (LazyLoad.events[eventName]) {
            LazyLoad.events[eventName].forEach(function(fn) {
                fn(data);
            });
        }
    }

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
            LazyLoad.emit('newPageCalled', LazyLoad.pageNo);
        }
    }

    return LazyLoad;
};

// var events = {
//     events: {},
//     on: function(eventName, fn) {
//         LazyLoad.events[eventName] = LazyLoad.events[eventName] || [];
//         LazyLoad.events[eventName].push(fn);
//     },
//     off: function(eventName, fn) {
//         if (LazyLoad.events[eventName]) {
//             for (var i = 0; i < LazyLoad.events[eventName].length; i++) {
//                 if (LazyLoad.events[eventName][i] === fn) {
//                     LazyLoad.events[eventName].splice(i, 1);
//                     break;
//                 }
//             };
//         }
//     },
//     emit: function(eventName, data) {
//         if (LazyLoad.events[eventName]) {
//             LazyLoad.events[eventName].forEach(function(fn) {
//                 fn(data);
//             });
//         }
//     }
// };
