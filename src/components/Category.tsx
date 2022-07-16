import React from "react";

import styled from "@mui/material/styles/styled";
import { useTheme } from "@mui/material";
import { ClassNames } from "@emotion/react";

import Paper, { PaperProps } from "@mui/material/Paper";
import Chip from "@mui/material/Chip";

import KeyboardArrowRightSharpIcon from "@mui/icons-material/KeyboardArrowRightSharp";

interface CategoryProps {
	pathes: string[];
	medium?: boolean;
}

const CategoryPaper = styled((props: PaperProps) => {
	const theme = useTheme();

	return (
		<ClassNames>
			{({ css }) => (
				<Paper
					{...props}
					classes={{
						root: css({
							width: "max-content",
							padding: theme.spacing(1),
							marginBottom: theme.spacing(3),
							display: "flex",
							alignItems: "center",
							flexWrap: "wrap",
						}),
					}}
				/>
			)}
		</ClassNames>
	);
})({});

const Category: React.FC<CategoryProps> = ({
	pathes,
	medium = false,
}: CategoryProps) => {
	const [first, ...others] = pathes || [];

	let pathPrefix = "";
	const getPathes = (url: string) => {
		const currentPath = `${pathPrefix}/${url}`;
		pathPrefix = currentPath;
		return currentPath;
	};

	return (
		<CategoryPaper elevation={4}>
			<Chip
				key="category-0"
				color="secondary"
				size={medium ? "medium" : "small"}
				label={first}
				clickable
				component="a"
				href={getPathes(first)}
			/>
			{others.map((other, idx) => (
				<React.Fragment key={`category-${idx + 1}`}>
					<KeyboardArrowRightSharpIcon fontSize="small" />
					<Chip
						color="secondary"
						size={medium ? "medium" : "small"}
						label={other}
						clickable
						component="a"
						href={getPathes(other)}
					/>
				</React.Fragment>
			))}
		</CategoryPaper>
	);
};

export default Category;
