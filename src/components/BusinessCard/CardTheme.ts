/** @jsx jsx */
import { jsx, keyframes } from "@emotion/react";

const bouncingVericalKeyframe = keyframes`
	from {
		transform: translate(0px, 0px);
	}

	to {
		transform: translate(0px, 5px);
	};
`;
const bouncingHorizonKeyframe = keyframes`
	from {
		transform: translate(0px, 0px);
	}

	to {
		transform: translate(5px, 0px);
	}
`;

const businessCardTheme = {
	card: {
		height: "100%",
	},

	bouncingVericalAni: {
		animationName: bouncingVericalKeyframe,
		animationDuration: "480ms",
		animationDirection: "alternate",
		animationIterationCount: "infinite",
		":hover": {
			animation: "none",
		},
	},

	bouncingHorizonAni: {
		animationName: bouncingHorizonKeyframe,
		animationDuration: "480ms",
		animationDirection: "alternate",
		animationIterationCount: "infinite",
		":hover": {
			animation: "none",
		},
	},
};

export default businessCardTheme;
