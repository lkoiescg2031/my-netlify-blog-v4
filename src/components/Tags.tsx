import React from "react";

import clsx from "clsx";

import styled from "@mui/material/styles/styled";
import { useTheme } from "@mui/material";
import { ClassNames } from "@emotion/react";

import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

import LocalOfferIcon from "@mui/icons-material/LocalOffer";

// const useTagStyle = makeStyles((theme) => ({
// 	tagWrapper: {
// 		display: "flex",
// 		flexWrap: "wrap",
// 		"& > *": {
// 			margin: theme.spacing(0.5),
// 		},
// 	},
// 	tagLabel: {
// 	},
// 	alignRight: {
// 		justifyContent: "flex-end",
// 	},
// 	alignCenter:,
// }));

interface TagWrapperProps {
	align: "right" | "left" | "center";
	children: React.ReactNode;
}
const TagWrapper = styled(({ align, ...otherProps }: TagWrapperProps) => {
	const theme = useTheme();

	return (
		<ClassNames>
			{({ css, cx }) => (
				<div
					{...otherProps}
					className={cx(
						css({
							display: "flex",
							flexWrap: "wrap",
							"& > *": {
								margin: theme.spacing(0.5),
							},
						}),
						{
							[css({
								justifyContent: "flex-end",
							})]: align === "right",
						},
						{
							[css({
								justifyContent: "center",
							})]: align === "center",
						}
					)}
				/>
			)}
		</ClassNames>
	);
})({});

const TagInnerWrapper = styled((props: { children: React.ReactNode }) => {
	const theme = useTheme();

	return (
		<ClassNames>
			{({ css }) => (
				<div
					{...props}
					className={css({
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						"& > *": {
							margin: theme.spacing(0.2),
						},
					})}
				/>
			)}
		</ClassNames>
	);
})({});

interface TagsProps {
	readonly tags: ReadonlyArray<string | null>;
	align?: "right" | "left" | "center";
	outlined?: boolean;
	medium?: boolean;
}

const Tags: React.FC<TagsProps> = ({
	tags,
	align = "left",
	outlined = false,
	medium = false,
}) => {
	return (
		<TagWrapper align={align}>
			{tags.map((tag, idx) => (
				<Chip
					key={`tag-${idx}`}
					variant={outlined ? "outlined" : "filled"}
					size={medium ? "medium" : "small"}
					color="secondary"
					label={
						<TagInnerWrapper>
							<LocalOfferIcon fontSize="inherit" color="inherit" />
							<Typography variant="subtitle2">{tag}</Typography>
						</TagInnerWrapper>
					}
					clickable
					component="a"
					href={`/Tags/${tag}`}
				/>
			))}
		</TagWrapper>
	);
};

export default Tags;
