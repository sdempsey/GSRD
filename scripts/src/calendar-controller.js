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
		$('.fc-view-container').stop(true, false).velocity({
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
		calendarContent.stop(true, false).velocity({
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