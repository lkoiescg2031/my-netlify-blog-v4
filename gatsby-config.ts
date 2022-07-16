import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
	siteMetadata: {
		author: "Taehong Kim",
		siteUrl: "http://lkoiescg2031.netlify.com",
		title: "Backend Developer Log",
		description:
			"웹개발, 백엔드, 프론트엔드 상관없이 관심 있는 분야라면, <br /> 뭐든 다뤄보는 블로그",
		user: {
			name: "Taehong Kim",
			desc: "웹 개발에 관련된 모은 분야라면 <br/> 뭐든 다루고 있습니다.",
			figure:
				"https://avatars3.githubusercontent.com/u/42562726?s=400&u=611e46e8fb672c2be8df5c50ad9f2e5c3a35cbbf&v=4",
			position: "NTS Backend Developer",
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
		"gatsby-plugin-material-ui",
		{
			resolve: `gatsby-plugin-emotion`,
			options: {
				// Accepts the following options, all of which are defined by `@emotion/babel-plugin` plugin.
				// The values for each key in this example are the defaults the plugin uses.
				sourceMap: true,
				autoLabel: "dev-only",
				labelFormat: `[local]`,
				cssPropOptimization: true,
			},
		},
		"gatsby-plugin-netlify-cms",
		"gatsby-plugin-image",
		"gatsby-plugin-react-helmet",
		"gatsby-plugin-sitemap",
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Backend Developer Log`,
				short_name: `sw engineer`,
				display: `standalone`,
				icon: `src/images/blog_icon.png`, // This path is relative to the root of the site.
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
				remarkPlugins: [require("remark-prism")],
			},
		},
		"gatsby-plugin-sharp",
		// FIXME gatsby-transformer-sharp 업데이트
		/** warn [gatsby-transformer-sharp] The "fixed" and "fluid" resolvers are now deprecated. Switch to
"gatsby-plugin-image" for better performance and a simpler API. See https://gatsby.dev/migrate-images to
learn how.
		 */
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
