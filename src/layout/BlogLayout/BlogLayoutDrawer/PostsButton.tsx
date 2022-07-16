import React from "react";

import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";

import styled from "@mui/material/styles/styled";

const StyledRootButton = styled(Button)(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0.5, 0.5),
	textAlign: "left",
	textTransform: "none",
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
	fontWeight: "inherit",
	flexGrow: 1,
}));

interface PostsButtonProps {
	name: string;
	level: number;
	info: number;
	url: string;
}

const PostsButton: React.FC<PostsButtonProps> = ({
	name,
	info,
	level,
	url,
}) => {
	return (
		<StyledRootButton href={url}>
			<StyledTypography variant="body1">
				{`${level > 0 ? "└".padEnd(level, "─") : ""}\t${name}`}
			</StyledTypography>
			<Chip size="small" variant="outlined" label={info} />
		</StyledRootButton>
	);
};

export default PostsButton;
