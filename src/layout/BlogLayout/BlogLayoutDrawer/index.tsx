import React, { useContext } from "react";

import styled from "@mui/material/styles/styled";
import { ClassNames } from "@emotion/react";

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

import BlogLayoutContext from "../BlogLayoutContext";

// import PostsButton from "./PostsButton";
// import Tags from "../../components/Tags";

export const drawerWidth = 280;

// const useStyles = makeStyles((theme: Theme) => ({
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
						overflow: overlay;
					`,
				}}
			/>
		)}
	</ClassNames>
))`
	z-index: 1300;
`;

const StyledToolbar = styled((props: { children: JSX.Element }) => (
	<div {...props} />
))(({ theme }) => ({
	...theme.mixins.toolbar,
	display: "flex",
	alignItems: "center",
	position: "relative",
}));

const StyledCloseIconButton = styled(IconButton)(({ theme }) => ({
	position: "absolute",
	right: "3px",
}));

const StyledProfileRoot = styled(
	(props: { children: React.ReactElement[] }) => <div {...props} />
)(({ theme }) => ({
	display: "flex",
	flexFlow: "column nowrap",
	alignItems: "center",
	paddingTop: theme.spacing(2),
	paddingBottom: theme.spacing(2),
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
	width: theme.spacing(12),
	height: theme.spacing(12),

	border: `4px solid ${theme.palette.primary.dark}`,
	backgroundColor: "#fff",

	color: theme.palette.primary.dark,
	fontSize: theme.spacing(6),
}));

const StyledContactWrapper = styled(
	(props: { children: ("" | undefined | React.ReactElement)[] }) => (
		<div {...props} />
	)
)(({ theme }) => ({
	display: "flex",
	marginTop: theme.spacing(1),
}));

const StyledSNSIconButton = styled(
	(props: { href: string; children: React.ReactElement }) => (
		<IconButton {...props} />
	)
)(({ theme }) => ({
	width: theme.spacing(4),
	height: theme.spacing(4),
}));

const StyledDescTypography = styled(Typography)(({ theme }) => ({
	margin: theme.spacing(1),
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
					<StyledCloseIconButton onClick={toggleDrawer}>
						<ArrowBackIosIcon />
					</StyledCloseIconButton>
				</StyledToolbar>
				<Divider />
				{profile && (
					<>
						<StyledProfileRoot>
							<StyledAvatar alt={profile.name} src={profile.figure}>
								{typeof profile.figure === "undefined" ? profile.name : null}
							</StyledAvatar>
							<Typography variant="h6" color="inherit">
								{profile.name}
							</Typography>
							<StyledDescTypography variant="body2" color="inherit">
								{profile.desc}
							</StyledDescTypography>
							<StyledContactWrapper>
								{profile.email && (
									<StyledSNSIconButton href={`mailto:${profile.email}`}>
										<EmailIcon />
									</StyledSNSIconButton>
								)}
								{profile.github && (
									<StyledSNSIconButton href={profile.github}>
										<GithubIcon />
									</StyledSNSIconButton>
								)}
								{profile.facebook && (
									<StyledSNSIconButton href={profile.facebook}>
										<FacebookIcon />
									</StyledSNSIconButton>
								)}
								{profile.twitter && (
									<StyledSNSIconButton href={profile.twitter}>
										<TwitterIcon />
									</StyledSNSIconButton>
								)}
								{profile.instagram && (
									<StyledSNSIconButton href={profile.instagram}>
										<InstagramIcon />
									</StyledSNSIconButton>
								)}
								{profile.linkedIn && (
									<StyledSNSIconButton href={profile.linkedIn}>
										<LinkedInIcon />
									</StyledSNSIconButton>
								)}
							</StyledContactWrapper>
						</StyledProfileRoot>
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
