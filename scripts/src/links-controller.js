linksController = (function($) {
	var win, doc, toggle, toggleIcon, touchEvent, links, ret = {};

	function onDocumentReady() {
		doc = $(document);
		win = $(window);
		toggle = $("A[href=#toggle-links]");
		toggleIcon = $('.links-toggle .icon');
		links = $('.top-links');

		if($("HTML").hasClass("touch")){
			touchEvent = "touchstart";
		}

		toggle.on('click', onClickLinksToggle);
		$(BreakpointController).on('crossBreakpoint', onCrossBreakpoint);

	}

	function onCrossBreakpoint() {
		links.attr('style', '');
	}

	function onClickLinksToggle() {

		if (links.is(':visible')) {
			closeLinks();
		} else {
			openLinks();
			navController.closeNav();
		}

		return false;
	}

	function closeLinks() {
		links.stop(true, false).velocity(
			'slideUp', {
				duration:300,
				complete: onLinksToggleComplete
			}, 'easeInQuart'
		);

		toggleIcon.removeClass("icon-close").addClass('icon-star');
		toggle.removeClass('active');
		toggle.removeClass('active');
	}

	function openLinks() {
		links.stop(true, false).velocity(
			'slideDown', {
				duration:300,
				complete: onLinksToggleComplete
			}, 'easeInQuart'
		);
		toggleIcon.removeClass('icon-star').addClass("icon-close");
		toggle.addClass('active');
		toggle.addClass('active');
	}

	function onLinksToggleComplete() {
		var body = $("BODY");
		if(links.is(":visible")){			
			watchLinksCloseEvents();
		}
		else
		{
			ignoreLinksCloseEvents();
		}
	}

	// Usually click works fine on iOS, but ONLY 
	// when the thing being "clicked/touched" is 
	// an A tag. In this case I'm watching the entire 
	// document, so I need to check for either click 
	// or touchstart. The touchEvent variable is "click"
	// by default, but if the touch class is on the HTML 
	// tag then it changes to "touchstart"
	function watchLinksCloseEvents(){
		doc.on("keydown", onKeyDown);
		doc.on(touchEvent, onDocumentClick);
	}

	function ignoreLinksCloseEvents(){
		doc.off("keydown", onKeyDown);
		doc.off(touchEvent, onDocumentClick);
	}

	function onKeyDown(e) {
		if (e.keyCode === 27) {
			closeLinks();
		}
	}

	function onDocumentClick(e) {
		var clicked = $(e.target);
		if(clicked.attr("href") === "#toggle-nav") {
			return true;
		}
		if(!links.find(clicked).length){
			closeLinks();
		}
	}

	ret = {
		closeLinks: closeLinks,
		openLinks: openLinks,
		isOpen: function() {
			return isOpen;
		}
	};
	
	$(onDocumentReady);
	
	return ret;
})(jQuery);