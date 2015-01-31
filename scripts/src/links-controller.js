linksController = (function($) {
	var win, doc, toggle,
		toggleIcon, touchEvent ="click",
		links, ret = {}, mobileContainer,
		desktopContainer, mainNavigation, html;

	function onDocumentReady() {
		doc = $(document);
		win = $(window);
		html = $("html");
		toggle = $(document.getElementById('links-toggle'));
		toggleIcon = $(document.getElementById('links-icon'));
		links = $(document.getElementById('top-links'));
		topLink = $('.top-link'); //the actual link
		mobileContainer = $(document.getElementById('mobile-container'));
		desktopContainer = $(document.getElementById('desktop-container'));
		mainNavigation = $(document.getElementById('main-navigation'));

		if(html.hasClass("touch")){
			touchEvent = "touchstart";
		}

		toggle.on('click', onClickLinksToggle);
		$(BreakpointController).on('crossBreakpoint', onCrossBreakpoint);
		moveTopLinks();
	}

	function onCrossBreakpoint() {
		links.attr('style', '');
		moveTopLinks();
	}

	function moveTopLinks() {
		if (win.width() >= BreakpointController.SMALL) {
			topLink.appendTo(desktopContainer);
		} else {
			topLink.appendTo(mobileContainer);
		}
	}

	function onClickLinksToggle() {

		if (links.is(':visible')) {
			closeLinks();
			return false;
		}
		
		openLinks();
		if (mainNavigation.is(':visible')) {
			navController.closeNav();
		}
	}

	function closeLinks() {
		if (!links.hasClass('velocity-animating')) {
			links.velocity(
				'slideUp', {
					duration:500,
					complete: function() {
						onLinksToggleComplete();
					}
				}, 'easeInQuart'
			);

			toggleIcon.removeClass("icon-close").addClass('icon-star');
			toggle.removeClass('active');
		}
	}

	function openLinks() {
		if (!links.hasClass('velocity-animating')) {
			links.velocity(
				'slideDown', {
					duration:500,
					complete: function() {
						onLinksToggleComplete();
					}
				}, 'easeInQuart'
			);
			toggleIcon.removeClass('icon-star').addClass("icon-close");
			toggle.addClass('active');
		}
	}

	function onLinksToggleComplete() {
		
		if (links.is(":visible")){			
			watchLinksCloseEvents();
		} else {
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
		var clicked = $(e.currentTarget);
		if(clicked.attr("href") === "#toggle-links") {
			return true;
		}
		if(!links.find(clicked).length){
			closeLinks();
		}
	}

	ret = {
		closeLinks: closeLinks,
		openLinks: openLinks
	};
	
	$(onDocumentReady);
	
	return ret;
})(jQuery);