import React from "react";
import { PropsTypeIcons } from "@/components/shared/types/types";

const ArrowIcon = (props: PropsTypeIcons): JSX.Element => {
	const { color, width, height } = props;

	return (
		<svg
			width={width || 24}
			height={height || 24}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12.8697 9.06047C12.3926 8.58336 11.6075 8.58336 11.1304 9.06047L4.61041 15.5805C4.31752 15.8734 3.84264 15.8734 3.54975 15.5805C3.25685 15.2876 3.25685 14.8127 3.54975 14.5198L10.0697 7.99981C11.1326 6.93691 12.8675 6.93691 13.9304 7.99981L20.4504 14.5198C20.7433 14.8127 20.7433 15.2876 20.4504 15.5805C20.1575 15.8734 19.6826 15.8734 19.3897 15.5805L12.8697 9.06047Z"
				fill={color || "#A1A1AA"}
			/>
		</svg>
	);
};

export default ArrowIcon;
