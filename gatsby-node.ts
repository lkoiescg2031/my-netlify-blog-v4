import { GatsbyNode } from "gatsby";

import MdxPageNodeAdapter from "./gatsby-node/MdxPageNodeAdapter";

const mdxPageNodeAdapter = new MdxPageNodeAdapter("/posts", "./src/templates/Post.tsx")ß

const gatsbyNode: GatsbyNode = {
	async createPages(args) {
		// await mdxPageNodeAdapter.createPages(args);
	},
};

module.exports = gatsbyNode;
