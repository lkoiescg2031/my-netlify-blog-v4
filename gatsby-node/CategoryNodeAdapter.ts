import { SourceNodesArgs, NodeInput } from "gatsby";

const USE_NODE_TYPE = "File";
const FILE_INSTANCE_TYPE = "posts";
const USE_EXTENSION_TYPES = [".md", ".mdx"];

const POST_ROOT_DIR_NAME = "posts";
const POST_URL_ROOT_PATH = "Posts";

type CATEGORY_NODE_TYPE = "Category";
const CATEGORY_NODE_TYPE_NAME = "Category";

interface Category extends NodeInput {
	absolutePath: string;
	relativePath: string;
	categoryName: string;
	postsCnt: number;

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

export default class CategoryNodeAdapter {
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
			categoryName: string
		) => Category = (parent, absolutePath, categoryName) => {
			const afterPosts = absolutePath.split(`/${POST_ROOT_DIR_NAME}/`)[1];
			const relativePath = `/${POST_URL_ROOT_PATH}${
				typeof afterPosts === "undefined" ? "" : `/${afterPosts}`
			}`;

			return {
				absolutePath,
				relativePath,
				categoryName,
				postsCnt: 1,
				id: createNodeId(`category-${absolutePath}`),
				internal: {
					type: CATEGORY_NODE_TYPE_NAME,
					contentDigest: createContentDigest(absolutePath),
				},
				parent,
				children: [],
			};
		};

		const extractCategory: (
			postPath: string,
			categoryMap: CategoryMap
		) => CategoryMap = (postPath, categoryMap) => {
			const [beforePosts, afterPosts] = postPath.split(
				`/${POST_ROOT_DIR_NAME}/`
			);
			const [...orderedCategoryNames] = [
				POST_URL_ROOT_PATH,
				...afterPosts.split("/"),
			];
			const _fileName = orderedCategoryNames.pop();

			let parentPath = beforePosts;

			return orderedCategoryNames.reduce(
				(categories: CategoryMap, categoryName: string) => {
					const currentPath = `${parentPath}/${categoryName}`;

					if (!categoryMap.hasOwnProperty(currentPath)) {
						categories[currentPath] = createCategoryNode(
							parentPath === beforePosts ? null : parentPath,
							currentPath,
							categoryName
						);
					} else {
						categoryMap[currentPath].postsCnt += 1;
					}

					parentPath = currentPath;
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
					categoryMap[category.parent].id;
				}
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
}
