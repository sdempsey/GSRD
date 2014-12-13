accordionController = (function($) {
	var ret = {}, title, titleIcon, content, contentOpen;

	function onDocumentReady() {
		title = $('.accordion-title');
		titleIcon = $('.accordion-title .icon');
		content = $('.accordion-content');
		contentOpen = 'open-on-init';

		title.on('click', onAccordionClick);
		
		if (content.hasClass(contentOpen)) {
			setTimeout(function() {
				content.removeClass(contentOpen);
			}, 200);
		}
	}

	function onAccordionClick(e) {
		clicked = $(e.currentTarget);
		sibling = title.not(clicked);
		titleIcon = clicked.children().children().not('span');

		if (clicked.next(content).is(':visible')) {
			//close the closest accordion
			accordionClose();					

		} else {
			//open the accordion
			accordionOpen();			
		}
	}

	function accordionOpen() {
		clicked.addClass('open').parent().addClass('active');
		clicked.next(content).velocity('slideDown', {duration: 600}, 'easeOutQuart');
		
		//also, close its sibling accordions
		if (sibling.hasClass('open')) {
			sibling.removeClass('open');
			sibling.next(content).velocity('slideUp', {duration:600}, 'easeInQuart');
		}
	}

	function accordionClose() {
		clicked.removeClass('open').parent().removeClass('active');
		clicked.next(content).velocity('slideUp', {duration: 600}, 'easeInQuart');
	}

	$(onDocumentReady);

	ret = {
		accordionOpen: accordionOpen,
		accordionClose: accordionClose
	};
	return ret;
})(jQuery);