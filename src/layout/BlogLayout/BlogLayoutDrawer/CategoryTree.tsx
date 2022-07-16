import { graphql, useStaticQuery } from "gatsby";
import React from "react";

import PostsButton from "./PostsButton";

const CategoryTree: React.FC = () => {
	const data: Queries.CategoryTreeQuery = useStaticQuery(graphql`
		query CategoryTree {
			allCategory(filter: { parent: { id: { eq: null } } }) {
				edges {
					node {
						categoryName
						postSize
						url
						childrenCategory {
							categoryName
							postSize
							url
							childrenCategory {
								categoryName
								postSize
								url
							}
						}
					}
				}
			}
		}
	`);

	return (function renderPosts(root, level = 0) {
		return (
			<React.Fragment key={root.url}>
				<PostsButton
					name={root.categoryName || ""}
					info={root.postSize || 0}
					url={root.url || ""}
					level={level}
				/>
				{Array.isArray(root.childrenCategory)
					? root.childrenCategory.map((childCategory) =>
							renderPosts(childCategory, level + 1)
					  )
					: null}
			</React.Fragment>
		);
	})(data.allCategory.edges[0].node);
};

export default CategoryTree;
