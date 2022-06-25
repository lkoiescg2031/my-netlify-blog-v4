import React from "react";

import useScrollTrigger from "@mui/material/useScrollTrigger";

interface ElevationScrollProps {
	children: React.ReactElement;
	window?: () => Window;
}

const ElevationScroll: React.FC<ElevationScrollProps> = (props) => {
	const { children, window } = props;
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
		target: window ? window() : undefined,
	});

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0,
	});
};

export default ElevationScroll;