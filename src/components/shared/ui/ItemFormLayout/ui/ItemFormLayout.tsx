import React from "react";
import cls from "./ItemFormLayout.module.scss";

type PropsType = {
	children: JSX.Element;
	title: string;
	infoText?: string;
	errorText?: string;
	isRequired?: boolean;
	isError?: boolean;
};

const ItemFormLayout = (props: PropsType): JSX.Element => {
	const { children, title, infoText, isError, isRequired, errorText } = props;

	return (
		<div className={cls.ItemFormLayout}>
			<div className={cls.title}>{title}</div>
			{infoText && <div className={cls.infoText}>{infoText}</div>}
			{!isRequired && (
				<div className={cls.isRequired}>Не обязательно к заполнению</div>
			)}
			<div className={cls.children}>{children}</div>

			{errorText && isError && <div className={cls.errorText}>{errorText}</div>}
		</div>
	);
};

export default ItemFormLayout;
