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
					node: {
						id: string;
						fileAbsolutePath: string;
					};
				}
			];
		};
	};
}

export default class MdxPageNodeAdapter implements CreateMdxGatsbyNode {
	private pageTemplatePath: string;

	constructor(pageTemplatePath: string) {
		this.pageTemplatePath = pageTemplatePath;
	}

	async createPages({ graphql, actions }: CreatePagesArgs): Promise<void> {
		const { createPage } = actions;

		const result: AllMdxQueryScheme = await graphql(`
			query MyQuery {
				allMdx {
					edges {
						node {
							id
							fileAbsolutePath
						}
					}
				}
			}
		`);

		result.data?.allMdx.edges.forEach(({ node }) => {
			const { id, fileAbsolutePath } = node;
			const [_, fileRelativePath] = fileAbsolutePath.split("src");

			createPage({
				path: fileRelativePath,
				component: path.resolve(this.pageTemplatePath),
				context: {
					id,
				},
			});
		});

		console.log(" \x1b[32msuccess \x1b[0mcreate mdx pages");
	}
}
