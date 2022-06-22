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

interface BlogLayoutContext {
	title: string;
	isOpenDrawer: boolean;
	toggleDrawer: MouseEventHandler<HTMLButtonElement>;
	profile?: Profile;
	categories?: object;
	tags?: [string];
}

const { Provider, Consumer } = React.createContext<BlogLayoutContext>({
	title: "",
	isOpenDrawer: false,
	toggleDrawer: () => {},
});

export { Provider, Consumer };
