import Typography from "@mui/material/Typography";

import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import React from "react";

// const usePostsButtonStyle = makeStyles((theme: Theme) => ({
// 	root: {
// 		display: "flex",
// 		alignItems: "center",
// 		padding: theme.spacing(0.5, 0.5),
// 		textAlign: "left",
// 		textTransform: "none",
// 	},
// 	text: {
// 		fontWeight: "inherit",
// 		flexGrow: 1,
// 	},
// 	info: {
// 		marginLeft: "auto",
// 	},
// }));

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
	// FIXME makeStyle 호환성 점검
	// const classes = usePostsButtonStyle();

	return (
		<Button
			// classes={{ root: classes.root }}
			href={url}
		>
			<Typography
				// className={classes.text}
				variant="body1"
			>
				{`${level > 0 ? "└".padEnd(level, "─") : ""}\t${name}`}
			</Typography>
			<Chip size="small" variant="outlined" label={info} />
		</Button>
	);
};

export default PostsButton;
