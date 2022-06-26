import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import BlogLayout from "./BlogLayout";

const Container: React.FC<any> = (props: any) => {
	const data = useStaticQuery(graphql`
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
	`);

	return (
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
	);
};

export default Container;
