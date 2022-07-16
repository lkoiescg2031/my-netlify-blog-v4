import { graphql, useStaticQuery } from "gatsby";
import React from "react";

import Tags from "../../../components/Tags";

export default function AllTags() {
	const data: Queries.AllPostTagsQuery = useStaticQuery(graphql`
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
	const allTags = new Set<string | null>();

	data?.allMdx.nodes.forEach(({ frontmatter }) => {
		frontmatter?.tags?.forEach((tag) => {
			allTags.add(tag);
		});
	});

	return <Tags align="center" tags={[...allTags]} />;
}
