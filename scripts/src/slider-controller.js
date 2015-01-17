sliderController = (function($) {
	var ret = {}, win, doc, images, slides;

	function onDocumentReady() {
		win = $(window);
		doc = $(document);
		images = $('#masthead-images');
		
	if ($().bxSlider) {
		init();
	}

	}

	function init() {
		options = {
			mode: 'fade',
			speed: 600,
			pause: 4000,
			easing: 'easeInOutQuart',
			controls: false,
			pager: false,
			auto: true,
		};

		images.bxSlider(options);
	}

	$(onDocumentReady);
	
	ret ={
		init: init
	};

	return ret;

})(jQuery);