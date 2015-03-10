accordionController = (function($) {
	var ret = {}, title, titleIcon, content, contentOpen,
		eventTitle, eventContent, win,
		tickets;

	function onDocumentReady() {
		win = $(window);
		title = $('.accordion-title');
		titleIcon = $('.accordion-title .icon');
		content = $('.accordion-content');
		contentOpen = 'open-on-init';
		eventTitle = $('.event-title');
		eventContent = $('.event-content');
		tickets = $(document.getElementById('tickets'));

		title.on('click', onAccordionClick);
		eventTitle.on('click', onEventClick);

		if (win.width() < BreakpointController.MEDIUM) {
			$('.event-title').first().trigger("click");
			setTimeout(function() {
				content.removeClass(contentOpen);
			}, 200);
		}
	}

	function onEventClick(e) {
		clicked = $(e.currentTarget);
		sibling = eventTitle.not(clicked);
		titleIcon = clicked.children().children().not('span');

		if (clicked.next(eventContent).is(':visible')) {
			//close the closest accordion
			eventClose();

		} else {
			//open the event
			eventOpen();
		}
	}

	function onAccordionClick(e) {
		clicked = $(e.currentTarget);
		sibling = title.not(clicked);
		titleIcon = clicked.children().children().not('span');

		if (win.width() >= BreakpointController.MEDIUM) {
			return false;
		}

		if (clicked.next(content).is(':visible')) {
			//close the closest accordion
			accordionClose();

		} else {
			//open the accordion
			accordionOpen();
		}
	}

	function eventOpen() {
		clicked.addClass('open').parent().addClass('active');
		clicked.next(eventContent).velocity('slideDown', {duration: 500}, 'easeOutQuart');

		//also, close its sibling accordions
		if (sibling.hasClass('open')) {
			sibling.removeClass('open');
			sibling.next(eventContent).velocity('slideUp', {duration:500}, 'easeInQuart');
		}
	}

	function accordionOpen() {
		clicked.addClass('open').parent().addClass('active');
		clicked.next(content).velocity('slideDown', {duration: 500}, 'easeOutQuart');

		//also, close its sibling accordions
		if (sibling.hasClass('open')) {
			sibling.removeClass('open');
			sibling.next(content).velocity('slideUp', {duration:500}, 'easeInQuart');
		}
	}

	function accordionClose() {
		clicked.removeClass('open').parent().removeClass('active');
		clicked.next(content).velocity('slideUp', {duration: 500}, 'easeInQuart');
	}
	function eventClose() {
		clicked.removeClass('open').parent().removeClass('active');
		clicked.next(eventContent).velocity('slideUp', {duration: 500}, 'easeInQuart');
	}

	$(onDocumentReady);

	ret = {
		accordionOpen: accordionOpen,
		accordionClose: accordionClose
	};
	return ret;
})(jQuery);
