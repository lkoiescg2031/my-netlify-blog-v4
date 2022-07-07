import { GatsbyNode } from "gatsby";

import MdxPageNodeAdapter from "./gatsby-node/MdxPageNodeAdapter";

const mdxPageNodeAdapter = new MdxPageNodeAdapter("./src/templates/Post.tsx");

const gatsbyNode: GatsbyNode = {
	async createPages(args) {
		await mdxPageNodeAdapter.createPages(args);
	},
};

module.exports = gatsbyNode;
