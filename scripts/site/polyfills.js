// Custom test for matchMedia support
Modernizr.addTest('matchmedia', function () {
    return !!(window.webkitMatchMedia || window.mozMatchMedia || window.oMatchMedia || window.msMatchMedia || window.matchMedia);
});

// Script loader
Modernizr.load([
    { // Media Queries
        test: Modernizr.mq,
        nope: SiteInfo.theme_directory + '/scripts/libraries/respond.src.js'
    },
    { // matchMedia
        test: Modernizr.matchmedia,
        nope: SiteInfo.theme_directory + '/scripts/libraries/matchMedia.js'
    },
    { // CSS3 pseudo-classes
        test: Modernizr.rgba,
        nope: SiteInfo.theme_directory + '/scripts/libraries/selectivizr.js'
    }
]);