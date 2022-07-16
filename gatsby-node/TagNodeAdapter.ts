import { GatsbyNode, CreatePagesArgs, CreateNodeArgs } from "gatsby";

import path from "path";

const TAG_TEMPATE_PATH = "./src/templates/Tag.tsx";

interface AllPostTagScheme {
	errors?: any;
	data?: {
		allMdx: {
			nodes: {
				frontmatter: {
					tags: string[];
				};
			}[];
		};
	};
}

export default class TagNodeAdapter implements GatsbyNode {
	async createPages({ actions, graphql }: CreatePagesArgs) {
		const { createPage } = actions;

		const result: AllPostTagScheme = await graphql(`
			query AllPostTags {
				allMdx {
					nodes {
						frontmatter {
							tags
						}
					}
				}
			}
		`);
		const allTags = new Set<string>();

		result.data?.allMdx.nodes.forEach(({ frontmatter: { tags } }) => {
			tags.forEach((tag) => {
				allTags.add(tag);
			});
		});

		allTags.forEach((tag) => {
			createPage({
				path: `/Tags/${tag}`,
				component: path.resolve(TAG_TEMPATE_PATH),
				context: {
					slug: tag,
				},
			});
		});

		console.log(" \x1b[32msuccess \x1b[0mcreate All Tag page");
	}
}
