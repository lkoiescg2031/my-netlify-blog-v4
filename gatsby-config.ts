import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
	siteMetadata: {
		title: `Backend develop log`,
		siteUrl: `http://lkoiescg2031.netlify.com`,
		description: "웹개발, 백엔드, 프론트엔드 상관없이 관심 있는 분야라면 뭐든 다뤄보는 블로그",
		author: "Taehong Kim",
		user: {
			name: "Taehong Kim",
			figure:
				"https://avatars3.githubusercontent.com/u/42562726?s=400&u=611e46e8fb672c2be8df5c50ad9f2e5c3a35cbbf&v=4",
			position: "developer",
			email: "lkoiescg2031@naver.com",
			blog: "https://lkoiescg2031.netlify.app",
			github: "https://github.com/lkoiescg2031",
			facebook: "https://www.facebook.com/profile.php?id=100015452532299",
			twitter: "",
			instagram: "",
			linkedIn: "",
		},
	},
	// More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
	// If you use VSCode you can also use the GraphQL plugin
	// Learn more at: https://gatsby.dev/graphql-typegen
	graphqlTypegen: true,
	plugins: [
		`gatsby-plugin-material-ui`,
		`gatsby-plugin-emotion`,
		"gatsby-plugin-netlify-cms",
		"gatsby-plugin-image",
		"gatsby-plugin-react-helmet",
		"gatsby-plugin-sitemap",
		{
			resolve: "gatsby-plugin-manifest",
			options: {
				icon: "src/images/icon.png",
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `posts`,
				path: `${__dirname}/src/posts`,
				ignore: ["**/README.md"],
			},
		},
		{
			resolve: "gatsby-plugin-mdx",
			options: {
				extensions: [`.mdx`, `.md`],
			},
		},
		"gatsby-plugin-sharp",
		"gatsby-transformer-sharp",
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "images",
				path: "./src/images/",
			},
			__key: "images",
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "pages",
				path: "./src/pages/",
			},
			__key: "pages",
		},
	],
};

export default config;
