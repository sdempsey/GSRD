ticketController = (function($) {
	var ret = {}, ticketAnchor, tickets,
		win, title, content, header;

	function onDocumentReady() {
		win = $(window);
		ticketAnchor = $(document.getElementById('ticket-anchor'));
		tickets = $(document.getElementById('tickets'));
		title = tickets.find('.accordion-title');
		content = tickets.find('.accordion-content');
		header = $(document.getElementById('body-header'));

		win.on('load', bindEvents);
		moveTickets();
	}

	function onTicketAnchorClick(e) {
		var clicked = $(e.currentTarget),
			target = clicked.attr('href'),
			scrollOffset = - header.height();

		if (win.width() < BreakpointController.SMALL) {
			linksController.closeLinks();
		}

		if (win.width() < BreakpointController.MEDIUM) {
			if (!content.is(':visible')) {
				title.trigger('click');
			}
			
			$(target)
				.velocity("stop")
				.velocity('scroll', { duration: "slow", delay: 200, offset: scrollOffset, easing: 'easeOutQuart'});

		} else {
			$(target)
				.velocity("stop")
				.velocity('scroll', { duration: "slow", offset: scrollOffset, easing: 'easeOutQuart'});
		}

		//stop  propagation & prevent default
		return false;
	}

	function bindEvents() {
		ticketAnchor.on('click', onTicketAnchorClick);
	}

	function moveTickets() {
		var container = $('.buy-tickets'),
			image = $('.tickets-and-info .image');

		if (Modernizr.mq('(min-width: 48em)')) {
			image.appendTo(container);
		}
	}

	$(onDocumentReady);

	ret = {

	};

	return ret;
})(jQuery);
