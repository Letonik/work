import React from "react";
import { departments } from "@/components/shared/const/departments";

type PropsType = {
	dep: string;
};

const ChipCustom = (props: PropsType): JSX.Element => {
	const { dep } = props;
	const depProperties = departments[dep];
	return (
		<span
			className="rounded-full py-1 px-2 max-h-[30px]"
			style={{
				color: depProperties.color,
				background: depProperties.bg,
			}}
		>
			{depProperties.name.toLowerCase()}
		</span>
	);
};

export default ChipCustom;
