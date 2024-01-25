import React from "react";
import { PropsTypeIcons } from "@/components/shared/types/types";

const LikeIcon = (props: PropsTypeIcons): JSX.Element => {
	const { color, width, height } = props;

	return (
		<svg
			width={width || 13}
			height={height || 12}
			viewBox="0 0 13 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M9.40178 0.5C8.20335 0.5 7.15406 1.00887 6.5 1.86902C5.84594 1.00887 4.79665 0.5 3.59821 0.5C2.64424 0.501062 1.72964 0.875727 1.05508 1.5418C0.380517 2.20787 0.00107525 3.11095 0 4.05292C0 8.06428 6.02353 11.3112 6.28004 11.4453C6.34765 11.4812 6.42323 11.5 6.5 11.5C6.57677 11.5 6.65234 11.4812 6.71995 11.4453C6.97647 11.3112 13 8.06428 13 4.05292C12.9989 3.11095 12.6195 2.20787 11.9449 1.5418C11.2704 0.875727 10.3558 0.501062 9.40178 0.5Z"
				fill={color || "#D4D4D8"}
			/>
		</svg>
	);
};

export default LikeIcon;
