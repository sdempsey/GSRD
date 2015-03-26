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
		options = {
			mode: 'fade',
			speed: 600,
			pause: 4000,
			easing: 'easeInOutQuart',
			controls: false,
			pager: false			
		};

		bouts.bxSlider(options);
	}

	function homeMastHeadSlider() {
		options = {
			mode: 'fade',
			speed: 600,
			pause: 4000,
			easing: 'easeInOutQuart',
			controls: false,
			pager: false
		};

		images.bxSlider(options);		
	}

	$(onDocumentReady);
	
	ret ={
		init: init
	};

	return ret;

})(jQuery);