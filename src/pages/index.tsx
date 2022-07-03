import React from "react";
import { graphql, navigate, PageProps } from "gatsby";

import MouseEffectLayout from "../layout/MouseEffectLayout";
import BusinessCard, {
	CardTemplate1,
	CardTemplate2,
} from "../components/BusinessCard";

const LandingPage = ({ data }: PageProps<Queries.LandingPageQuery>) => {
	const { siteMetadata } = data.site || {};
	const { user } = siteMetadata || {};

	const moveToHome = () => {
		navigate("/Posts");
	};

	return (
		<MouseEffectLayout>
			<BusinessCard>
				<CardTemplate1
					title={siteMetadata?.title!!}
					subTitle={siteMetadata?.description!!}
					hasNextButton
				/>
				<CardTemplate2
					name={user?.name!!}
					figure={user?.figure!!}
					position={user?.position!!}
					email={user?.email!!}
					blog={user?.blog!!}
					github={user?.github!!}
					//sns options
					facebook={user?.facebook!!}
					linkedIn={user?.linkedIn!!}
					twitter={user?.twitter!!}
					instagram={user?.instagram!!}
					//homebutton options
					hasNextButton
					homeButtonCallback={moveToHome}
				/>
			</BusinessCard>
		</MouseEffectLayout>
	);
};

export const query = graphql`
	query LandingPage {
		site {
			siteMetadata {
				title
				description
				user {
					name
					figure
					position
					email
					blog
					github
					facebook
					twitter
					instagram
					linkedIn
				}
			}
		}
	}
`;

export default LandingPage;
