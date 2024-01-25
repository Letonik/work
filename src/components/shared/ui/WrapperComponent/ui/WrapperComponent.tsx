import React from "react";
import { SpinGlobal } from "@/components/shared/ui/SpinGlobal";
import cls from "./WrapperComponent.module.scss";

type PropsType = {
	children: JSX.Element;
	isLoading?: boolean;
};

const WrapperComponent = (props: PropsType): JSX.Element => {
	const { children, isLoading } = props;
	return (
		<div className={cls.WrapperComponent}>
			{children}
			{isLoading && <SpinGlobal />}
		</div>
	);
};

export default WrapperComponent;
