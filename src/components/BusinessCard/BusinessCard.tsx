import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";

import { BusinessCardProvider } from "./BusinessCardContext";

import color from "../../styles/color";

interface BusinessCardProps {
	children: React.ReactElement[];
}

const StyledBusinessCardDiv = styled.div({
	width: "500px",
	height: "300px",
	padding: "15px",
	backgroundColor: color.primaryColor,
	borderRadius: "15px",
	boxShadow: "3px 3px 3px 2px gray",
	color: color.secondaryColor,
	"@media screen and (max-width: 500px)": {
		width: "100vw",
		height: "100vh",
		borderRadius: "0px",
	},
});

const BusinessCard: React.FC<BusinessCardProps> = ({ children }) => {
	const businessCardRef = useRef<HTMLDivElement>(null);
	const [currentCardIdx, setCurrentCardIdx] = useState(0);

	const hideBusinessCardAnimation = () => {
		if (businessCardRef.current === null) {
			return;
		}

		const animation = businessCardRef.current.animate(
			[
				{ transform: "rotate3D(0.5, 0.5, 0, 0deg)" },
				{ transform: "rotate3D(0.5, 0.5, 0, 90deg)" },
			],
			450
		).finished;

		return animation;
	};

	const showBusinessCardAnimation = () => {
		if (businessCardRef.current === null) {
			return;
		}

		const animation = businessCardRef.current.animate(
			[
				{ transform: "rotate3D(0.5, 0.5, 0, 90deg)" },
				{ transform: "rotate3D(0.5, 0.5, 0, 0deg)" },
			],
			220
		).finished;

		return animation;
	};

	const changeTo = async (number: number) => {
		//번호 미입력시 보정
		if (typeof number === "undefined") {
			const lastNumber = children.length;
			const currentIdx = currentCardIdx;
			number = (currentIdx + 1) % lastNumber;
		}

		await hideBusinessCardAnimation();

		setCurrentCardIdx(number);

		await showBusinessCardAnimation();
	};

	return (
		<BusinessCardProvider value={{ currentCardIdx, setCard: changeTo }}>
			<StyledBusinessCardDiv ref={businessCardRef}>
				{children[currentCardIdx]}
			</StyledBusinessCardDiv>
		</BusinessCardProvider>
	);
};

export default BusinessCard;
