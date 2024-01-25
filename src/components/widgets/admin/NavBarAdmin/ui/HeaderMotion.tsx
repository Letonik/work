import React, { useState } from "react";
import { motion } from "framer-motion";
import cls from "@/components/widgets/admin/NavBarAdmin/ui/NavBarAdmin.module.scss";
import Image from "next/image";

const sidebar = {
	open: (height = 1000) => ({
		clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
		transition: {
			type: "spring",
			stiffness: 20,
			restDelta: 2,
		},
	}),
	closed: {
		clipPath: "circle(30px at 40px 40px)",
		transition: {
			delay: 0.5,
			type: "spring",
			stiffness: 400,
			damping: 40,
		},
	},
};

const HeaderMotion = (): JSX.Element => {
	const [isOpen, toggleOpen] = useState(false);
	const containerRef = useRef(null);
	const { height } = useDimensions(containerRef);

	return (
		<div className={cls.header}>
			<Image
				src="/images/logo.png"
				width={43}
				height={43}
				alt="Picture of the author"
			/>
			<div className={cls.buttonCollapsedNavBar} onClick={}>
				{/* 'todo': Заменить иконку (стрелка) */}
				<Image
					src="/images/icons/arrow-right.png"
					width={12}
					height={10}
					alt="Picture of the author"
				/>
			</div>
		</div>
	);
};

export default HeaderMotion;
