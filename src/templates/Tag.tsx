import React from "react";
import { graphql, PageProps } from "gatsby";

import styled from "@mui/material/styles/styled";
import { useTheme } from "@mui/material";
import { ClassNames } from "@emotion/react";

import Typography, { TypographyProps } from "@mui/material/Typography";

import BlogLayout from "../layout/BlogLayout";
import Post from "../components/Post";

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

const PostsWrapperDiv = styled("div")({
	display: "flex",
	flexFlow: "row wrap",
	justifyContent: "space-around",
});

interface TaggedPostListPageContext {
	slug: string;
}

const TaggedPostList = ({
	data,
	path,
	pageContext,
}: PageProps<Queries.PostsByTagQuery, TaggedPostListPageContext>) => {
	const posts = data.allMdx.nodes || [];

	return (
		<BlogLayout>
			<div>
				<Typography align="right" variant="caption">
					Tag
				</Typography>
				<Typography variant="h4">{pageContext.slug}</Typography>
			</div>
			<PostCountTypography variant="subtitle2">{`${posts.length} 개의 포스트`}</PostCountTypography>
			<PostsWrapperDiv>
				{posts.map((post, idx) => (
					<Post key={`${path}-${idx}`} post={post} />
				))}
			</PostsWrapperDiv>
		</BlogLayout>
	);
};

export const query = graphql`
	query PostsByTag($slug: [String]) {
		allMdx(
			filter: { frontmatter: { tags: { in: $slug } } }
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
				rawBody
				body
			}
			totalCount
		}
	}
`;

export default TaggedPostList;
