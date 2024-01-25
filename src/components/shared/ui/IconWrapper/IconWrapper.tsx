import React from "react";
import Image from "next/image";
import { Tooltip } from "@nextui-org/react";

type PropsType = {
	tooltip: string;
	size: string | number;
	sizeIcon: number;
	alt: string;
	src: string;
	onClick: () => void;
	colorTooltip?:
		| "default"
		| "foreground"
		| "primary"
		| "secondary"
		| "success"
		| "warning"
		| "danger"
		| undefined;
};

const IconWrapper = (props: PropsType): JSX.Element => {
	const { tooltip, size, sizeIcon, alt, src, onClick, colorTooltip } = props;
	return (
		<Tooltip content={tooltip} color={colorTooltip}>
			<div
				className={`w-${size} h-${size} flex items-center justify-center bg-default100 rounded cursor-pointer`}
				onClick={onClick}
			>
				<Image src={src} width={sizeIcon} height={sizeIcon} alt={alt} />
			</div>
		</Tooltip>
	);
};

export default IconWrapper;
