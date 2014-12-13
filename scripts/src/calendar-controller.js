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