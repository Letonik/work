import React from "react";
import { PropsTypeIcons } from "@/components/shared/types/types";

const DocumentIcon = (props: PropsTypeIcons): JSX.Element => {
	const { color, width, height } = props;

	return (
		<svg
			width={width || 23}
			height={height || 23}
			viewBox="0 0 23 23"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M19.6458 9.76525H16.8762C14.605 9.76525 12.7554 7.91567 12.7554 5.64442V2.87484C12.7554 2.34775 12.3241 1.9165 11.7971 1.9165H7.73373C4.78206 1.9165 2.39581 3.83317 2.39581 7.25442V15.7453C2.39581 19.1665 4.78206 21.0832 7.73373 21.0832H15.2662C18.2179 21.0832 20.6041 19.1665 20.6041 15.7453V10.7236C20.6041 10.1965 20.1729 9.76525 19.6458 9.76525Z"
				fill={color || "#ffffff"}
			/>
			<path
				d="M15.1417 2.11789C14.7488 1.72497 14.0684 1.99331 14.0684 2.53956V5.88414C14.0684 7.28331 15.2567 8.44289 16.7038 8.44289C17.6142 8.45247 18.8792 8.45247 19.9621 8.45247C20.5084 8.45247 20.7959 7.81039 20.4125 7.42706C19.0325 6.03747 16.56 3.53622 15.1417 2.11789Z"
				fill={color || "#ffffff"}
			/>
		</svg>
	);
};

export default DocumentIcon;
