import { GatsbyNode, SourceNodesArgs } from "gatsby";

import MdxPageNodeAdapter from "./gatsby-node/MdxPageNodeAdapter";
import CategoryNodeAdapter from "./gatsby-node/CategoryNodeAdapter";

const mdxPageNodeAdapter = new MdxPageNodeAdapter();
const categoryNodeAdapter = new CategoryNodeAdapter();

const gatsbyNode: GatsbyNode = {
	sourceNodes(sourceNodeArgs: SourceNodesArgs) {
		categoryNodeAdapter.sourceNodes(sourceNodeArgs);
	},

	onCreateNode(createPageArgs) {
		categoryNodeAdapter.onCreateNode(createPageArgs);
	},

	async createPages(createPagesArgs) {
		await categoryNodeAdapter.createPages(createPagesArgs);
		await mdxPageNodeAdapter.createPages(createPagesArgs);
	},
};

module.exports = gatsbyNode;
