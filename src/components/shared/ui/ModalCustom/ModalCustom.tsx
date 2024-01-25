import { AnimatePresence, motion } from "framer-motion";
import React, { Fragment, useMemo } from "react";
import Image from "next/image";
import ButtonCustom from "@/components/shared/ui/ButtonCustom/ButtonCustom";
import Backdrop from "./Backdrop";

const dropIn = {
	hidden: {
		y: "-100vh",
		opacity: 0,
	},
	visible: {
		y: "0",
		opacity: 1,
		transition: {
			duration: 0.1,
			type: "spring",
			damping: 35,
			stiffness: 500,
		},
	},
	exit: {
		y: "100vh",
		opacity: 0,
	},
};

type PropsType = {
	handleClose: () => void;
	isOpen: boolean;
	isLoadingBtnOk?: boolean;
	onConfirm?: () => void;
	variant?: string;
	text?: string;
	textBtnOk?: string;
	textHeader?: string;
	classes?: string;
	isBottom?: boolean;
	children?: JSX.Element | null;
	childrenBottom?: JSX.Element;
};

const ModalCustom = (props: PropsType): JSX.Element => {
	const {
		variant,
		handleClose,
		textBtnOk,
		isLoadingBtnOk = false,
		onConfirm,
		classes,
		isOpen,
		text,
		textHeader,
		isBottom = true,
		children,
		childrenBottom,
	} = props;

	const variants = useMemo(() => {
		const res = {
			styles: "h-[90vh] w-[90%]",
			stylesBackdrop: "z-20",
			bottom: <div />,
		};
		if (variant === "confirm") {
			res.styles = "w-[400px] min-h-[200px]";
			res.stylesBackdrop = "z-30";
			res.bottom = (
				<>
					<ButtonCustom
						color="danger"
						variant="light"
						size="xl"
						className="rounded-lg"
						onClick={handleClose}
					>
						Отмена
					</ButtonCustom>
					<ButtonCustom
						colorTheme="primary"
						size="xl"
						className="rounded-lg"
						onClick={onConfirm}
						isLoading={isLoadingBtnOk}
					>
						{textBtnOk}
					</ButtonCustom>
				</>
			);
		}
		if (variant === "info") {
			res.styles = "w-[400px] min-h-[200px]";
			res.stylesBackdrop = "z-40";
			res.bottom = (
				<ButtonCustom
					colorTheme="primary"
					size="xl"
					className="rounded-lg"
					onClick={handleClose}
				>
					{textBtnOk}
				</ButtonCustom>
			);
		}
		if (childrenBottom) {
			res.bottom = childrenBottom;
		}
		return res;
	}, [variant, textBtnOk, childrenBottom, handleClose]);

	return (
		<AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
			{isOpen && (
				<Backdrop onClick={handleClose} classes={variants.stylesBackdrop}>
					<motion.div
						onClick={(e) => e.stopPropagation()}
						className={`${variants.styles} max-w-[1030px] max-h-[1150px] m-auto p-[32px] rounded-[21px] flex flex-col overflow-hidden shadow-lichiShadow justify-between bg-white ${classes}`}
						variants={dropIn}
						initial="hidden"
						animate="visible"
						exit="exit"
					>
						<div className="absolute top-[35px] right-[35px] cursor-pointer">
							<Image
								className="cursor-pointer"
								src="/images/icons/cancel-icon.svg"
								width={22}
								height={22}
								alt="close"
								onClick={handleClose}
							/>
						</div>
						{textHeader && (
							<div className="text-[18px] font-medium mb-5">{textHeader}</div>
						)}
						{text && <div>{text}</div>}
						{!!children && <div className="flex-grow">{children}</div>}
						{isBottom && (
							<div
								aria-label="modal-bottom"
								className="mt-5 self-end flex items-center gap-3"
							>
								{variants.bottom}
							</div>
						)}
					</motion.div>
				</Backdrop>
			)}
		</AnimatePresence>
	);
};

export default ModalCustom;
