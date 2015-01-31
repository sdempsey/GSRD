BreakpointController = (function($){
	var ret = {},
		SMALL = 600,
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