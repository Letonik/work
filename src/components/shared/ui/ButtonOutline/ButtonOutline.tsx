import React, { ButtonHTMLAttributes } from "react";

interface PropsData extends ButtonHTMLAttributes<HTMLButtonElement> {
	classes: string;
}

const ButtonOutline = (props: PropsData): JSX.Element => {
	const { value, classes = "" } = props;
	return (
		<button
			className={`border-1 border-default900 rounded px-20 py-2 text-m uppercase hover:text-default500 hover:border-default500 ${classes}`}
			{...props}
			type="button"
		>
			{value}
		</button>
	);
};

export default ButtonOutline;
