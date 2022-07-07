import { CreatePagesArgs, GatsbyNode } from "gatsby";

import path from "path";

const POST_TEMPLATE_PATH = "./src/templates/Post.tsx";

const POST_ROOT_DIR = "posts";
const POST_ROOT_URL = "Posts";

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
	async createPages({ graphql, actions }: CreatePagesArgs): Promise<void> {
		const { createPage } = actions;

		const result: AllMdxQueryScheme = await graphql(`
			query allPublicPosts {
				allMdx(filter: { frontmatter: { private: { eq: false } } }) {
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
			const [_, fileRelativePath] = fileAbsolutePath.split(POST_ROOT_DIR);
			const fileRelativePathWithOutExt = fileRelativePath
				.split(".")
				.slice(0, -1)
				.join(".");

			createPage({
				path: POST_ROOT_URL + fileRelativePathWithOutExt,
				component: path.resolve(POST_TEMPLATE_PATH),
				context: {
					id,
				},
			});
		});

		console.log(" \x1b[32msuccess \x1b[0mcreate mdx pages");
	}
}
