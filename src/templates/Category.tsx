import React from "react";
import { graphql, PageProps } from "gatsby";

import styled from "@mui/material/styles/styled";
import { useTheme } from "@mui/material";
import { ClassNames } from "@emotion/react";

import Typography, { TypographyProps } from "@mui/material/Typography";

import BlogLayout from "../layout/BlogLayout";
import Category from "../components/Category";
import Post from "../components/Post";

const PostWrapper = styled("div")({
	display: "flex",
	flexFlow: "row wrap",
	justifyContent: "space-around",
});
const PostCountTypography = styled((props: TypographyProps) => {
	const theme = useTheme();

	return (
		<ClassNames>
			{({ css }) => (
				<Typography
					{...props}
					classes={{
						root: css({
							textAlign: "right",
							marginBottom: theme.spacing(2),
						}),
					}}
				/>
			)}
		</ClassNames>
	);
})({});

const CategoryTemplate = ({
	data,
	path,
}: PageProps<Queries.PostsByCategoryQuery>) => {
	const posts = data.allMdx.nodes || [];
	const pathes = path.split("/").slice(1);

	return (
		<BlogLayout>
			<Category medium pathes={pathes} />
			<PostCountTypography variant="subtitle2">{`${posts.length} 개의 포스트`}</PostCountTypography>
			<PostWrapper>
				{posts.map((post, idx) => (
					<Post key={`${path}-${idx}`} post={post} />
				))}
			</PostWrapper>
		</BlogLayout>
	);
};

export const query = graphql`
	query PostsByCategory($slug: String!) {
		allMdx(
			filter: {
				fileAbsolutePath: { regex: $slug }
				frontmatter: { private: { eq: false } }
			}
			sort: { fields: frontmatter___date, order: DESC }
		) {
			nodes {
				fields {
					url
				}
				frontmatter {
					title
					tags
					date
					private
					featuredImage {
						childImageSharp {
							fluid {
								originalImg
								originalName
							}
						}
					}
				}
				body
				rawBody
			}
			totalCount
		}
	}
`;

export default CategoryTemplate;
