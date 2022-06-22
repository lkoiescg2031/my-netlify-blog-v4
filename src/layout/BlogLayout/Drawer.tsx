import React from "react";

// import { makeStyles, Theme } from "@mui/material";

import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EmailIcon from "@mui/icons-material/Email";
import GithubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import { Consumer } from "./context";

// import Tags from "../../components/Tags";

export const drawerWidth = 280;

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

// const useStyles = makeStyles((theme: Theme) => ({
// 	drawer: {},
// 	drawerPaper: {
// 		width: drawerWidth,
// 		overflow: "overlay",
// 		"&::-webkit-scrollbar": {
// 			display: "none",
// 		},
// 	},
// 	transParentBackground: {
// 		backgroundColor: "#00000000",
// 	},
// 	toolbar: {
// 		...theme.mixins.toolbar,
// 		display: "flex",
// 		alignItems: "center",
// 		position: "relative",
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

interface DrawerProps {}

//FIXME change consumer to useContext
function Drawer(props: DrawerProps) {
	// const classes = useStyles();

	return (
		<Consumer>
			{({ isOpenDrawer, toggleDrawer, profile, categories, tags }) => (
				<nav>
					<SwipeableDrawer
						anchor="left"
						// className={classes.drawer}
						// classes={{
						// 	paper: classes.drawerPaper,
						// }}
						open={isOpenDrawer}
						onOpen={toggleDrawer}
						onClose={toggleDrawer}
					>
						<div
						// className={classes.toolbar}
						>
							<IconButton
								// className={classes.closeButton}
								onClick={toggleDrawer}
							>
								<ArrowBackIosIcon />
							</IconButton>
						</div>
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
										{typeof profile.figure === "undefined"
											? profile.name
											: null}
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
								{/* TODO 카테고리 노출 기능
                  {(function renderPosts(root, level = 0) {
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
								{/* TODO 테그 노출 기능
                <Button href="/Tags">Tags</Button>
								<Tags align="center" tags={tags} />
								<Divider /> */}
							</>
						)}
					</SwipeableDrawer>
				</nav>
			)}
		</Consumer>
	);
}

export default Drawer;
