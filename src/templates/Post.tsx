import React from "react";
import { graphql } from "gatsby";

import styled from "@mui/material/styles/styled";
import { Theme, useTheme } from "@mui/material";
import { ClassNames } from "@emotion/react";

import Card, { CardProps } from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider, { DividerProps } from "@mui/material/Divider";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import { MDXRenderer } from "gatsby-plugin-mdx";

import BlogLayout from "../layout/BlogLayout";

// import Category from "../components/Category";
// import Tags from "../components/Tags";

interface PostScheme {
	mdx: {
		frontmatter: {
			title: string;
			tags: string;
			category: string;
			date: string;
		};
		body: string;
	};
}

interface PostProps {
	data: PostScheme;
}

const StyledCard = styled((props: CardProps) => {
	const theme = useTheme();

	return (
		<ClassNames>
			{({ css }) => (
				<Card
					{...props}
					classes={{
						root: css({
							margin: `0 ${theme.spacing(10)}`,
						}),
					}}
				/>
			)}
		</ClassNames>
	);
})();

const StyledDivider = styled((props: DividerProps) => {
	const theme = useTheme();

	return (
		<ClassNames>
			{({ css }) => (
				<Divider
					{...props}
					classes={{
						root: css({
							margin: `${theme.spacing(0.5)} 0`,
							borderTop: "3px double rgba(0, 0, 0, 0.12)",
						}),
					}}
				/>
			)}
		</ClassNames>
	);
})();

const Post: React.FC<PostProps> = ({ data }) => {
	const post = data.mdx;

	// const pathes = post.fields.slug.split("/").slice(1, -1);

	// FIXME ceo 요소 추가
	return (
		<BlogLayout>
			{/* TODO Category 살리기 */}
			{/* <Category medium pathes={pathes} /> */}
			<StyledCard elevation={4}>
				<CardContent>
					<Typography variant="h3">{post.frontmatter.title}</Typography>
					<Typography align="right" variant="subtitle2">
						<CalendarTodayIcon fontSize="inherit" />
						{new Date(post.frontmatter.date).toLocaleDateString()}
					</Typography>
					<StyledDivider />
					{/* TODO Tag 살리기 */}
					{/* <Tags align="right" tags={post.frontmatter.tags} /> */}
					<MDXRenderer>{post.body}</MDXRenderer>
				</CardContent>
			</StyledCard>
		</BlogLayout>
	);
};

export const query = graphql`
	query getMdx($id: String!) {
		mdx(id: { eq: $id }) {
			id
			frontmatter {
				title
				tags
				category
				date
			}
			body
		}
	}
`;

export default Post;
