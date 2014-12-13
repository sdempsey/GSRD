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