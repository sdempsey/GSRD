var accordionController,
	BreakpointController,
	calendarController,
	flyoutController,
	linksController,
	navController,
	sliderController,
	ticketController,
	twitterController;

accordionController = (function($) {
	var ret = {}, title, titleIcon, content, contentOpen,
		eventTitle, eventContent, win,
		tickets, accordion, eventAccordion,
		clicked, sibling;

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
			$('.event-title').first().trigger('click');
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
		breakpoint,
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
		win, calendarIcon, calendarContent,
		monthToggle, monthContent, eventTabs,
		tabs, venue, map, address, date,
		time, events, ticketsInfo, moreInfo,
		overlay, tabData, prevButton,
		nextButton, clicked;

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
 		overlay = $(document.getElementById("event-overlay"));


		if (calendar.length > 0) {
			initializeCalendar();
		}


		$(".calendar-toggle, .fc-center h2").on('click', onCalendarToggleClick);
		$(document.getElementById('month-toggle')).on('click', onMonthToggleClick);
		$(document.getElementById('month-overlay')).find('a[role=month]').on('click', onMonthClick);



	}

	function initializeCalendar() {
		var monthFormatOptions = ["MMM", "MMMM"],
			monthFormat,
			heightOptions = [259, 365],
			calendarHeight;

		if (win.width() >= BreakpointController.MEDIUM) {
			
			monthFormat = monthFormatOptions[1];
			calendarHeight = heightOptions[1];

		} else {

			monthFormat = monthFormatOptions[0];
			calendarHeight = heightOptions[0];
		}

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
			titleFormat: monthFormat,
			dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
			columnFormat: 'ddd',
			handleWindowResize: false,
			events: [
				{
					title: 'event1',
					start: moment('May 16, 2015', "MMM DD YYYY"),
					rendering: 'background'
				}
			],
			eventRender: function (event, element, view) { 

				var dateString = moment(event.start).format('YYYY-MM-DD');

				view.el
					.find('.fc-day-number[data-date="' + dateString + '"]')
					.addClass('fc-has-event');

			}
		};

		calendar.fullCalendar(options);
		$('.fc-center').append("<a href='#toggle-month' class='month-toggle' id='month-toggle'><i id='month-toggle-icon' class='icon icon-month-toggle'></i></a><a href='#toggle-calendar' class='calendar-toggle' id='calender-toggle'><i class='icon icon-calendar'></i></a>");

		if (tabs.length > 0) {
			tabsInit(updateEventDisplay);
		}

		onCalendarInitialized();
		updateMonthSelect();
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

	function onNextClick() {
		formatCalendar();
		updateMonthSelect();
		
		
	}

	function onPrevClick() {
		formatCalendar();
		updateMonthSelect();
		
	}

	function closeCalendar() {
		$('.calendar-toggle .icon')
			.removeClass('icon-feed-close')
			.addClass('icon-calendar');
		
		calendarContent
			.velocity("stop")
			.velocity("fadeOut", {duration: 300, easing: "easeInQuart"});

		monthToggle
			.velocity("stop")
			.velocity({width: 0, opacity: 0}, 600, 'easeInQuart');

		if (monthContent.is(':visible')) {
			closeMonth();
			$('.month-toggle').removeClass('open');
		}
		overlay
			.velocity("stop")
			.velocity("fadeOut", {duration: 300, easing: "easeInQuart"});


	}

	function openCalendar() {

		$('.calendar-toggle .icon')
			.addClass('icon-feed-close')
			.removeClass('icon-calendar');
		
		calendarContent
			.velocity("stop")
			.velocity("fadeIn", {duration: 300,	easing: "easeOutQuart"});

		monthToggle
			.velocity("stop")
			.velocity({width: [37, 0], opacity: [1,0]},600, 'easeOutQuart');

		overlay
			.velocity("stop")
			.velocity("fadeIn", {duration: 300,	easing: "easeOutQuart"});
	}

	function closeMonth() {
		monthContent
			.velocity("stop")
			.velocity('slideUp', {duration: 300}, 'easeInQuart');

		monthToggle
			.velocity("stop")
			.velocity({rotateX: [0, 180]}, 300, "easeOutQuart");
	}

	function openMonth() {
		monthContent
			.velocity("stop")
			.velocity('slideDown', {duration: 300}, 'easeInQuart');
		
		monthToggle
			.velocity("stop")
			.velocity({rotateX: [180, 0]}, 300, "easeInQuart");
	}

	function onMonthClick(e) {
		var clicked = $(e.currentTarget),
			month = clicked.attr('data-month'),
			m = moment([moment().year(), month, 1]);

			clicked
				.addClass('active')
				.siblings().removeClass('active');

			calendar.fullCalendar('gotoDate', m);

			setTimeout(onCalendarInitialized, 10);

			return false;
	}

	function tabsInit(complete) {
		events = eventTabs.find('.event');

		var y = 0,
			z = 0;

		events.first().addClass('active');
		tabs.first().addClass('active');

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

		tabs.on('mouseenter', onTabMouseEnter);
		tabs.on('mouseleave', onTabMouseLeave);
	}

	function updateEventDisplay() {
		var activeEvent = eventTabs.find('.active');
			tabData = activeEvent.find('.data-details');

		venue.html(tabData.data('venue'));
		address.html(tabData.data('address'));
		date.html(tabData.data('formatted-date'));
		time.html(tabData.data('time'));
		map.attr('href', tabData.data('map'));
		ticketsInfo.attr('href', tabData.data('tickets'));
		moreInfo.attr('href', tabData.data('tickets'));

	}


	function onTabMouseEnter(e) {
		var entered = $(e.currentTarget);

		if (entered === tabs.first()) {
			return false;
		}

		console.log('entered ' + entered);
	}

	function onTabMouseLeave(e) {
		var left = $(e.currentTarget);

		if (left === tabs.first()) {
			return false;
		}

		console.log('left ' + left);
	}


	function onCalendarInitialized() {
		nextButton = $(".fc-next-button");
		prevButton = $(".fc-prev-button");

		nextButton
			.prepend('<span class="calendar-text">Next Game</span>')
			.on("click", onNextClick);
		prevButton
			.append('<span class="calendar-text">Previous Game</span>')
			.on("click", onPrevClick);
		formatCalendar();
	}

	function formatCalendar() {
		var innerNumbers = $('.fc-day-number'),
			dayHeaders = $('.fc-day-header'),
			weekRow = document.querySelectorAll(".fc-week");

		innerNumbers.each(function() {
			wrapInnards($(this));
		});
		dayHeaders.each(function() {
			wrapInnards($(this));
		});

		for (var i = 0; i < weekRow.length; i++) {
			weekRow[i].removeAttribute('style');
		}		
	}

	function wrapInnards(el) {
		el.wrapInner('<span class="inner" />');
	}

	function updateMonthSelect() {
		var currentMonth = calendar.fullCalendar('getDate').format("M"),
			monthContainer = $(document.getElementById("month-overlay")),
			monthElement = monthContainer.find("a");
		
		monthElement.each(function() {
			
			if (currentMonth === 0) {

				monthElement.data("month", 0).addClass("active");

			} else if ($(this).data("month") === currentMonth - 1) {
				
				$(this).addClass("active");

			} else {

				$(this).removeClass("active");
			}
		});			
	}

	$(onDocumentReady);

	ret = {

	};

	return ret;
})(jQuery);

var contentController;

contentController = (function($) {
	var ret = {}, win, doc,
		wftda, bruiseLetter,
		footerNav, tweetScreenName, tweetText,
		tweet;

		function onDocumentReady() {
			win = $(window);
			doc = $(document);
			wftda = $('.wftda');
			bruiseLetter = $('.bruise-letter');
			footerNav = $('.footer-nav');
			tweet = $('.tweet');
			tweetScreenName = $('.tweet_screen_name');
			tweetText = $('.tweet_text');

			bindEventListeners();
		}


		function bindEventListeners() {
			$(BreakpointController).on('crossBreakpoint', onCrossBreakpoint);
			win.on('load', onWindowLoad);
		}

		function onCrossBreakpoint() {
			if (win.width() >= BreakpointController.LARGE) {
				bruiseLetterHeight();
			} else {
				bruiseLetter.attr('style', null);
			}
		}

		function bruiseLetterHeight() {
			var wftdaHeight = wftda.outerHeight(),
				footerNavHeight = footerNav.outerHeight();

			bruiseLetter.height(wftdaHeight + footerNavHeight);
		}

		function onWindowLoad() {
			//stuff that doesn't need to happen right away:

			if (win.width() >= BreakpointController.MEDIUM && tweet.length > 0) {
				formatTweets();
			}	

			if (win.width() >= BreakpointController.LARGE) {
				bruiseLetterHeight();
			}		
		}

		function formatTweets() {
			var wrappedElements = $('.tweet_profile_img ~ *'),
				reply = $('.tweet_intent_reply'),
				retweet = $('.tweet_intent_retweet'),
				favorite = $('.tweet_intent_favourite');

			tweet.each(function() {
				$(this).find(tweetScreenName).prependTo($(this).find(tweetText));
				$(this).find(wrappedElements).wrapAll('<div class="tweet_container" />');
				$(this).find(reply).html('<i class="icon icon-tweet-reply"></i>');
				$(this).find(retweet).html('<i class="icon icon-retweet"></i>');
				$(this).find(favorite).html('<i class="icon icon-tweet-favorite"></i>');
			});


		}

		$(onDocumentReady);

		ret = {};

		return ret;
})(jQuery);
flyoutController = (function($) {
	var ret ={}, toggles, boutOpen,
	twitterOpen, boutContent, twitterContent,
	feeds, win,
	boutTabWidth, twitterTabWidth,
	boutContentWidth, twitterContentWidth,
	boutClose, twitterClose, boutCloseWidth,
	twitterCloseWidth;

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

	function openBoutFeed() {
		boutOpen.velocity("stop")
		.velocity({translateX: [boutTabWidth, 0]}, "fast", "easeInQuart");

		boutContent.velocity("stop")
		.velocity({translateX: [0, boutContentWidth + 7]}, {delay: 200, duration: "fast", easing: "easeOutQuart", 
			complete: function() {
				boutClose.velocity("stop")
				.velocity({translateX: [-boutCloseWidth, 0], zIndex: [0, -1]}, "fast", "easeOutQuart");
			}
		});
		
		//preventDefault & stopPropagation		
		return false;
	}

	function closeBoutFeed() {
		boutClose.velocity("stop")
		.velocity({translateX: [0, -boutCloseWidth], zIndex: [-1, 0]}, "fast", "easeInQuart");

		boutContent.velocity("stop")
		.velocity({translateX: [boutContentWidth + 7, 0]}, {delay: 200, duration: "fast", easing: "easeInQuart", 
			complete: function() {
				boutOpen.velocity("stop")
				.velocity({translateX: [0, boutTabWidth]}, "fast", "easeOutQuart");
			}
		});

		//preventDefault & stopPropagation
		return false;		
	}

	function openTwitterFeed() {
		twitterOpen.velocity("stop")
		.velocity({translateX: [twitterTabWidth, 0]}, "fast", "easeInQuart");

		twitterContent.velocity("stop")
		.velocity({translateX: [0, twitterContentWidth]}, {delay: 200, duration: "fast", easing: "easeOutQuart", 
			complete: function() {
				twitterClose.velocity("stop")
				.velocity({translateX: [-twitterCloseWidth, 0]}, "fast", "easeOutQuart");
			}
		});
		
		//preventDefault & stopPropagation
		return false;
	}

	function closeTwitterFeed() {
		twitterClose.velocity("stop")
		.velocity({translateX: [0, -twitterCloseWidth]}, "fast", "easeInQuart");

		twitterContent.velocity("stop")
		.velocity({translateX: [twitterContentWidth, 0]}, {delay: 200, duration: "fast", easing: "easeInQuart", 
			complete: function() {
				twitterOpen.velocity("stop")
				.velocity({translateX: [0, twitterTabWidth]}, "fast", "easeOutQuart");
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
		desktopContainer, mainNavigation, html,
		topLink;
		
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
		toggleIcon, menuUl, childlessTopLevel,
		html;

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
			childlessTopLevel.appendTo(menuUl);
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
			nav.velocity("slideUp", {duration: "fast", easing: "easeInQuart", complete: function() {onNavToggleComplete();}});
			
			toggleIcon.removeClass("icon-close").addClass('icon-menu')
			.removeClass("active");
			toggle.removeClass('active');		
		}
	}

	function openNav() {
		if (!nav.hasClass("velocity-animating")) {
			nav.velocity("slideDown", {duration: "fast", easing: "easeOutQuart", complete: function() {onNavToggleComplete();}});
			
			toggleIcon.removeClass("icon-menu").addClass('icon-close')
			.addClass("active");

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
		var yOffset = win.scrollTop() * -1,
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

		var options = {
			mode: 'fade',
			speed: 600,
			pause: 4000,
			easing: 'easeInOutQuart',
			pager: false,
			nextSelector: '#feed-next',
			prevSelector: '#feed-prev',
			nextText: '&#xF111;',
  			prevText: '&#xF112;'
		};

		bouts.bxSlider(options);
	}

	function homeMastHeadSlider() {
		var options = {
			mode: 'fade',
			speed: 600,
			pause: 4000,
			easing: 'easeInOutQuart',
			controls: false,
			pager: false,
			auto: true,
			preloadImages: 'visible'
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

// twitterController = (function($) {
// 	var container, win;

// 	function onDocumentReady() {
// 		win = $(window);
// 		container = $(document.getElementById("feed-container"));

// 		if (container.length > 0) {
// 			win.on("load", widgetInit);
// 		}
// 	}

// 	function widgetInit() {
// 		twttr.widgets.createTimeline(
// 			'581942955570819073',
// 			document.getElementById('feed-container'),
// 			{
// 				width: '100%',
// 				related: 'twitterdev,twitterapi',
// 				chrome: 'noheader nofooter noborders transparent noscrollbars',
// 				showReplies: false,
// 				tweetLimit: 2
// 			}).then(function () {
// 				//silence is golden
// 			});		
// 	}

// 	$(onDocumentReady);
// })(jQuery);
