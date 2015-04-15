// twitterController = (function($) {
// 	var container, win;

// 	function onDocumentReady() {
// 		win = $(window);
// 		container = $(document.getElementById("feed-container"));

// 		if (container.length > 0) {
// 			win.on("load", widgetInit);
// 		}
// 	}

// 	function widgetInit() {
// 		twttr.widgets.createTimeline(
// 			'581942955570819073',
// 			document.getElementById('feed-container'),
// 			{
// 				width: '100%',
// 				height: '320',
// 				related: 'twitterdev,twitterapi',
// 				chrome: 'noheader nofooter noborders transparent noscrollbars',
// 				showReplies: false,
// 				tweetLimit: 2
// 			}).then(function (el) {
// 				//silence is golden
// 			});		
// 		}

// 		$(onDocumentReady);
// 	})(jQuery);
