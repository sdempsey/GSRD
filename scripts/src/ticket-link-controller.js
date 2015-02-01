ticketLinkController = (function($) {
	var ret = {}, ticketAnchor, tickets,
		win, title, content, header,
		windowHash;

	function onDocumentReady() {
		win = $(window);
		ticketAnchor = $(document.getElementById('ticket-anchor'));
		tickets = $(document.getElementById('tickets'));
		title = tickets.find('.accordion-title');
		content = tickets.find('.accordion-content');
		header = $(document.getElementById('body-header'));
		windowHash = window.location.hash;

		if (ticketAnchor.length > 0) {
			ticketAnchor.on('click', onTicketAnchorClick);
		}

		if (windowHash === "#tickets") {
			win.on('load', fromExternalPage);
		}
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
			$(target).stop(true, false).velocity('scroll', {
				duration:750,
				delay:500,
				offset: scrollOffset,
				easing: 'easeOutQuart'
			});			
		} else {
			$(target).stop(true, false).velocity('scroll', {
				duration:750,
				offset: scrollOffset,
				easing: 'easeOutQuart'
			});				
		}

		//stop  propagation & prevent default
		return false;
	}

	function fromExternalPage() {
		setTimeout(function() {
			ticketAnchor.trigger("click");
		}, 100);
	}

	$(onDocumentReady);

	ret = {

	};

	return ret;
})(jQuery);