import React, { useContext } from "react";

import styled from "@mui/material/styles/styled";
import { ClassNames } from "@emotion/react";

import SwipeableDrawer, {
	SwipeableDrawerProps,
} from "@mui/material/SwipeableDrawer";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

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

import BlogLayoutContext from "../BlogLayoutContext";

import CategoryTree from "./CategoryTree";

import AllTags from "./AllTags";

export const drawerWidth = 280;

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
))(({ theme }) => ({
	zIndex: theme.zIndex.modal,
}));

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
	const { isOpenDrawer, toggleDrawer, profile } = useContext(BlogLayoutContext);

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
							<StyledDescTypography
								variant="body2"
								color="inherit"
								dangerouslySetInnerHTML={{ __html: profile.desc || "" }}
							/>
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
						<CategoryTree />
						<Divider />
						<Button href="/Tags">Tags</Button>
						<AllTags />
						<Divider />
					</>
				)}
			</StyledSwipeableDrawer>
		</nav>
	);
};

export default BlogLayoutDrawer;
