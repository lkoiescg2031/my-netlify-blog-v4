import React, { MouseEvent } from "react";
import PropTypes from "prop-types";

import { ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import BlogLayoutAppbar from "./BlogLayoutAppBar";
import BlogLayoutDrawer from "./BlogLayoutDrawer";
import SEO from "../../components/SEO";

import globalTheme from "../../styles/theme";

import WaveBackgroundAni from "../../components/WaveAniBackground";

import { BlogLayoutProvider } from "./BlogLayoutContext";

const StyledRootDiv = styled((props: { children: React.ReactElement[] }) => (
	<div {...props} />
))(({ theme }) => ({
	display: "flex",
	position: "relative",
}));

const StyledMain = styled((props: { children: React.ReactElement[] }) => (
	<main {...props} />
))(({ theme }) => ({
	width: "100%",
	padding: theme.spacing(2),
}));

const StyledToolbar = styled((props) => <div {...props} />)(({ theme }) => ({
	...theme.mixins.toolbar,
}));

interface BlogLayoutProps {
	title: string;
	profile: object;
	categories?: object;
	tags?: [string];
	classes: { root: any; content: any; toolbar: any };
	children: React.ReactElement;
	window?: () => Window;
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
		const { title, profile, categories, tags, children } = this.props;
		const { isOpenDrawer } = this.state;

		return (
			<BlogLayoutProvider
				value={{
					title: title,
					isOpenDrawer,
					toggleDrawer: this.toggleDrawer,
					profile,
					// categories,
					// tags,
				}}
			>
				<ThemeProvider theme={globalTheme}>
					<SEO />
					<StyledRootDiv>
						<CssBaseline />
						<BlogLayoutAppbar {...this.props} />
						<BlogLayoutDrawer />
						<StyledMain>
							<StyledToolbar />
							{children}
						</StyledMain>
					</StyledRootDiv>
					<WaveBackgroundAni ref={this.backgroundRef} />
				</ThemeProvider>
			</BlogLayoutProvider>
		);
	}
}

export default BlogLayout;
