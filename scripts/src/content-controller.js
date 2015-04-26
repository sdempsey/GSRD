var contentController;

contentController = (function($) {
	var ret = {}, win, doc,
		wftda, bruiseLetter,
		footerNav, tweetScreenName, tweetText,
		tweet;

		function onDocumentReady() {
			win = $(window);
			doc = $(document);
			wftda = $('.wftda');
			bruiseLetter = $('.bruise-letter');
			footerNav = $('.footer-nav');
			tweet = $('.tweet');
			tweetScreenName = $('.tweet_screen_name');
			tweetText = $('.tweet_text');

			bindEventListeners();
		}


		function bindEventListeners() {
			$(BreakpointController).on('crossBreakpoint', onCrossBreakpoint);
			win.on('load', onWindowLoad);
		}

		function onCrossBreakpoint() {
			if (win.width() >= BreakpointController.LARGE) {
				bruiseLetterHeight();
			} else {
				bruiseLetter.attr('style', null);
			}
		}

		function bruiseLetterHeight() {
			var wftdaHeight = wftda.outerHeight(),
				footerNavHeight = footerNav.outerHeight();

			bruiseLetter.height(wftdaHeight + footerNavHeight);
		}

		function onWindowLoad() {
			//stuff that doesn't need to happen right away:

			if (win.width() >= BreakpointController.MEDIUM && tweet.length > 0) {
				formatTweets();
			}	

			if (win.width() >= BreakpointController.LARGE) {
				bruiseLetterHeight();
			}		
		}

		function formatTweets() {
			var wrappedElements = $('.tweet_profile_img ~ *'),
				reply = $('.tweet_intent_reply'),
				retweet = $('.tweet_intent_retweet'),
				favorite = $('.tweet_intent_favourite');

			tweet.each(function() {
				$(this).find(tweetScreenName).prependTo($(this).find(tweetText));
				$(this).find(wrappedElements).wrapAll('<div class="tweet_container" />');
				$(this).find(reply).html('<i class="icon icon-tweet-reply"></i>');
				$(this).find(retweet).html('<i class="icon icon-retweet"></i>');
				$(this).find(favorite).html('<i class="icon icon-tweet-favorite"></i>');
			});


		}

		$(onDocumentReady);

		ret = {};

		return ret;
})(jQuery);