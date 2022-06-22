import React from "react";
import { StaticQuery, graphql } from "gatsby";

import BlogLayout from "./BlogLayout";

export default (props: any) => {
	const query = graphql`
		{
			site {
				siteMetadata {
					title
					description
					user {
						name
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
	`;

	return (
		<StaticQuery
			query={query}
			render={(data) => (
				<BlogLayout
					{...props}
					title={data.site.siteMetadata.title}
					// categories={data.allCategory.edges[0].node}
					// tags={data.allTag.nodes.map(({ name }) => name)}
					profile={{
						...data.site.siteMetadata.user,
						desc: data.site.siteMetadata.description,
					}}
				/>
			)}
		/>
	);
};
