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
		.velocity({right: [- boutTabWidth, 0]}, 200, "easeInQuart");

		boutContent.velocity("stop")
		.velocity({right: [0, - boutContentWidth -7]}, {delay: 200, duration: 400, easing: "easeOutQuart", 
			complete: function() {
				boutClose.velocity("stop")
				.velocity({left: [-boutCloseWidth, 0], zIndex: [0, -1]}, 300, "easeOutQuart");
			}
		});
		
		//preventDefault & stopPropagation		
		return false;
	}

	function closeBoutFeed() {
		boutClose.velocity("stop")
		.velocity({left: [0, -boutCloseWidth], zIndex: [-1, 0]}, 200, "easeInQuart");

		boutContent.velocity("stop")
		.velocity({right: [- boutContentWidth - 7, 0]}, {delay: 200, duration: 400, easing: "easeInQuart", 
			complete: function() {
				boutOpen.velocity("stop")
				.velocity({right: [0, - boutTabWidth]}, 400, "easeOutQuart");
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
		.velocity({right: [- twitterTabWidth, 0]}, 200, "easeInQuart");

		twitterContent.velocity("stop")
		.velocity({right: [0, - twitterContentWidth]}, {delay: 200, duration: 400, easing: "easeOutQuart", 
			complete: function() {
				twitterClose.velocity("stop")
				.velocity({left: [-twitterCloseWidth, 0]}, 200, "easeOutQuart");
			}
		});
		
		//preventDefault & stopPropagation
		return false;
	}

	function closeTwitterFeed() {
		twitterClose.velocity("stop")
		.velocity({left: [0, -twitterCloseWidth]}, 200, "easeInQuart");

		twitterContent.velocity("stop")
		.velocity({right: [- twitterContentWidth, 0]}, {duration: 400, easing: "easeInQuart", 
			complete: function() {
				twitterOpen.velocity("stop")
				.velocity({right: [0, - twitterTabWidth]}, 400, "easeOutQuart");
			}
		});
		
		//preventDefault & stopPropagation
		return false;
	}	

	$(onDocumentReady);

	ret = {};

	return ret;
})(jQuery);