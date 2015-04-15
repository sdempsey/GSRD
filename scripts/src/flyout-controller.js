flyoutController = (function($) {
	var ret ={}, toggles, boutOpen,
	twitterOpen, boutContent, twitterContent,
	feeds, win,
	boutTabWidth, twitterTabWidth,
	boutContentWidth, twitterContentWidth,
	boutClose, twitterClose;

	function onDocumentReady() {
		win = $(window);
		toggles = $("#toggle-feeds");
		boutOpen = $("#bout-tab");
		boutClose = $("#close-bout");
		twitterOpen = $("#twitter-tab");
		twitterClose = $("#close-twitter");
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
		//cache element widths for animation
		boutCloseWidth = boutClose.width();
		boutTabWidth = boutOpen.width();
		twitterCloseWidth = twitterClose.width();
		twitterTabWidth = twitterOpen.width();
		twitterContentWidth = twitterContent.width();
		boutContentWidth = boutContent.width();

		resizeFeedsContainer();

		//add event listeners
		boutOpen.on("click", openBoutFeed);
		boutClose.on("click", closeBoutFeed);
		twitterOpen.on("click", openTwitterFeed);
		twitterClose.on("click", closeTwitterFeed);		

	}

	function onBoutOpenClick() {
		openBoutFeed();
	}

	function onBoutCloseClick() {
		closeBoutFeed();
	}

	function openBoutFeed() {
		boutOpen.velocity("stop")
		.velocity({translateX: [boutTabWidth, 0]}, "fast", "easeInQuart");

		boutContent.velocity("stop")
		.velocity({translateX: [0, boutContentWidth + 7]}, {delay: 200, duration: "fast", easing: "easeOutQuart", 
			complete: function() {
				boutClose.velocity("stop")
				.velocity({translateX: [-boutCloseWidth, 0], zIndex: [0, -1]}, "fast", "easeOutQuart");
			}
		});
		
		//preventDefault & stopPropagation		
		return false;
	}

	function closeBoutFeed() {
		boutClose.velocity("stop")
		.velocity({translateX: [0, -boutCloseWidth], zIndex: [-1, 0]}, "fast", "easeInQuart");

		boutContent.velocity("stop")
		.velocity({translateX: [boutContentWidth + 7, 0]}, {delay: 200, duration: "fast", easing: "easeInQuart", 
			complete: function() {
				boutOpen.velocity("stop")
				.velocity({translateX: [0, boutTabWidth]}, "fast", "easeOutQuart");
			}
		});

		//preventDefault & stopPropagation
		return false;		
	}

	function onTwitterOpenClick() {
		openTwitterFeed();
	}

	function onTwitterCloseClick() {
		closeTwitterFeed();
	}

	function openTwitterFeed() {
		twitterOpen.velocity("stop")
		.velocity({translateX: [twitterTabWidth, 0]}, "fast", "easeInQuart");

		twitterContent.velocity("stop")
		.velocity({translateX: [0, twitterContentWidth]}, {delay: 200, duration: "fast", easing: "easeOutQuart", 
			complete: function() {
				twitterClose.velocity("stop")
				.velocity({translateX: [-twitterCloseWidth, 0]}, "fast", "easeOutQuart");
			}
		});
		
		//preventDefault & stopPropagation
		return false;
	}

	function closeTwitterFeed() {
		twitterClose.velocity("stop")
		.velocity({translateX: [0, -twitterCloseWidth]}, "fast", "easeInQuart");

		twitterContent.velocity("stop")
		.velocity({translateX: [twitterContentWidth, 0]}, {delay: 200, duration: "fast", easing: "easeInQuart", 
			complete: function() {
				twitterOpen.velocity("stop")
				.velocity({translateX: [0, twitterTabWidth]}, "fast", "easeOutQuart");
			}
		});
		
		//preventDefault & stopPropagation
		return false;
	}	

	$(onDocumentReady);

	ret = {};

	return ret;
})(jQuery);