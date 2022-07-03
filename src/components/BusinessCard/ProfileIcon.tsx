import React from "react";
import styled from "@emotion/styled";

import color from "../../styles/color";

const getIconHref = ({ type, url }: { type: string; url: string }) => {
	switch (type) {
		case "email":
			return { name: "email", icon: "xi-mail", href: `mailto:${url}` };
		case "blog":
			return { name: "home", icon: "xi-home", href: url };
		case "github":
			return { name: "github", icon: "xi-github", href: url };
		case "facebook":
			return { name: "facebook", icon: "xi-facebook-official", href: url };
		case "twitter":
			return { name: "twitter", icon: "xi-twiiter", href: url };
		case "instagram":
			return { name: "instagram", icon: "xi-instagram", href: url };
		case "linkedIn":
			return { name: "linkedIn", icon: "xi-linkedin-square", href: url };
		default:
			return { icon: "xi-ellipsis-h", href: url };
	}
};

const ProfileIconA = styled.a({
	margin: "0.3rem",
	color: color.secondaryColor,
	fontSize: "2.5rem",
});

interface ProfileIconProps {
	type: string;
	url: string;
}

const ProfileIcon: React.FC<ProfileIconProps> = ({ type, url }) => {
	const { icon, href } = getIconHref({ type, url });

	return (
		<ProfileIconA type="button" href={href}>
			<i className={icon} />
		</ProfileIconA>
	);
};

export default ProfileIcon;
