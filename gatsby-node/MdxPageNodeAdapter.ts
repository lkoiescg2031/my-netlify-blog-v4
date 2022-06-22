import { CreatePagesArgs, GatsbyNode } from "gatsby";

import path from "path";

interface CreateMdxGatsbyNode extends GatsbyNode {
	createPages: (args: CreatePagesArgs) => Promise<void>;
}

interface AllMdxQueryScheme {
	errors?: any;
	data?: {
		allMdx: {
			edges: [
				{
					node: { slug: string };
				}
			];
		};
	};
}

export default class MdxPageNodeAdapter implements CreateMdxGatsbyNode {
	private pageUrlPrefix: string;
	private pageTemplatePath: string;

	constructor(pageUrlPrefix: string, pageTemplatePath: string) {
		this.pageUrlPrefix = pageUrlPrefix;
		this.pageTemplatePath = pageTemplatePath;
	}

	async createPages({ graphql, actions }: CreatePagesArgs): Promise<void> {
		const { createPage } = actions;

		const result: AllMdxQueryScheme = await graphql(`
			query MyQuery {
				allMdx {
					edges {
						node {
							slug
						}
					}
				}
			}
		`);

		result.data?.allMdx.edges.forEach(({ node }) => {
			const url = path.join(this.pageUrlPrefix, node.slug);

			createPage({
				path: url,
				component: path.resolve(this.pageTemplatePath),
				context: {
					slug: url,
				},
			});
		});

		console.log(" \x1b[32msuccess \x1b[0mcreate mdx pages");
	}
}
