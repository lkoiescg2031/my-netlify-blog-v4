import React, { MouseEventHandler } from "react";

interface Profile {
	name?: string;
	figure?: string;
	desc?: string;
	email?: string;
	github?: string;
	facebook?: string;
	instagram?: string;
	twitter?: string;
	linkedIn?: string;
}

interface BlogLayoutContextProps {
	title: string;
	isOpenDrawer: boolean;
	toggleDrawer: MouseEventHandler<HTMLButtonElement>;
	profile?: Profile;
}

const BlogLayoutContext = React.createContext<BlogLayoutContextProps>({
	title: "",
	isOpenDrawer: false,
	toggleDrawer: () => {},
});

export const BlogLayoutProvider = BlogLayoutContext.Provider;
export const BlogLayoutConsumer = BlogLayoutContext.Consumer;

export default BlogLayoutContext;
