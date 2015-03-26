navController = (function($) {
	var nav, toggle, win, 
		main, doc, body,
		touchEvent = "click", ret = {}, mainIsLocked = false,
		toggleIcon, menuUL, childlessTopLevel,
		childlessContainer;

	function onDocumentReady() {
		doc = $(document);
		win = $(window);
		main = $(document.getElementById("main"));
		nav = $(document.getElementById("main-navigation"));
		body = $("body");
		toggle = $(document.getElementById("nav-toggle"));
		toggleIcon = $(document.getElementById('nav-icon'));
		menuUl = $(document.getElementById("menu-main-nav"));
		childlessTopLevel = $(".menu-item-top-level").not(".menu-item-has-children");
		html = $("html");

		if(html.hasClass("touch")) {
			touchEvent = "touchstart";
		}

		menuUl.append("<ul class='childless-container menu-item-has-children' id='childless'/>");
		organizeNavItems();

		toggle.on("click", onClickNavToggle);
		$(BreakpointController).on('crossBreakpoint', onCrossBreakpoint);
	}

	// Since I'm using slideUp()/slideDown() to expand collapse
	// the menus, I need to remove the "display: none" and "display: block"
	// that gets added when switching between mobile and desktop views
	//
	// Otherwise, if I collapse a 1st tier menu on mobile and then resize
	// to desktop, the "display: none;" inline style makes that menu invisible
	function onCrossBreakpoint() {
		$("UL", nav).attr("style", "");
		$(".open", nav).removeClass("open");
	}

	function organizeNavItems() {
		var childlessContainer = $(document.getElementById("childless"));
		if (win.width() >= BreakpointController.MEDIUM) {
			childlessTopLevel.appendTo(childlessContainer);
		} else {
			childlessTopLevel.appendTo(menuUL);
		}
	}

	function onClickNavToggle() {
		
		if (nav.is(':visible')) {
			closeNav();
		} else {
			openNav();
			linksController.closeLinks();
		}

		return false;
	}

	function closeNav() {
		if (!nav.hasClass("velocity-animating")) {
			nav.velocity("slideUp", {duration: 400, easing: "easeInQuart", complete: function() {onNavToggleComplete();}});
			toggleIcon.removeClass("icon-close").addClass('icon-menu');
			toggleIcon.removeClass("active");
			toggle.removeClass('active');		
		}
	}

	function openNav() {
		if (!nav.hasClass("velocity-animating")) {
			nav.velocity("slideDown", {duration: 400, easing: "easeOutQuart", complete: function() {onNavToggleComplete();}});
			toggleIcon.removeClass("icon-menu").addClass('icon-close');
			toggleIcon.addClass("active");
			toggle.addClass('active');
		}
	}

	function onKeyDown(e) {
		if(e.keyCode === 27) {
			closeNav();
		}
	}

	function onDocumentClick(e) {
		var clicked = $(e.target);
		if(clicked.attr("href") === "#toggle-nav") {
			return true;
		}
		if(!nav.find(clicked).length) {
			closeNav();
		}
	}

	function onNavToggleComplete() {

		if(nav.is(":visible")) {			
			watchNavCloseEvents();
			if(win.width() <= BreakpointController.SMALL) {
				lockMain();	
			}
		}
		else
		{
			ignoreNavCloseEvents();
			if(win.width() <= BreakpointController.SMALL) {
				unlockMain();				
			}
		}
	}

	// Usually click works fine on iOS, but ONLY 
	// when the thing being "clicked/touched" is 
	// an A tag. In this case I'm watching the entire 
	// document, so I need to check for either click 
	// or touchstart. The touchEvent variable is "click"
	// by default, but if the touch class is on the HTML 
	// tag then it changes to "touchstart"
	function watchNavCloseEvents() {
		doc.on("keydown", onKeyDown);
		doc.on(touchEvent, onDocumentClick);
	}

	function ignoreNavCloseEvents() {
		doc.off("keydown", onKeyDown);
		doc.off(touchEvent, onDocumentClick);
	}

	function lockMain() {
		var yOffset = win.scrollTop() * -1;
			mainWidth = main.width();

		mainIsLocked = true;	

		main.css({
			"top": yOffset,
			"width": mainWidth
		});

		win.on("resize", onWindowResize);
		body.addClass("nav-open");
	}

	function unlockMain() {
		var yOffset = (parseInt(main.css("top"), 10) * -1);
		mainIsLocked = false;

		body.removeClass("nav-open");

		main.attr("style", "");
		win.scrollTop(yOffset);
		win.off("resize", onWindowResize);
	}

	function onWindowResize() {
		if(win.width() > BreakpointController.SMALL) {
			unlockMain();
		}
		else{
			main.css("width", win.width());			
		}
	}

	ret = {
		closeNav: closeNav,
		openNav: openNav
	};

	$(onDocumentReady);

	return ret;
})(jQuery);