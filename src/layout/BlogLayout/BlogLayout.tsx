import React, { MouseEvent } from "react";
import PropTypes from "prop-types";

import ThemeProvider from "@mui/material/styles/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";
// import { withStyles } from "@mui/material";
import globalTheme from "../../styles/theme";

import WaveBackgroundAni from "../../components/WaveAniBackground";

import { Provider } from "./context";
import AppBar from "./AppBar";
import Drawer from "./Drawer";

interface BlogLayoutProps {
	title: string;
	profile: object;
	categories?: object;
	tags?: [string];
	children?: JSX.Element;
	classes: { root: any; content: any; toolbar: any };
}
interface BlogLayoutState {
	isOpenDrawer: boolean;
}

// FIXME add state interface
// FIXME change to func components
class BlogLayout extends React.PureComponent<BlogLayoutProps, BlogLayoutState> {
	static propTypes = {
		title: PropTypes.string.isRequired,
		profile: PropTypes.object.isRequired,
		// categories: PropTypes.object.isRequired,
		// tags: PropTypes.arrayOf(PropTypes.string).isRequired,
	};

	static defaultProps = {
		title: "",
		profile: {},
		categories: {},
	};

	private backgroundRef: React.RefObject<WaveBackgroundAni>;

	constructor(props: BlogLayoutProps) {
		super(props);

		this.state = { isOpenDrawer: false };
		this.backgroundRef = React.createRef();

		this.onScroll = this.onScroll.bind(this);
		this.toggleDrawer = this.toggleDrawer.bind(this);
	}

	toggleDrawer(event: MouseEvent<HTMLButtonElement>): void {
		event.preventDefault();
		this.setState((prevState) => ({
			...prevState,
			isOpenDrawer: !prevState.isOpenDrawer,
		}));
	}

	onScroll(event: any) {
		const { scrollTop } = (event.target as Document).scrollingElement!!;
		const target = this.backgroundRef.current;

		if (target) {
			if (scrollTop === 0) {
				target.runAnimation();
			} else if (target.requestAnimationFrameId !== 0) {
				target.stopAnimation();
			} else {
				target.updateBackground();
			}
		}
	}

	componentDidMount() {
		if (this.backgroundRef.current) {
			this.backgroundRef.current.runAnimation();
		}
		window.addEventListener("scroll", this.onScroll, false);
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.onScroll, false);
	}

	render() {
		// const { classes, title, profile, categories, tags, children } = this.props;
		const { title, profile, categories, tags, children } = this.props;
		const { isOpenDrawer } = this.state;

		return (
			<Provider
				value={{
					title: title,
					// categories,
					isOpenDrawer,
					toggleDrawer: this.toggleDrawer,
					profile,
					// tags,
				}}
			>
				<ThemeProvider theme={globalTheme}>
					<div
					// className={classes.root}
					>
						<CssBaseline />
						<AppBar />
						<Drawer />
						<main
						// className={classes.content}
						>
							<div
							// className={classes.toolbar}
							/>
							{children}
						</main>
					</div>
					<WaveBackgroundAni ref={this.backgroundRef} />
				</ThemeProvider>
			</Provider>
		);
	}
}

// FIXME mui withStyle 함수가 사라졌는 지 확인
// export default withStyles((theme) => ({
// 	root: {
// 		display: "flex",
// 		position: "relative",
// 	},
// 	background: {
// 		width: "100%",
// 		height: "100%",
// 		backgroundColor: globalTheme.palette.primary.main,
// 		zIndex: -999,
// 		position: "absolute",
// 	},
// 	toolbar: theme.mixins.toolbar,
// 	content: {
// 		width: "100%",
// 		padding: theme.spacing(2),
// 	},
// }))(BlogLayout);

export default BlogLayout;
