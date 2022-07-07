import { GatsbyNode, SourceNodesArgs } from "gatsby";

import MdxPageNodeAdapter from "./gatsby-node/MdxPageNodeAdapter";
import CategoryNodeAdapter from "./gatsby-node/CategoryNodeAdapter";

const mdxPageNodeAdapter = new MdxPageNodeAdapter("./src/templates/Post.tsx");
const categoryNodeAdapter = new CategoryNodeAdapter();

const gatsbyNode: GatsbyNode = {
	sourceNodes(sourceNodeArgs: SourceNodesArgs) {
		categoryNodeAdapter.sourceNodes(sourceNodeArgs);
	},

	async createPages(createPagesArgs) {
		await mdxPageNodeAdapter.createPages(createPagesArgs);
	},
};

module.exports = gatsbyNode;
