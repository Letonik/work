import React from "react";
import { SelectItem } from "@nextui-org/react";

type PropsType = {
	value: string | number;
	label: string | number;
};

const SelectItemCustom = (props: PropsType): React.JSX.Element => {
	const { value, label } = props;

	return (
		<SelectItem
			className="data-[hover=true]:text-red-500"
			key={value}
			value={value}
		>
			{label}
		</SelectItem>
	);
};

export default SelectItemCustom;
