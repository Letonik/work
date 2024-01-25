import React from "react";
import { PropsTypeIcons } from "@/components/shared/types/types";

const ChevronLeftIcon = (props: PropsTypeIcons): JSX.Element => {
	const { color, width, height } = props;

	return (
		<svg
			width={width || 11}
			height={height || 20}
			viewBox="0 0 11 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M9.5 18.5L1.5 10L9.5 1.5"
				stroke={color || "#ffffff"}
				strokeWidth="2"
				strokeLinecap="round"
			/>
		</svg>
	);
};

export default ChevronLeftIcon;
