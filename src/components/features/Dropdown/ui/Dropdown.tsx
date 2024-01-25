"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import cls from "./Dropdown.module.scss";

const collapseButtonState = {
	open: {
		rotate: 0,
		transition: { duration: 0.3 },
	},
	closed: {
		rotate: -90,
		transition: { duration: 0.3 },
	},
};

type PropsType = {
	title: string;
	children: JSX.Element | string;
	icon?: JSX.Element;
};

const Dropdown = (props: PropsType): JSX.Element => {
	const { title, icon, children } = props;
	const [isOpen, setOpen] = useState<boolean>(true);
	const [containerVariants, setContainerVariants] = useState<any>(null);
	const changeOpen = (): void => setOpen((prevState) => !prevState);

	const refChild = useRef<HTMLDivElement>(null);
	const refTitle = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (refChild.current && refTitle.current) {
			const { height: heightChild } = refChild.current.getBoundingClientRect();
			const { height: heightTitle } = refTitle.current.getBoundingClientRect();
			setContainerVariants({
				open: {
					height: heightTitle + heightChild,
					transition: { duration: 0.1 },
				},
				closed: {
					height: heightTitle,
					transition: { duration: 0.1 },
				},
			});
		}
	}, [isOpen]);

	return (
		<motion.div
			initial="open"
			animate={isOpen ? "open" : "closed"}
			variants={containerVariants}
			className={`${cls.Dropdown}`}
		>
			<div
				className={`${cls.dropdownTitle} ${isOpen ? cls.open : ""}`}
				ref={refTitle}
				onClick={changeOpen}
			>
				<div className={cls.title}>
					{icon && (
						<div className={`${cls.icons} ${cls.iconsOpen}`}>{icon}</div>
					)}
					<div className={cls.name}>{title}</div>
				</div>
				<motion.div
					initial="open"
					animate={isOpen ? "open" : "closed"}
					variants={collapseButtonState}
					className={cls.markerContainer}
				>
					{/* 'todo': Заменить иконку (стрелка) */}
					<Image
						src="/images/icons/arrow-left.png"
						width="12"
						height="10"
						alt="Picture of the author"
					/>
				</motion.div>
			</div>
			<div className={cls.dropdownText} ref={refChild}>
				{children}
			</div>
		</motion.div>
	);
};

export default Dropdown;
