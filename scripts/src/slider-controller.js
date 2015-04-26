sliderController = (function($) {
	var ret = {}, win, doc, images, bouts;

	function onDocumentReady() {
		win = $(window);
		doc = $(document);
		images = $(document.getElementById('masthead-images'));
		bouts = $(document.getElementById("feed-events"));
		
		if ($().bxSlider && images.length > 0) {
			init();
		}

	}

	function init() {
		if (images.length > 0) {
			homeMastHeadSlider();
		}

		if (bouts.length > 0) {
			homeBoutSlider();
		}
	}

	function homeBoutSlider() {

		var options = {
			mode: 'fade',
			speed: 600,
			pause: 4000,
			easing: 'easeInOutQuart',
			pager: false,
			nextSelector: '#feed-next',
			prevSelector: '#feed-prev',
			nextText: '&#xF111;',
  			prevText: '&#xF112;'
		};

		bouts.bxSlider(options);
	}

	function homeMastHeadSlider() {
		var options = {
			mode: 'fade',
			speed: 600,
			pause: 4000,
			easing: 'easeInOutQuart',
			controls: false,
			pager: false,
			auto: true,
			preloadImages: 'visible'
		};

		images.bxSlider(options);		
	}

	$(onDocumentReady);
	
	ret ={
		init: init
	};

	return ret;

})(jQuery);