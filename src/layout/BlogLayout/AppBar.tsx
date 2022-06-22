import React from "react";

import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Hidden from "@mui/material/Hidden";
import Button from "@mui/material/Button";

// import { makeStyles, Theme } from "@mui/material/styles";

import MenuIcon from "@mui/icons-material/Menu";

import ScrollEffect from "./ScrollEffect";
import { Consumer } from "./context";

interface BlogLayoutAppBarProps {}

// const useStyles = makeStyles((theme: Theme) => ({
// 	appbar: {
// 		borderBottom: `1px solid ${theme.palette.primary.dark}`,
// 		zIndex: theme.zIndex.drawer + 1,
// 	},
// 	menuButton: {
// 		padding: theme.spacing(2),
// 	},
// 	title: {
// 		flexGrow: 1,
// 		marginLeft: theme.spacing(1),
// 		marginRight: theme.spacing(1),
// 	},
// }));

const AppBar: React.FC<BlogLayoutAppBarProps> = (props) => {
	// FIXME makeStyle 함수 오류 수정
	// const classes = useStyles();

	return (
		<ScrollEffect {...props}>
			<MuiAppBar
				position="fixed"
				// className={classes.appbar}
			>
				<Consumer>
					{({ title, toggleDrawer }) => (
						<Toolbar>
							<IconButton
								color="inherit"
								edge="start"
								aria-label="open drawer"
								// className={classes.menuButton}
								onClick={toggleDrawer}
							>
								<MenuIcon />
							</IconButton>
							<Typography
								variant="h4"
								noWrap
								// className={classes.title}
							>
								{title}
							</Typography>
							<Hidden xsDown implementation="css">
								<Button color="inherit" size="large" href="/Posts">
									posts
								</Button>
								{/* 
									FIXME update project
								<Button
                  color="inherit"
                  size="large"
                  onClick={onClicker('/projects')}
                >
                  projects
                </Button> */}
							</Hidden>
							{/* 
								FIXME update aboutme
							<Hidden implementation="css" smDown>
                <Button
                  color="inherit"
                  size="large"
                  onClick={onClicker('/challenges')}
                >
                  challenges
                </Button>
                <Button
                  color="inherit"
                  size="large"
                  onClick={onClicker('/aboutme')}
                >
                  aboutMe
                </Button>
              </Hidden> */}
						</Toolbar>
					)}
				</Consumer>
			</MuiAppBar>
		</ScrollEffect>
	);
};

export default AppBar;
