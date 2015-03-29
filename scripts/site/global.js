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
		clicked.next(eventContent).velocity('slideDown', {duration: 300, easing: "easeOutQuart"});

		//also, close its sibling accordions
		if (sibling.hasClass('open')) {
			sibling.removeClass('open');
			sibling.next(eventContent).velocity('slideUp', {duration:300, easing: "easeInQuart"});
		}
	}

	function accordionOpen() {
		clicked.addClass('open').parent().addClass('active');
		clicked.next(content).velocity('slideDown', {duration: 300, easing: "easeOutQuart"});

		//also, close its sibling accordions
		if (sibling.hasClass('open')) {
			sibling.removeClass('open');
			sibling.next(content).velocity('slideUp', {duration:300, easing: "easeInQuart"});
		}
	}

	function accordionClose() {
		clicked.removeClass('open').parent().removeClass('active');
		clicked.next(content).velocity('slideUp', {duration: 300, easing: "easeInQuart"});
	}
	function eventClose() {
		clicked.removeClass('open').parent().removeClass('active');
		clicked.next(eventContent).velocity('slideUp', {duration: 300, easing: "easeInQuart"});
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

		if (tabs.length > 0) {
			tabsInit(onTabsInitComplete);
		}

	}

	function onMonthToggleClick(e) {
		clicked = $(e.currentTarget);

		if(monthContent.is(':visible')) {
			closeMonth();
		} else {
			openMonth();
			
		}

		return false;
	}

	function onCalendarToggleClick(e) {
		clicked = $(e.currentTarget);
		calendarContent = $('.fc-view-container');
		monthToggle = $('.month-toggle');

		if (calendarContent.is(":visible")) {

			if (monthContent.is(':visible')) {
				closeMonth();

				setTimeout(function() {
					closeCalendar();
				}, 300);
			} else {
				closeCalendar();
			}

		} else {

			openCalendar();
		}

		return false;
	}

	function closeCalendar() {
		$('.calendar-toggle .icon').removeClass('icon-close').addClass('icon-calendar');
		
		calendarContent.stop(true, false).velocity({
			height: 0
		}, {
			complete: function() {calendarContent.hide();}
		}, 300, "easeInQuart");

		monthToggle.stop(true, false).velocity({
			width: 0,
			opacity: 0
		}, 600, 'easeInQuart');

		if (monthContent.is(':visible')) {
			closeMonth();
			$('.month-toggle').removeClass('open');
		}


	}

	function openCalendar() {

		$('.calendar-toggle .icon').addClass('icon-close').removeClass('icon-calendar');
		
		calendarContent.show().stop(true, false).velocity({
			height: 241
		}, 300, "easeOutQuart");

		monthToggle.stop(true, false).velocity({
			width: [37, 0],
			opacity: [1,0]
		},600, 'easeOutQuart');
	}

	function closeMonth() {
		monthContent.stop(true, false).velocity('slideUp', {duration: 300}, 'easeInQuart');
		monthToggle.stop(true, false).velocity({
			rotateX: [0, 180]
		}, 300, "easeOutQuart");
	}

	function openMonth() {
		monthContent.stop(true, false).velocity('slideDown', {duration: 300}, 'easeInQuart');
		monthToggle.stop(true, false).velocity({
			rotateX: [180, 0]
		}, 300, "easeInQuart");
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

flyoutController = (function($) {
	var ret ={}, toggles, boutOpen,
	twitterOpen, boutContent, twitterContent,
	feeds, win,
	boutTabWidth, twitterTabWidth,
	boutContentWidth, twitterContentWidth,
	boutClose, twitterClose;

	function onDocumentReady() {
		win = $(window);
		toggles = $("#toggle-feeds");
		boutOpen = $("#bout-tab");
		boutClose = $("#close-bout");
		twitterOpen = $("#twitter-tab");
		twitterClose = $("#close-twitter");
		boutContent = $("#bout-feed");
		twitterContent = $("#twitter-feed");
		feeds = $("#feeds");

		if (toggles.length > 0) {
			win.on("load", feedsInit);
			win.on("resize", onWindowResize);
		}
	}

	function onWindowResize() {
		resizeFeedsContainer();
	}

	function resizeFeedsContainer() {
		var feedHeight = toggles.height();
		
		feeds.height(feedHeight);		
	}

	function feedsInit() {
		//cache element widths for animation
		boutCloseWidth = boutClose.width();
		boutTabWidth = boutOpen.width();
		twitterCloseWidth = twitterClose.width();
		twitterTabWidth = twitterOpen.width();
		twitterContentWidth = twitterContent.width();
		boutContentWidth = boutContent.width();

		resizeFeedsContainer();

		//add event listeners
		boutOpen.on("click", openBoutFeed);
		boutClose.on("click", closeBoutFeed);
		twitterOpen.on("click", openTwitterFeed);
		twitterClose.on("click", closeTwitterFeed);		

	}

	function onBoutOpenClick() {
		openBoutFeed();
	}

	function onBoutCloseClick() {
		closeBoutFeed();
	}

	function openBoutFeed() {
		boutOpen.velocity("stop")
		.velocity({right: [- boutTabWidth, 0]}, 200, "easeInQuart");

		boutContent.velocity("stop")
		.velocity({right: [0, - boutContentWidth]}, {delay: 200, duration: 400, easing: "easeOutQuart", 
			complete: function() {
				boutClose.velocity("stop")
				.velocity({left: [-boutCloseWidth, 0], zIndex: [0, -1]}, 300, "easeOutQuart");
			}
		});
		
		//preventDefault & stopPropagation		
		return false;
	}

	function closeBoutFeed() {
		boutClose.velocity("stop")
		.velocity({left: [0, -boutCloseWidth], zIndex: [-1, 0]}, 200, "easeInQuart");

		boutContent.velocity("stop")
		.velocity({right: [- boutContentWidth, 0]}, {delay: 200, duration: 400, easing: "easeInQuart", 
			complete: function() {
				boutOpen.velocity("stop")
				.velocity({right: [0, - boutTabWidth]}, 400, "easeOutQuart");
			}
		});

		//preventDefault & stopPropagation
		return false;		
	}

	function onTwitterOpenClick() {
		openTwitterFeed();
	}

	function onTwitterCloseClick() {
		closeTwitterFeed();
	}

	function openTwitterFeed() {
		twitterOpen.velocity("stop")
		.velocity({right: [- twitterTabWidth, 0]}, 200, "easeInQuart");

		twitterContent.velocity("stop")
		.velocity({right: [0, - twitterContentWidth]}, {delay: 200, duration: 400, easing: "easeOutQuart", 
			complete: function() {
				twitterClose.velocity("stop")
				.velocity({left: [-twitterCloseWidth, 0]}, 200, "easeOutQuart");
			}
		});
		
		//preventDefault & stopPropagation
		return false;
	}

	function closeTwitterFeed() {
		twitterClose.velocity("stop")
		.velocity({left: [0, -twitterCloseWidth]}, 200, "easeInQuart");

		twitterContent.velocity("stop")
		.velocity({right: [- twitterContentWidth, 0]}, {duration: 400, easing: "easeInQuart", 
			complete: function() {
				twitterOpen.velocity("stop")
				.velocity({right: [0, - twitterTabWidth]}, 400, "easeOutQuart");
			}
		});
		
		//preventDefault & stopPropagation
		return false;
	}	

	$(onDocumentReady);

	ret = {};

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
			links.velocity("slideUp", {duration: 400, easing: "easeInQuart", complete: function() {onLinksToggleComplete();}});
			toggleIcon.removeClass("icon-close").addClass('icon-star');
			toggle.removeClass('active');
		}
	}

	function openLinks() {
		if (!links.hasClass('velocity-animating')) {
			links.velocity("slideDown", {duration: 400, easing: "easeOutQuart", complete: function() {onLinksToggleComplete();}});
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
sliderController = (function($) {
	var ret = {}, win, doc, images, bouts;

	function onDocumentReady() {
		win = $(window);
		doc = $(document);
		images = $(document.getElementById('masthead-images'));
		bouts = $(document.getElementById("feed-events"));
		
		if ($().bxSlider && images.length > 0) {
			init();
		}

	}

	function init() {
		if (images.length > 0) {
			homeMastHeadSlider();
		}

		if (bouts.length > 0) {
			homeBoutSlider();
		}
	}

	function homeBoutSlider() {
		options = {
			mode: 'fade',
			speed: 600,
			pause: 4000,
			easing: 'easeInOutQuart',
			controls: false,
			pager: false			
		};

		bouts.bxSlider(options);
	}

	function homeMastHeadSlider() {
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

twitterController = (function($) {
	var container, win;

	function onDocumentReady() {
		win = $(window);
		container = $(document.getElementById("feed-container"));

		if (container.length > 0) {
			win.on("load", widgetInit);
		}
	}

	function widgetInit() {
		twttr.widgets.createTimeline(
			'581942955570819073',
			document.getElementById('feed-container'),
			{
				width: '100%',
				height: '320',
				related: 'twitterdev,twitterapi',
				chrome: 'noheader nofooter noborders transparent noscrollbars',
				showReplies: false,
				tweetLimit: 2
			}).then(function (el) {
				//silence is golden
			});		
		}

		$(onDocumentReady);
	})(jQuery);
