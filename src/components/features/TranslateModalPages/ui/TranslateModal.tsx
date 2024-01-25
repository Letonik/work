import React, { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

const variants = {
	enter: (direction: number) => {
		return {
			x: direction > 0 ? 1000 : -1000,
			opacity: 0,
		};
	},
	center: {
		zIndex: 1,
		x: 0,
		opacity: 1,
	},
	exit: (direction: number) => {
		return {
			zIndex: 0,
			x: direction < 0 ? 1000 : -1000,
			opacity: 0,
		};
	},
};

type PropsType = {
	step: string;
	direction: number;
	elems: {
		key: string;
		elem: JSX.Element;
	}[];
};

const TranslateModal = (props: PropsType): JSX.Element => {
	const { elems, step, direction } = props;

	const stepsComponent = useMemo(() => {
		const res: Record<string, JSX.Element> = {};
		elems.forEach((element) => {
			res[element.key] = (
				<motion.div
					key={element.key}
					custom={direction}
					variants={variants}
					initial="enter"
					animate="center"
					exit="exit"
					transition={{
						x: { type: "spring", stiffness: 300, damping: 30 },
						opacity: { duration: 0.3 },
					}}
				>
					{element.elem}
				</motion.div>
			);
		});
		return res;
	}, [step, direction, elems]);

	return (
		<AnimatePresence mode="popLayout" initial={false} custom={direction}>
			{stepsComponent[step]}
		</AnimatePresence>
	);
};

export default TranslateModal;
