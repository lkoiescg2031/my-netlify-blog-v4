import React from "react";

import WarningIcon from "@mui/icons-material/WarningRounded";
import BreakoutGame from "@lkoiescg2031/react-breakout";

import BlogLayout from "../layout/BlogLayout";
import SEO from "../components/SEO";

const NotFoundPage = () => (
	<BlogLayout>
		<SEO title="404: Not found" />
		<WarningIcon style={{ fontSize: "75px" }} color="error" />
		<h1>404: 페이지를 찾을 수 없음</h1>
		<p>You just hit a route that doesn&#39;t exist... the sadness.</p>
		<BreakoutGame />
	</BlogLayout>
);

export default NotFoundPage;
