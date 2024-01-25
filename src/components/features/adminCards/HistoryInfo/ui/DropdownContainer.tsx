"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ArrowIcon from "@/components/shared/icons/ArrowIcon";

const collapseButtonState = {
	open: {
		rotate: 0,
		transition: { duration: 0.2 },
	},
	closed: {
		rotate: -180,
		transition: { duration: 0.2 },
	},
};

type PropsType = {
	title: string | JSX.Element;
	children: JSX.Element | string;
};

const DropdownContainer = (props: PropsType): JSX.Element => {
	const { title, children } = props;
	const [isOpen, setOpen] = useState<boolean>(false);
	const changeOpen = (): void => setOpen((prevState) => !prevState);

	return (
		<div>
			<div onClick={changeOpen} className="flex justify-between items-center">
				<div>{title}</div>
				<motion.div
					initial="open"
					animate={isOpen ? "open" : "closed"}
					variants={collapseButtonState}
					className=" w-[24px] flex items-center justify-center"
				>
					<ArrowIcon />
				</motion.div>
			</div>
			<AnimatePresence initial={false}>
				{isOpen && (
					<motion.div
						key={0}
						className="overflow-hidden"
						initial={{ height: 0 }}
						animate={{ height: "auto" }}
						exit={{ height: 0 }}
						transition={{ height: { duration: 0.2 } }}
					>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default DropdownContainer;
