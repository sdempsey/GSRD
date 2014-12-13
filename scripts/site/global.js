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
BreakpointController = (function($){
	var ret = {},
		IPHONE_PORTRAIT = 320,
		IPHONE_LANDSCAPE = 480,
		SIX_FORTY = 640,
		IPAD_PORTRAIT = 768,
		IPAD_LANDSCAPE = 1024,
		TWELVE_EIGHTY = 1280,
		FOURTEEN_HUNDRED = 1400,
		win,
		currentBreakpoint,
		breakpoints = [
			{ label: "iphone-portrait", width: IPHONE_PORTRAIT },
			{ label: "iphone-landscape", width: IPHONE_LANDSCAPE },
			{ label: "six-forty", width: SIX_FORTY },
			{ label: "ipad-portrait", width: IPAD_PORTRAIT },
			{ label: "ipad-landscape", width: IPAD_LANDSCAPE },
			{ label: "twelve-eighty", width: TWELVE_EIGHTY },
			{ label: "fourteen-hundred", width: FOURTEEN_HUNDRED } 
		];

	function onDocumentReady(){
		win = $(window);
		win.on('resize', checkWindow);
		checkWindow();
	}

	function checkWindow(){
		var w = win.width(),
			ret;

		for(var i=0; i<breakpoints.length; i++)
		{
			breakpoint = breakpoints[i];
			if(w >= breakpoint.width)
			{
				ret = breakpoint.label;
			}
			else
			{
				break;
			}
		}

		setBreakpoint(ret);
	}

	function setBreakpoint(breakpoint){
		if(breakpoint !== currentBreakpoint)
		{
			currentBreakpoint = breakpoint;
			$(BreakpointController).trigger('crossBreakpoint');
		}
		else
		{
			currentBreakpoint = breakpoint;
		}
	}

	ret = {
		getBreakpoint: function(){
			return currentBreakpoint;
		},
		IPHONE_PORTRAIT: IPHONE_PORTRAIT,
		IPHONE_LANDSCAPE: IPHONE_LANDSCAPE,
		SIX_FORTY: SIX_FORTY,
		IPAD_PORTRAIT: IPAD_PORTRAIT,
		IPAD_LANDSCAPE: IPAD_LANDSCAPE,
		TWELVE_EIGHTY: TWELVE_EIGHTY,
		FOURTEEN_HUNDRED: FOURTEEN_HUNDRED
	};

	$(onDocumentReady);

	return ret;
})(jQuery);
calendarController = (function($) {
	var ret = {}, doc, options, calendar,
		prev, next, win, calendarToggle,
		calendarIcon, calendarContent,
		monthToggle, monthContent;

	function onDocumentReady() {
		calendar = $('.event-calendar');
		doc = $(document);
		win = $(window);
		calendarIcon = $('.calendar-toggle .icon');
		monthContent = $('.month-overlay');


		initializeCalendar();

		$(".calendar-toggle").on('click', onCalendarToggleClick);
		$('.month-toggle').on('click', onMonthToggleClick);


	}

	function initializeCalendar() {
		options = {
			theme: true,
			header: {
			    left: 'prev',
			    center: 'title',
			    right: 'next'
			  },
			themeButtonIcons: {
				prev: ' icon icon-month-prev',
				next: ' icon icon-month-next'
			},
			editable: 'false',
			titleFormat: 'MMM',
			dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
			columnFormat: 'ddd'
		};
		
		calendar.fullCalendar(options);
		$('.fc-center').append("<a href='#toggle-month' class='month-toggle'><i class='icon icon-accordion-toggle'></i></a><a href='#toggle-calendar' class='calendar-toggle'><i class='icon icon-calendar'></i></a>");
		$('.fc-view-container').velocity({
			rotateX: -90,
			translateZ: -50		
			
		}, {
			complete: function(elements) {$(this).addClass('hidden');}
		}, 100);


	}

	function onMonthToggleClick(e) {
		clicked = $(e.currentTarget);

		if(monthContent.is(':visible')) {
			closeMonth();
			clicked.removeClass('open');
		} else {
			openMonth();
			clicked.addClass('open');
		}

		return false;
	}

	function onCalendarToggleClick(e) {
		clicked = $(e.currentTarget);
		calendarContent = $('.fc-view-container');
		monthToggle = $('.month-toggle');

		if (calendarContent.hasClass('hidden')) {

			openCalendar();

		} else {

			closeCalendar();

		}

		return false;
	}

	function closeCalendar() {
		$('.calendar-toggle .icon').removeClass('icon-close').addClass('icon-calendar');
		calendarContent.velocity({
			rotateX: -90,
			translateZ: -50		
			
		}, {
			complete: function(elements) {calendarContent.addClass('hidden');}
		}, 1000, 'easeInQuart');
		monthToggle.velocity({
			width: 0,
			opacity: 0
		},1000, 'easeInQuart');

		if (monthContent.is(':visible')) {
			closeMonth();
			$('.month-toggle').removeClass('open');
		}


	}

	function openCalendar() {

		$('.calendar-toggle .icon').addClass('icon-close').removeClass('icon-calendar');
		calendarContent.velocity({
			rotateX: ['0deg', '-90deg'],
			translateZ: ['0px', '-50px']
		}, {
			begin: function(elements) {calendarContent.removeClass('hidden');}
		}, 1000, 'easeOutQuart');
		monthToggle.velocity({
			width: [37, 0],
			opacity: [1,0]
		},1000, 'easeOutQuart');
	}

	function closeMonth() {
		monthContent.velocity('slideUp', {duration: 600}, 'easeInQuart');
	}

	function openMonth() {
		monthContent.velocity('slideDown', {duration: 600}, 'easeInQuart');
	}

	$(onDocumentReady);

	ret = {

	};

	return ret;
})(jQuery);
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
				duration:600,
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
				duration:600,
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
navController = (function($) {
	var nav, toggle, win, main, doc, body, touchEvent = "click", ret = {}, mainIsLocked = false, toggleIcon;

	function onDocumentReady() {
		doc = $(document);
		win = $(window);
		main = $(".main");
		nav = $("nav");
		body = $("body");

		toggle = $("A[href=#toggle-nav]");
		toggleIcon = $('.nav-toggle .icon');

		if($("HTML").hasClass("touch")) {
			touchEvent = "touchstart";
		}

		nav.find("A:not(.toggle-children)").each(function() {
			if(this.href === window.location.href) {
				$(this).addClass("selected");
			}
		});
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
		nav.stop(true, false).velocity(
			'slideUp', {
				duration:600,
				complete: onNavToggleComplete
			}, 'easeInQuart'
		);
		toggleIcon.removeClass("icon-close").addClass('icon-menu');
		toggleIcon.removeClass("active");
		toggle.removeClass('active');
	}

	function openNav() {
		nav.stop(true, false).velocity(
			'slideDown', {
				duration:600,
				complete: onNavToggleComplete
			}, 'easeInQuart'
		);
		toggleIcon.removeClass("icon-menu").addClass('icon-close');
		toggleIcon.addClass("active");
		toggle.addClass('active');
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
			if(win.width() <= BreakpointController.IPHONE_LANDSCAPE) {
				lockMain();	
			}
		}
		else
		{
			ignoreNavCloseEvents();
			if(win.width() <= BreakpointController.IPHONE_LANDSCAPE) {
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
		if(win.width() > BreakpointController.IPHONE_LANDSCAPE) {
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
sliderController = (function($) {
	var ret = {}, win, doc, images, slides;

	function onDocumentReady() {
		win = $(window);
		doc = $(document);
		images = $('.masthead .images');
		slides = $('.masthead .slide');
		
		init();

	}

	function init() {
		options = {
			mode: 'fade',
			speed: 600,
			pause: 6000,
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