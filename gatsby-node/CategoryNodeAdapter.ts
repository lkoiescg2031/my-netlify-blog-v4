import {
	GatsbyNode,
	SourceNodesArgs,
	NodeInput,
	CreatePagesArgs,
	CreateNodeArgs,
} from "gatsby";
import { createFilePath } from "gatsby-source-filesystem";
import path from "path";

const USE_NODE_TYPE = "File";
const FILE_INSTANCE_TYPE = "posts";
const USE_EXTENSION_TYPES = [".md", ".mdx"];

const POST_ROOT_DIR_NAME = "posts";
const POST_URL_ROOT_PATH = "Posts";

const POST_NODE_TYPE = "Mdx";

type CATEGORY_NODE_TYPE = "Category";
const CATEGORY_NODE_TYPE_NAME = "Category";

const CATEGORY_RENDER_PAGE_TEMPLATE = "./src/templates/Category.tsx";

interface CategoryNodeAdapter extends GatsbyNode {
	createPages: (args: CreatePagesArgs) => Promise<void>;
}

interface Category extends NodeInput {
	absolutePath: string;
	url: string;
	categoryName: string;
	postSize: number;

	id: string;
	internal: {
		type: CATEGORY_NODE_TYPE;
		contentDigest: string;
	};
	parent: string | null;
	children: string[];
}

interface CategoryMap {
	[categoryId: string]: Category;
}

interface AllCategoryQueryScheme {
	errors?: any;
	data?: {
		allCategory: {
			nodes: {
				url: string;
				absolutePath: string;
			}[];
		};
	};
}

export default class MdxPageNodeAdapter implements CategoryNodeAdapter {
	sourceNodes({
		getNodesByType,
		createNodeId,
		createContentDigest,
		actions: { createNode },
	}: SourceNodesArgs) {
		const getAllPostsPath: () => string[] = () => {
			const allNodes = getNodesByType(USE_NODE_TYPE);
			const allPosts = allNodes.filter(
				(file) =>
					file.sourceInstanceName === FILE_INSTANCE_TYPE &&
					USE_EXTENSION_TYPES.includes(file.ext as string)
			);

			return allPosts.map((posts) => posts.absolutePath as string);
		};

		const createCategoryNode: (
			parent: string | null,
			absolutePath: string,
			url: string,
			categoryName: string
		) => Category = (parent, absolutePath, url, categoryName) => ({
			absolutePath,
			url,
			categoryName,
			postSize: 1,
			id: createNodeId(`category-${absolutePath}`),
			internal: {
				type: CATEGORY_NODE_TYPE_NAME,
				contentDigest: createContentDigest(absolutePath),
			},
			parent,
			children: [],
		});

		const extractCategory: (
			postPath: string,
			categoryMap: CategoryMap
		) => CategoryMap = (postPath, categoryMap) => {
			const [beforePosts, afterPosts] = postPath.split(
				`/${POST_ROOT_DIR_NAME}/`
			);

			// 파일명 제외한(마지막 원소가 파일명) 카테고리 이름 목록
			const categoryNames = afterPosts.split("/").slice(0, -1);
			const orderedCategoryNames = [POST_URL_ROOT_PATH, ...categoryNames];
			const orderedCategoryPath = [POST_ROOT_DIR_NAME, ...categoryNames];

			let parentPath = "";
			let absolutePathPrefix = beforePosts;

			return orderedCategoryNames.reduce(
				(categories: CategoryMap, categoryName: string, currentIdx: number) => {
					const url = `${parentPath}/${categoryName}`;
					const absolutePath = `${absolutePathPrefix}/${orderedCategoryPath[currentIdx]}`;

					if (!categoryMap.hasOwnProperty(absolutePath)) {
						categories[absolutePath] = createCategoryNode(
							absolutePathPrefix === beforePosts ? null : absolutePathPrefix,
							absolutePath,
							url,
							categoryName
						);
					} else {
						categoryMap[absolutePath].postSize += 1;
					}

					parentPath = url;
					absolutePathPrefix = absolutePath;
					return categories;
				},
				{}
			);
		};

		const replaceParentToId: (categoryMap: CategoryMap) => void = (
			categoryMap
		) => {
			Object.values(categoryMap).forEach((category) => {
				if (category.parent != null) {
					category.parent = categoryMap[category.parent].id;
				}
			});

			Object.entries(categoryMap).forEach(([key, category]) => {
				categoryMap[category.id] = category;
				delete categoryMap[key];
			});
		};

		const appendChildren: (categoryMap: CategoryMap) => void = (
			categoryMap
		) => {
			Object.values(categoryMap).forEach((node) => {
				const nodeID = node.id;
				const parentID = node.parent;
				if (parentID !== null) {
					categoryMap[parentID].children.push(nodeID);
				}
			});
		};

		const allPostPathes = getAllPostsPath();
		console.log(" \x1b[32msuccess \x1b[0mget all post files");

		const categoryMap: CategoryMap = allPostPathes.reduce(
			(finalMaps, postPath) => ({
				...finalMaps,
				...extractCategory(postPath, finalMaps),
			}),
			{}
		);
		console.log(" \x1b[32msuccess \x1b[0minitialize category nodes");

		replaceParentToId(categoryMap);
		console.log(
			" \x1b[32msuccess \x1b[0mfix category node's parent value to id"
		);

		appendChildren(categoryMap);
		console.log(" \x1b[32msuccess \x1b[0minitialize category node's children");

		Object.values(categoryMap).forEach((node) => {
			createNode(node);
		});
		console.log(" \x1b[32msuccess \x1b[0mcreate category nodes");
	}

	async onCreateNode({ node, getNode, actions }: CreateNodeArgs) {
		const { createNodeField } = actions;

		if (node.internal.type === POST_NODE_TYPE) {
			const slug = createFilePath({
				node,
				getNode,
				basePath: "pages",
				trailingSlash: false,
			});

			const postUrl = `/${POST_URL_ROOT_PATH}${slug}`;

			createNodeField({
				node,
				name: `url`,
				value: postUrl,
			});

			console.log(
				" \x1b[32msuccess \x1b[0mappend node fields url value " + postUrl
			);
		}
	}

	async createPages({ graphql, actions }: CreatePagesArgs) {
		const { createPage } = actions;

		const result: AllCategoryQueryScheme = await graphql(`
			query allCategory {
				allCategory {
					nodes {
						url
						absolutePath
					}
				}
			}
		`);

		//포스트 카테고리별 페이지 생성
		const toRegexStr = (str: string) => {
			return `/${str.replace("+", "\\+")}/`;
		};

		const toEncode = (str: string) => {
			return str.replace("#", escape("#"));
		};

		result.data?.allCategory.nodes.forEach((node) => {
			createPage({
				path: toEncode(node.url),
				component: path.resolve(CATEGORY_RENDER_PAGE_TEMPLATE),
				context: {
					slug: toRegexStr(node.absolutePath),
				},
			});
		});

		console.log(" \x1b[32msuccess \x1b[0mcreate category pages");
	}
}
