accordionController = (function($) {
	var ret = {}, title, titleIcon, content, contentOpen,
		eventTitle, eventContent, win,
		tickets, accordion, eventAccordion;

	function onDocumentReady() {
		win = $(window);
		accordion = $('.accordion');
		eventAccordion = $('.event-accordion');
		title = $('.accordion-title');
		titleIcon = $('.accordion-title').find('.icon');
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
		
		if (win.width() >= BreakpointController.MEDIUM) {
			return false;
		}

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
		clicked.addClass('open')
		.closest(eventAccordion)
		.addClass('active')
		.find(eventContent)
		.velocity('slideDown', {duration: "fast", easing: "easeOutQuart"});

		//also, close its sibling eventAccordions
		if (sibling.hasClass('open')) {
			sibling.removeClass('open')
			.closest(eventAccordion)
			.find(eventContent)
			.velocity('slideUp', {duration: "fast", easing: "easeInQuart"});
		}
	}

	function accordionOpen() {
		clicked.addClass('open')
		.closest(accordion)
		.addClass('active')
		.find(content)
		.velocity('slideDown', {duration: "fast", easing: "easeOutQuart"});

		//also, close its sibling accordions
		if (sibling.hasClass('open')) {
			sibling.removeClass('open')
			.closest(accordion)
			.find(content)
			.velocity('slideUp', {duration: "fast", easing: "easeInQuart"});
		}
	}

	function accordionClose() {
		clicked.removeClass('open')
		.closest(accordion)
		.removeClass('active')
		.find(content)
		.velocity('slideUp', {duration: "fast", easing: "easeInQuart"});
	}

	function eventClose() {
		clicked.removeClass('open')
		.closest(eventAccordion)
		.removeClass('active')
		.find(eventContent).velocity('slideUp', {duration: "fast", easing: "easeInQuart"});
	}

	$(onDocumentReady);

	ret = {
		accordionOpen: accordionOpen,
		accordionClose: accordionClose
	};
	return ret;
})(jQuery);
