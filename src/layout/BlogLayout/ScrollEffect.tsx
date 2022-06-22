import React from "react";
import PropTypes from "prop-types";

import useScrollTrigger from "@mui/material/useScrollTrigger";

interface ElevationScrollProps {
	children: JSX.Element;
}
// 스크롤 이벤트 핸들용
const ElevationScroll: React.FC<ElevationScrollProps> = (props) => {
	const { children } = props;

	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
	});

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0,
	});
};

export default ElevationScroll;
