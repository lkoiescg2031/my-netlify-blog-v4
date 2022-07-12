import React from "react";

import styled from "@mui/material/styles/styled";
import { useTheme } from "@mui/material";
import { ClassNames } from "@emotion/react";

import Card, { CardProps } from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography, { TypographyProps } from "@mui/material/Typography";
import Button, { ButtonProps } from "@mui/material/Button";

import { MDXRenderer } from "gatsby-plugin-mdx";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

// FIXME 태그 추가
// import Tags from "./Tags";
import { getRandomInt } from "../utils/math";

const PostWrapper = styled("div")({
	display: "flex",
	alignItems: "center",
});

const PostCard = styled((props: CardProps) => {
	const theme = useTheme();

	return (
		<ClassNames>
			{({ css }) => (
				<Card
					{...props}
					classes={{
						root: css({
							width: "300px",
							padding: theme.spacing(1),
							margin: theme.spacing(1),
							marginBottom: theme.spacing(3),
						}),
					}}
				/>
			)}
		</ClassNames>
	);
})({});

const PostCardMedia = styled(CardMedia)({
	height: 0,
	paddingTop: "56.25%", // 16:9
});

interface PostDescTypographyProps extends TypographyProps {
	component: string;
	hasMedia: boolean;
}
const PostDescTypography = styled(
	({ hasMedia, ...typographyProps }: PostDescTypographyProps) => (
		<ClassNames>
			{({ css, cx }) => (
				<Typography
					{...typographyProps}
					classes={{
						root: cx(
							css({
								maxHeight: "260px",
								overflow: "hidden",
							}),
							{
								[css({
									maxHeight: "100px",
								})]: hasMedia,
							}
						),
					}}
				/>
			)}
		</ClassNames>
	)
)({});

const ShowPostButton = styled((props: ButtonProps) => (
	<ClassNames>
		{({ css }) => (
			<Button
				{...props}
				classes={{
					root: css({
						marginLeft: "auto",
					}),
				}}
			/>
		)}
	</ClassNames>
))({});

interface PostProps {
	post: {
		readonly body: string;
		readonly rawBody: string;
		readonly fields: {
			readonly url: string | null;
		} | null;
		readonly frontmatter: {
			readonly title: string;
			readonly tags: ReadonlyArray<string | null> | null;
			readonly date: string | null;
			readonly private: boolean | null;
			readonly featuredImage: {
				readonly childImageSharp: {
					readonly fluid: {
						readonly originalImg: string | null;
						readonly originalName: string | null;
					} | null;
				} | null;
			} | null;
		} | null;
	};
}

const Post: React.FC<PostProps> = ({ post }) => {
	const mediaImage = (() => {
		const featuredImage = post.frontmatter?.featuredImage;

		if (featuredImage != null) {
			return {
				image: featuredImage.childImageSharp?.fluid?.originalImg,
				title: featuredImage.childImageSharp?.fluid?.originalName,
			};
		}

		const imgExpressionStr: string[] =
			post.rawBody.match(/!\[(.*)\]\((.*)\)?/gm) || [];

		if (imgExpressionStr.length > 0) {
			const imgs = imgExpressionStr.map((img) => {
				const imgArr = /!\[(.*)\]\((.*)\)/gm.exec(img) || [];

				return {
					image: imgArr[2],
					title: imgArr[1],
				};
			});

			return imgs[getRandomInt(0, imgs.length)];
		}

		return null;
	})();
	const hasMedia = mediaImage !== null;

	return (
		<PostWrapper>
			<PostCard elevation={3}>
				<CardHeader
					title={
						<>
							<Typography align="right" variant="caption">
								<CalendarTodayIcon fontSize="inherit" />
								{new Date(
									post.frontmatter?.date as string
								).toLocaleDateString()}
							</Typography>
							<Typography variant="h6">{post.frontmatter?.title}</Typography>
							{/* <Tags outlined tags={post.frontmatter.tags} /> */}
						</>
					}
				/>
				{mediaImage && (
					<PostCardMedia
						image={mediaImage.image || ""}
						title={mediaImage.title || ""}
					/>
				)}
				<CardContent>
					<PostDescTypography
						component="div"
						variant="body2"
						hasMedia={hasMedia}
					>
						<MDXRenderer>{post.body}</MDXRenderer>
					</PostDescTypography>
				</CardContent>
				<CardActions>
					<ShowPostButton
						variant="contained"
						color="secondary"
						href={post.fields?.url || ""}
					>
						SHOW
					</ShowPostButton>
				</CardActions>
			</PostCard>
		</PostWrapper>
	);
};

export default Post;
