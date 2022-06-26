import styled from "@emotion/styled";
import React, { MouseEvent, useRef } from "react";

const MOVEING_RATE = 0.3;

interface MouseEffectLayoutProps {
	children: React.ReactNode;
}

const StyledMouseLayoutDiv = styled.div({
	width: "100%",
	height: "100%",
	backgroundColor: "#FAEBEF",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
});

const MouseEffectLayout: React.FC<MouseEffectLayoutProps> = ({ children }) => {
	const layoutRef = useRef<HTMLDivElement>(null);
	const moverRef = useRef<HTMLDivElement>(null);

	const movingEffect = (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();

		if (layoutRef.current === null || moverRef.current === null) {
			return;
		}

		const { offsetWidth, offsetHeight } = layoutRef.current;
		const { clientX, clientY } = event;
		const target = moverRef.current;

		// 모바일에서 작동하지 않음
		if (offsetWidth <= 500) {
			target.style.transform = `translate(0px, 0px)`;
			return;
		}

		const moveX = (clientX - offsetWidth / 2) * MOVEING_RATE;
		const moveY = (clientY - offsetHeight / 2) * MOVEING_RATE;

		target.style.transform = `translate(${moveX}px, ${moveY}px)`;
	};

	return (
		<StyledMouseLayoutDiv
			ref={layoutRef}
			role="presentation"
			onMouseMove={movingEffect}
		>
			<div ref={moverRef}>{children}</div>
		</StyledMouseLayoutDiv>
	);
};

export default MouseEffectLayout;
