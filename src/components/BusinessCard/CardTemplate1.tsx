import React, { useContext } from "react";

import styled from "@emotion/styled";

import BusinessCardContext from "./BusinessCardContext";

import businessCardTheme from "./CardTheme";
import color from "../../styles/color";

// const CardTemplate1Styles = StyleSheet.create({
// 	card: {
// 		display: "flex",
// 		flexDirection: "column",
// 		justifyContent: "center",
// 		alignItems: "center",
// 	},
// 	title: {
// 		margin: 0,
// 	},
// 	btnParent: {
// 		position: "relative",
// 	},
// 	btn: {
// 		border: 0,
// 		backgroundColor: "#00000000",
// 		color: color.secondaryColor,

// 		cursor: "pointer",

// 		position: "absolute",
// 		bottom: "0px",
// 		":focus": {
// 			outline: 0,
// 		},
// 	},
// });

const BusinessCardDiv = styled.div({
	...businessCardTheme.card,
	//card
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	//btnParent
	position: "relative",
});

const BusinessCardTitle = styled.h1({
	margin: 0,
});

const BusinessCardButton = styled.button({
	border: 0,
	backgroundColor: "#00000000",
	color: color.secondaryColor,

	cursor: "pointer",

	position: "absolute",
	bottom: "0px",

	":focus": {
		outline: 0,
	},

	// FIXME @emotion 라이브러리용 에니매이션 전환
	// ...businessCardTheme.bouncingVericalAni,
});

interface CardTemplate1Props {
	title: string;
	subTitle: string;
	hasNextButton?: boolean;
	nextButtonCallback?: React.MouseEventHandler<HTMLButtonElement>;
}

const CardTemplate1: React.FC<CardTemplate1Props> = ({
	title,
	subTitle,
	hasNextButton = false,
	nextButtonCallback,
}) => {
	const { currentCardIdx, setCard } = useContext(BusinessCardContext);

	const handlerWrapper = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		// FIXME refactoring nextButtonCallback 파라메터 필요한 분긴지 확인
		// FIXME setCard 호출 확인
		if (nextButtonCallback) {
			nextButtonCallback(event);
		} else {
			setCard(currentCardIdx + 1);
		}
	};

	return (
		<BusinessCardDiv>
			<BusinessCardTitle>{title}</BusinessCardTitle>
			<h4>{subTitle}</h4>
			{hasNextButton && (
				<BusinessCardButton onClick={handlerWrapper}>
					<i className={`xi-caret-down-square-o xi-2x`} />
				</BusinessCardButton>
			)}
		</BusinessCardDiv>
	);
};
export default CardTemplate1;
