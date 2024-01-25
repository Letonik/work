import { motion } from "framer-motion";

type PropsType = {
	onClick: () => void;
	children: JSX.Element;
	classes: string;
};

const Backdrop = (props: PropsType): JSX.Element => {
	const { children, onClick, classes } = props;
	return (
		<motion.div
			onClick={onClick}
			className={`${classes} absolute top-0 left-0 h-full w-full backdrop-blur-[2px] flex items-center justify-center overflow-hidden`}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			{children}
		</motion.div>
	);
};

export default Backdrop;
