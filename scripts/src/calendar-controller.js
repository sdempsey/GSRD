calendarController = (function($) {
	var ret = {}, doc, options, calendar,
		prev, next, win, calendarToggle,
		calendarIcon, calendarContent,
		monthToggle, monthContent, eventTabs,
		tabs, venue, map, address, date,
		time, events, ticketsInfo, moreInfo,
		overlay, tabData, prevButton,
		nextButton;

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

			} else if ($(this).data("month") == currentMonth - 1) {
				
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
