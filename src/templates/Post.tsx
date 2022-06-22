// import React from "react";
// import { graphql } from "gatsby";

// // import { makeStyles, Theme } from "@mui/material";

// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";

// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

// import BlogLayout from "../layout/BlogLayout";
// // import Category from "../components/Category";
// // import Tags from "../components/Tags";

// // FIXME styled-component 시스탬 변경
// // const usePostStyle = makeStyles((theme: Theme) => ({
// // 	cardRoot: {
// // 		margin: `0 ${theme.spacing(10)}px`,
// // 	},
// // 	titleDivider: {
// // 		marginTop: theme.spacing(0.5),
// // 		marginBottom: theme.spacing(0.5),
// // 		borderTop: "3px double rgba(0, 0, 0, 0.12)",
// // 	},
// // }));

// interface PostScheme {
// 	markdownRemark: {
// 		frontmatter: {
// 			title: string;
// 			tags: string;
// 			date: string;
// 		};
// 		fields: {
// 			slug: string;
// 		};
// 		html: string;
// 	};
// }

// interface PostProps {
// 	data: PostScheme;
// }

// const Post: React.FC<PostProps> = ({ data }) => {
// 	// const classes = usePostStyle();
// 	const post = data.markdownRemark;

// 	const pathes = post.fields.slug.split("/").slice(1, -1);

// 	return (
// 		<BlogLayout>
// 			{/* TODO Category 살리기
// 			<Category medium pathes={pathes} /> */}
// 			<Card
// 				elevation={4}
// 				//classes={{ root: classes.cardRoot }}
// 			>
// 				<CardContent>
// 					<Typography variant="h3">{post.frontmatter.title}</Typography>
// 					<Typography align="right" variant="subtitle2">
// 						<CalendarTodayIcon fontSize="inherit" />
// 						{new Date(post.frontmatter.date).toLocaleDateString()}
// 					</Typography>
// 					<Divider
// 					// classes={{ root: classes.titleDivider }}
// 					/>
// 					{/* TODO Tag 살리기
// 					<Tags align="right" tags={post.frontmatter.tags} /> */}
// 					<div dangerouslySetInnerHTML={{ __html: post.html }} />
// 				</CardContent>
// 			</Card>
// 		</BlogLayout>
// 	);
// };

// export const query = graphql`
// 	query ($slug: String!) {
// 		markdownRemark(fields: { slug: { eq: $slug } }) {
// 			frontmatter {
// 				title
// 				tags
// 				date
// 			}
// 			fields {
// 				slug
// 			}
// 			html
// 		}
// 	}
// `;

// export default Post;
