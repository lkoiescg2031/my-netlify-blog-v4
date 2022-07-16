import { GatsbyNode, SourceNodesArgs } from "gatsby";

import MdxPageNodeAdapter from "./gatsby-node/MdxPageNodeAdapter";
import CategoryNodeAdapter from "./gatsby-node/CategoryNodeAdapter";
import TagNodeAdapter from "./gatsby-node/TagNodeAdapter";

const mdxPageNodeAdapter = new MdxPageNodeAdapter();
const categoryNodeAdapter = new CategoryNodeAdapter();
const tagNodeAdapter = new TagNodeAdapter();

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
		await tagNodeAdapter.createPages(createPagesArgs);
	},
};

module.exports = gatsbyNode;
