import React from "react";
import { graphql, PageProps } from "gatsby";

import styled from "@mui/material/styles/styled";
import { useTheme } from "@mui/material";
import { ClassNames } from "@emotion/react";

import Card, { CardProps } from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider, { DividerProps } from "@mui/material/Divider";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import { MDXRenderer } from "gatsby-plugin-mdx";

import BlogLayout from "../layout/BlogLayout";
import SEO from "../components/SEO";

import Category from "../components/Category";
import Tags from "../components/Tags";

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
})({});

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
})({});

const Post = ({ data }: PageProps<Queries.PostQuery>) => {
	const pathes = data.mdx?.fields?.url?.split("/").slice(1, -1) || [];

	return (
		<BlogLayout>
			<SEO title={data.mdx?.frontmatter?.title} />
			<Category medium pathes={pathes} />
			<StyledCard elevation={4}>
				<CardContent>
					<Typography variant="h3">{data.mdx?.frontmatter?.title}</Typography>
					<Typography align="right" variant="subtitle2">
						<CalendarTodayIcon fontSize="inherit" />
						{new Date(data.mdx?.frontmatter?.date!!).toLocaleDateString()}
					</Typography>
					<StyledDivider />
					<Tags align="right" tags={data.mdx?.frontmatter?.tags || []} />
					<MDXRenderer>{data.mdx?.body!!}</MDXRenderer>
				</CardContent>
			</StyledCard>
		</BlogLayout>
	);
};

export const query = graphql`
	query Post($id: String!) {
		mdx(id: { eq: $id }) {
			id
			fields {
				url
			}
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
