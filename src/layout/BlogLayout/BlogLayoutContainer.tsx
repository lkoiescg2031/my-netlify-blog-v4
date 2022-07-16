import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import BlogLayout from "./BlogLayout";

const BlogLayoutContainer: React.FC<any> = (props: any) => {
	const data: Queries.siteMetadataQuery = useStaticQuery(graphql`
		query siteMetadata {
			site {
				siteMetadata {
					title
					user {
						name
						desc
						figure
						email
						github
						twitter
						facebook
						instagram
						linkedIn
						position
					}
				}
			}
		}
	`);

	return (
		<BlogLayout
			{...props}
			title={data.site?.siteMetadata?.title}
			// tags={data.allTag.nodes.map(({ name }) => name)}
			profile={data.site?.siteMetadata?.user}
		/>
	);
};

export default BlogLayoutContainer;
