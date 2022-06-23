import React, { useContext } from "react";

import styled from "@mui/material/styles/styled";

import SwipeableDrawer, {
	SwipeableDrawerProps,
} from "@mui/material/SwipeableDrawer";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EmailIcon from "@mui/icons-material/Email";
import GithubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import BlogLayoutContext from "./BlogLayoutContext";
import { ClassNames } from "@emotion/react";
import { Toolbar } from "@mui/material";

// import PostsButton from "./PostsButton";
// import Tags from "../../components/Tags";

export const drawerWidth = 280;

// const useStyles = makeStyles((theme: Theme) => ({
// 	drawer: {},
// 	drawerPaper: {
// 	},
// 	transParentBackground: {
// 		backgroundColor: "#00000000",
// 	},
// 	toolbar: {
// 	},
// 	closeButton: {
// 		position: "absolute",
// 		right: "3px",
// 	},
// 	profileRoot: {
// 		display: "flex",
// 		flexFlow: "column nowrap",
// 		alignItems: "center",
// 		paddingTop: theme.spacing(2),
// 		paddingBottom: theme.spacing(2),
// 	},
// 	avatar: {
// 		width: theme.spacing(12),
// 		height: theme.spacing(12),

// 		border: `4px solid ${theme.palette.primary.dark}`,
// 		backgroundColor: "#fff",

// 		color: theme.palette.primary.dark,
// 		fontSize: theme.spacing(6),
// 	},
// 	contactWrapper: {
// 		display: "flex",
// 		marginTop: theme.spacing(1),
// 	},
// 	contactIcon: {
// 		width: theme.spacing(4),
// 		height: theme.spacing(4),
// 	},
// 	postsTreeRoot: {
// 		height: 240,
// 		flexGrow: 1,
// 		maxWidth: 400,
// 	},
// }));

const StyledSwipeableDrawer = styled((props: SwipeableDrawerProps) => (
	<ClassNames>
		{({ css, cx }) => (
			<SwipeableDrawer
				{...props}
				className={props.className}
				classes={{
					paper: css`
						width: ${drawerWidth}px;
						overflow: "overlay;
					`,
				}}
			/>
		)}
	</ClassNames>
))``;

// 		...theme.mixins.toolbar,
const StyledToolbar = styled((props: { children: React.ReactElement }) => (
	<div {...props} />
))(({ theme }) => ({
	...theme.mixins.toolbar,
	display: "flex",
	alignItems: "center",
	position: "relative",
}));
const BlogLayoutDrawer: React.FC = () => {
	const { isOpenDrawer, toggleDrawer, profile, categories, tags } =
		useContext(BlogLayoutContext);

	return (
		<nav>
			<StyledSwipeableDrawer
				anchor="left"
				open={isOpenDrawer}
				onOpen={toggleDrawer}
				onClose={toggleDrawer}
			>
				<StyledToolbar>
					<IconButton
						// className={classes.closeButton}
						onClick={toggleDrawer}
					>
						<ArrowBackIosIcon />
					</IconButton>
				</StyledToolbar>
				<Divider />
				{profile && (
					<>
						<div
						// className={classes.profileRoot}
						>
							<Avatar
								alt={profile.name}
								src={profile.figure}
								// className={classes.avatar}
							>
								{typeof profile.figure === "undefined" ? profile.name : null}
							</Avatar>
							<Typography variant="h6" color="inherit">
								{profile.name}
							</Typography>
							<Typography variant="body2" color="inherit">
								{profile.desc}
							</Typography>
							<div
							// className={classes.contactWrapper}
							>
								{profile.email && (
									<IconButton
										// className={classes.contactIcon}
										href={`mailto:${profile.email}`}
									>
										<EmailIcon />
									</IconButton>
								)}
								{profile.github && (
									<IconButton
										// className={classes.contactIcon}
										href={profile.github}
									>
										<GithubIcon />
									</IconButton>
								)}
								{profile.facebook && (
									<IconButton
										// className={classes.contactIcon}
										href={profile.facebook}
									>
										<FacebookIcon />
									</IconButton>
								)}
								{profile.twitter && (
									<IconButton
										// className={classes.contactIcon}
										href={profile.twitter}
									>
										<TwitterIcon />
									</IconButton>
								)}
								{profile.instagram && (
									<IconButton
										// className={classes.contactIcon}
										href={profile.instagram}
									>
										<InstagramIcon />
									</IconButton>
								)}
								{profile.linkedIn && (
									<IconButton
										// className={classes.contactIcon}
										href={profile.linkedIn}
									>
										<LinkedInIcon />
									</IconButton>
								)}
							</div>
						</div>
						<Divider />
						{/* TODO 카테고리 노출 기능 */}
						{/* {(function renderPosts(root, level = 0) {
								return (
									<React.Fragment key={root.url}>
										<PostsButton
											name={root.name}
											info={root.postsCnt}
											url={root.url}
											level={level}
										/>
										{Array.isArray(root.children)
											? root.children.map((child: object | undefined) =>
													renderPosts(child, level + 1)
												)
											: null}
									</React.Fragment>
									);
						})(categories)}
						<Divider /> */}
						{/* TODO 테그 노출 기능 */}
						{/* <Button href="/Tags">Tags</Button>
						<Tags align="center" tags={tags} />
						<Divider /> */}
					</>
				)}
			</StyledSwipeableDrawer>
		</nav>
	);
};

export default BlogLayoutDrawer;
