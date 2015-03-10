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

BreakpointController = (function($){
	var ret = {},
		SMALL = 500,
		MEDIUM = 768,
		LARGE = 1024,
		TWELVE_EIGHTY = 1280,
		FOURTEEN_HUNDRED = 1400,
		SIXTEEN_HUNDRED = 1600,
		win,
		currentBreakpoint,
		breakpoints = [
			{ label: "small", width: SMALL },
			{ label: "medium", width: MEDIUM },
			{ label: "large", width: LARGE },
			{ label: "twelve-eighty", width: TWELVE_EIGHTY },
			{ label: "fourteen-hundred", width: FOURTEEN_HUNDRED },
			{ label: "sixteen-hundred", width: SIXTEEN_HUNDRED }
		];

	function onDocumentReady(){
		win = $(window);
		win.on('resize', checkWindow);
		checkWindow();
	}

	function checkWindow(){
		var w = win.width(),
			ret;

		for(var i=0; i<breakpoints.length; i++)	{
			breakpoint = breakpoints[i];
			if(w >= breakpoint.width) {
				ret = breakpoint.label;
			} else {
				break;
			}
		}

		setBreakpoint(ret);
	}

	function setBreakpoint(breakpoint){
		if(breakpoint !== currentBreakpoint) {
			currentBreakpoint = breakpoint;
			$(BreakpointController).trigger('crossBreakpoint');
		} else {
			currentBreakpoint = breakpoint;
		}
	}

	ret = {
		getBreakpoint: function(){
			return currentBreakpoint;
		},
		SMALL: SMALL,
		MEDIUM: MEDIUM,
		LARGE: LARGE,
		TWELVE_EIGHTY: TWELVE_EIGHTY,
		FOURTEEN_HUNDRED: FOURTEEN_HUNDRED,
		SIXTEEN_HUNDRED: SIXTEEN_HUNDRED
	};

	$(onDocumentReady);

	return ret;
})(jQuery);
calendarController = (function($) {
	var ret = {}, doc, options, calendar,
		prev, next, win, calendarToggle,
		calendarIcon, calendarContent,
		monthToggle, monthContent, eventTabs,
		tabs, venue, map, address, date,
		time, events, ticketsInfo, moreInfo;

	function onDocumentReady() {
		calendar = $(document.getElementById('event-calendar'));
		doc = $(document);
		win = $(window);
		calendarIcon = $(document.getElementById('calendar-toggle')).find('.icon');
		monthContent = $(document.getElementById('month-overlay'));
		eventTabs = $(document.getElementById('event-tabs'));
		tabs = eventTabs.find('.tab');
		venue = $(document.getElementById('venue'));
		map = $(document.getElementById('map'));
		address = $(document.getElementById('address'));
		date = $(document.getElementById('date'));
 		time = $(document.getElementById('time'));
 		ticketsInfo = $(document.getElementById('tickets-info'));
 		moreInfo = $(document.getElementById('more-info'));


		if (calendar.length > 0) {
			initializeCalendar();
		}


		$(".calendar-toggle, .fc-center h2").on('click', onCalendarToggleClick);
		$(document.getElementById('month-toggle')).on('click', onMonthToggleClick);
		$(document.getElementById('month-overlay')).find('a[role=month]').on('click', onMonthClick);



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
		$('.fc-center').append("<a href='#toggle-month' class='month-toggle' id='month-toggle'><i id='month-toggle-icon' class='icon icon-accordion-toggle'></i></a><a href='#toggle-calendar' class='calendar-toggle' id='calender-toggle'><i class='icon icon-calendar'></i></a>");
		$('.fc-view-container').hide().stop(true, false).velocity({
			rotateX: -90,
			translateZ: -50

		}, {
			complete: function(elements) {$(this).addClass('hidden');}
		}, 100);

		if (tabs.length > 0) {
			tabsInit(onTabsInitComplete);
		}

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

			if (monthContent.is(':visible')) {
				closeMonth();

				setTimeout(function() {
					closeCalendar();
				}, 600);
			} else {
				closeCalendar();
			}
		}

		return false;
	}

	function closeCalendar() {
		$('.calendar-toggle .icon').removeClass('icon-close').addClass('icon-calendar');
		calendarContent.stop(true, false).velocity({
			rotateX: -90,
			translateZ: -50

		}, {
			complete: function(elements) {calendarContent.addClass('hidden');}
		}, 1000, 'easeInQuart');
		monthToggle.stop(true, false).velocity({
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
		calendarContent.show().stop(true, false).velocity({
			rotateX: ['0deg', '-90deg'],
			translateZ: ['0px', '-50px']
		}, {
			begin: function(elements) {calendarContent.removeClass('hidden');}
		}, 1000, 'easeOutQuart');
		monthToggle.stop(true, false).velocity({
			width: [37, 0],
			opacity: [1,0]
		},1000, 'easeOutQuart');
	}

	function closeMonth() {
		monthContent.stop(true, false).velocity('slideUp', {duration: 600}, 'easeInQuart');
	}

	function openMonth() {
		monthContent.stop(true, false).velocity('slideDown', {duration: 600}, 'easeInQuart');
	}

	function onMonthClick(e) {
		var clicked = $(e.currentTarget),
			month = clicked.attr('data-month'),
			m = moment([moment().year(), month, 1]);
			clicked.addClass('active');
			clicked.siblings().removeClass('active');
			calendar.fullCalendar('gotoDate', m);

			return false;
	}

	function tabsInit(complete) {
		events = eventTabs.find('.event');

		var y = 0,
			z = 0;

		events.first().addClass('active');

		tabs.each(function() {
			$(this).css({
				'transform': 'translate3d(0px, ' + y + 'px, ' + z + 'px)'
			});
			y -= 16;
			z -= 25;
		});

		if (complete) {
			complete();
		}
	}

	function onTabsInitComplete() {
		var activeEvent = eventTabs.find('.active'),
			tabData = activeEvent.find('.data-details');

			venue.html(tabData.data('venue'));
			address.html(tabData.data('address'));
			date.html(tabData.data('date'));
			time.html(tabData.data('time'));
			map.attr('href', tabData.data('map'));
			ticketsInfo.attr('href', tabData.data('tickets'));
			moreInfo.attr('href', tabData.data('tickets'));

	}

	$(onDocumentReady);

	ret = {

	};

	return ret;
})(jQuery);

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

		return false;
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
navController = (function($) {
	var nav, toggle, win, 
		main, doc, body,
		touchEvent = "click", ret = {}, mainIsLocked = false,
		toggleIcon;

	function onDocumentReady() {
		doc = $(document);
		win = $(window);
		main = $(document.getElementById("main"));
		nav = $(document.getElementById("main-navigation"));
		body = $("body");
		toggle = $(document.getElementById("nav-toggle"));
		toggleIcon = $(document.getElementById('nav-icon'));
		html = $("html");

		if(html.hasClass("touch")) {
			touchEvent = "touchstart";
		}

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
		if (!nav.hasClass('velocity-animating')) {
			nav.velocity(
				'slideUp', {
					duration:500,
					complete:function() {
					 onNavToggleComplete();
					}
				}, 'easeInQuart'
			);
			toggleIcon.removeClass("icon-close").addClass('icon-menu');
			toggleIcon.removeClass("active");
			toggle.removeClass('active');
		}
	}

	function openNav() {
		if (!nav.hasClass('velocity-animating')) {
			nav.velocity(
				'slideDown', {
					duration:500,
					complete: function() {
						onNavToggleComplete();
					}
				}, 'easeInQuart'
			);
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

		ticketAnchor.on('click', onTicketAnchorClick);
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

	$(onDocumentReady);

	ret = {

	};

	return ret;
})(jQuery);
