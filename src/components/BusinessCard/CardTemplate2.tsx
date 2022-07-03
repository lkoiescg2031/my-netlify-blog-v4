import React, { useContext } from "react";
import styled from "@emotion/styled";

import BusinessCardContext from "./BusinessCardContext";

import ProfileIcon from "./ProfileIcon";
import Inline from "./Inline";

import businessCardTheme from "./CardTheme";
import color from "../../styles/color";

const BusinessCardDiv = styled.div({
	...businessCardTheme.card,
	display: "flex",
	flexFlow: "row wrap",
	justifyContent: "center",
	alignItems: "center",
	"@media screen and (max-width:  500px)": {
		flexFlow: "column wrap",
	},
	position: "relative",
});

const BusinessCardInnerDiv = styled.div({
	display: "flex",
	flexFlow: "column",
	justifyContent: "center",
	alignItems: "center",
	"@media screen and (max-width: 500px)": {
		width: "100%",
		textAlign: "center",
	},
	":first-child": {
		width: "184px",
		paddingRight: "15px",
		borderRight: `1px solid ${color.secondaryColor}`,
		"@media screen and (max-width : 500px)": {
			padding: 0,
			border: 0,
			paddingBottom: "15px",
			borderBottom: `1px solid ${color.secondaryColor}`,
		},
	},
	":nth-child(2)": {
		width: "285px",
		paddingLeft: "15px",
		"@media screen and (max-width: 500px)": {
			padding: 0,
			border: 0,
			paddingTop: "15px",
		},
	},
});

const BusinessCardFigureImg = styled.img({
	width: "110px",
	height: "110px",
	margin: "0px auto 15px auto",
	backgroundColor: color.secondaryColor,
	borderRadius: "100%",
});

const BusinessCardNameH3 = styled.h3({
	margin: 0,
});

const BusinessCardPositionH5 = styled.h5({
	margin: 0,
});

const BusinessCardHomeButton = styled.button({
	border: 0,
	backgroundColor: "#00000000",
	color: color.secondaryColor,

	cursor: "pointer",
	outline: 0,

	position: "absolute",
	right: 0,
	bottom: 0,

	// FIXME add @emotion library ani
	// ...businessCardTheme.bouncingHorizonAni,
});

interface CardTemplate2Props {
	name: string;
	figure: string;
	position: string;
	email: string;
	blog: string;
	github: string;
	facebook: string;
	twitter: string;
	instagram: string;
	linkedIn: string;
	hasNextButton?: boolean;
	homeButtonCallback?: () => void;
}

const CardTemplate2: React.FC<CardTemplate2Props> = ({
	name,
	figure,
	position,
	email,
	blog,
	github,
	//sns
	facebook,
	twitter,
	instagram,
	linkedIn,
	//options
	hasNextButton = false,
	homeButtonCallback = null,
}) => {
	const { setCard, currentCardIdx } = useContext(BusinessCardContext);
	const homeButtonCallbackWrapper = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();

		if (homeButtonCallback) {
			homeButtonCallback();
		} else {
			setCard(currentCardIdx + 1);
		}
	};

	const sns = { blog, email, github, facebook, twitter, instagram, linkedIn };

	return (
		<BusinessCardDiv>
			<BusinessCardInnerDiv>
				<BusinessCardFigureImg src={figure} alt="figure" />
				<div>
					<BusinessCardNameH3>{name}</BusinessCardNameH3>
					<BusinessCardPositionH5>{position}</BusinessCardPositionH5>
				</div>
			</BusinessCardInnerDiv>
			<BusinessCardInnerDiv>
				<Inline>
					{Object.entries(sns).map(([key, value], idx) => {
						if (value === null || value.toString().length === 0) {
							return null;
						}
						return (
							<ProfileIcon key={`profile_${idx + 1}`} type={key} url={value} />
						);
					})}
				</Inline>
			</BusinessCardInnerDiv>
			{hasNextButton && (
				<BusinessCardHomeButton onClick={homeButtonCallbackWrapper}>
					<i className="xi-caret-down-square-o xi-rotate-270 xi-2x" />
				</BusinessCardHomeButton>
			)}
		</BusinessCardDiv>
	);
};

export default CardTemplate2;
