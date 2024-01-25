import React from "react";
import { PropsTypeIcons } from "@/components/shared/types/types";

const ChevronDownIcon = (props: PropsTypeIcons): JSX.Element => {
	const { color, width, height } = props;

	return (
		<svg
			width={width || 13}
			height={height || 8}
			viewBox="0 0 13 8"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M0.5 1L6.5 7L12.5 1"
				stroke={color || "#474747"}
				strokeLinecap="round"
			/>
		</svg>
	);
};

export default ChevronDownIcon;
