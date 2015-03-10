sliderController = (function($) {
	var ret = {}, win, doc, images, slides;

	function onDocumentReady() {
		win = $(window);
		doc = $(document);
		images = $(document.getElementById('masthead-images'));
		
		if ($().bxSlider && images.length > 0) {
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