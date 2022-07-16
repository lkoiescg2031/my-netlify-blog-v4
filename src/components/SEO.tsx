import React from "react";

import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

interface SEOProps {
	lang?: string;
	title?: string;
	description?: string;
	meta?: Array<{}>;
}

const SEO: React.FC<SEOProps> = ({ lang = "ko", title, description, meta }) => {
	const { site } = useStaticQuery(
		graphql`
			query {
				site {
					siteMetadata {
						title
						description
						author
						siteUrl
					}
				}
			}
		`
	);

	const metaDescription = description || site.siteMetadata.description;
	const defaultTitle = site.siteMetadata?.title;
	const _title = title ? `${title} | ${defaultTitle}` : defaultTitle;

	return (
		<Helmet htmlAttributes={{ lang }}>
			<meta charSet="utf-8" />
			<meta name="description" content={metaDescription} />
			<meta property="og:title" content={title} />
			<meta property="og:desscription" content={metaDescription} />
			<meta property="og:type" content="website" />
			<meta name="twitter:card" content="summary" />
			<meta name="twitter:creator" content={site.siteMetadata?.author || ""} />
			<meta name="twitter:title" content={_title} />
			<meta name="twitter:description" content={metaDescription} />
			<title>{_title}</title>
		</Helmet>
	);
};

export default SEO;
