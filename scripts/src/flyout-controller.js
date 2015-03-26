flyoutController = (function($) {
	var ret ={}, toggles, boutToggle,
	twitterToggle, boutContent, twitterContent,
	feeds, win;

	function onDocumentReady() {
		win = $(window);
		toggles = $("#toggle-feeds");
		boutToggle = $("#bout-tab");
		twittertoggle = $("#twitter-tab");
		boutContent = $("#bout-feed");
		twitterContent = $("#twitter-feed");
		feeds = $("#feeds");

		if (toggles.length > 0) {
			win.on("load", feedsInit);
			win.on("resize", onWindowResize);
		}
	}

	function onWindowResize() {
		resizeFeedsContainer();
	}

	function resizeFeedsContainer() {
		var feedHeight = toggles.height();
		feeds.height(feedHeight);		
	}

	function feedsInit() {
		resizeFeedsContainer();
	}

	$(onDocumentReady);

	ret = {};

	return ret;
})(jQuery);