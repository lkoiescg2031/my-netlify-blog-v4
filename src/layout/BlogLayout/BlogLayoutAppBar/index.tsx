import React, { useContext } from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Hidden from "@mui/material/Hidden";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

import MenuIcon from "@mui/icons-material/Menu";

import ScrollEffect from "./ScrollEffect";
import BlogLayoutContext from "../BlogLayoutContext";

interface BlogLayoutAppBarProps {}

const StyledAppBar = styled(AppBar)(({ theme }) => ({
	borderBottom: `1px solid ${theme.palette.primary.dark}`,
	zIndex: theme.zIndex.drawer + 1,
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
	padding: theme.spacing(2),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
	flexGrow: 1,
	marginLeft: theme.spacing(1),
	marginRight: theme.spacing(1),
}));

const BlogLayoutAppbar: React.FC<BlogLayoutAppBarProps> = (props) => {
	const { title, toggleDrawer } = useContext(BlogLayoutContext);

	return (
		<ScrollEffect {...props}>
			<StyledAppBar position="fixed">
				<Toolbar>
					<StyledIconButton
						color="inherit"
						edge="start"
						aria-label="open drawer"
						onClick={toggleDrawer}
					>
						<MenuIcon />
					</StyledIconButton>
					<StyledTypography variant="h4" noWrap>
						{title}
					</StyledTypography>
					<Hidden xsDown implementation="css">
						<Button color="inherit" size="large" href="/Posts">
							posts
						</Button>
						{/* TODO 프로젝트 페이지 생성 */}
						{/* <Button
							color="inherit"
							size="large"
							onClick={onClicker('/projects')}
						>
							projects
						</Button> */}
					</Hidden>
					{/* TODO 첼린지 생성 */}
					{/* <Hidden implementation="css" smDown>
						<Button
							color="inherit"
							size="large"
							onClick={onClicker('/challenges')}
						>
							challenges
					</Button>*/}
					{/* TODO update 이력서 페이지 생성 */}
					{/*	<Button
							color="inherit"
							size="large"
							onClick={onClicker('/aboutme')}
						>
							aboutMe
						</Button>
					</Hidden> */}
				</Toolbar>
			</StyledAppBar>
		</ScrollEffect>
	);
};

export default BlogLayoutAppbar;
