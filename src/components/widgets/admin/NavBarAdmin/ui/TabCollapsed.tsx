import React, { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Tab } from "@/components/widgets/admin/NavBarAdmin/types/types";
import { Badge } from "@nextui-org/react";
import cls from "./NavBarAdmin.module.scss";

type PropsType = {
	tabs: Tab[];
	icon: JSX.Element;
	count?: number;
};

const TabCollapsed = (props: PropsType): JSX.Element => {
	const { icon, tabs, count } = props;
	const [isHovered, setIsHovered] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const pathname = usePathname();

	const activeRoute = useMemo(() => {
		return tabs.filter((item) => item.route === pathname);
	}, [pathname, tabs]);

	const handleMouseEnter = () => {
		setIsHovered(true);
		setIsOpen(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	return (
		<div
			className="h-[40px] w-[60px] relative mt-[50px] cursor-context-menu"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<Badge
				content={count}
				color="danger"
				showOutline={false}
				isInvisible={!count}
			>
				<div
					className={`${cls.icons} ${cls.iconsClose} ${
						activeRoute.length ? cls.active : ""
					} ml-[2px]`}
				>
					{icon}
				</div>
			</Badge>
			{isHovered && isOpen && (
				<AnimatePresence>
					<motion.div
						className="absolute min-w-[230px] top-0 left-full rounded-lg shadow-lichiShadow bg-white p-1 flex flex-col z-50"
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: 20 }}
						transition={{ duration: 0.2 }}
					>
						{tabs.map((tab) => (
							<Link
								key={tab.route}
								href={tab.route}
								className={`h-[30px] flex items-center px-2 hover:bg-default100 rounded-lg ${
									activeRoute[0]?.route === tab.route ? "bg-danger50" : ""
								}`}
								onClick={handleClose}
							>
								{tab.name}
							</Link>
						))}
					</motion.div>
				</AnimatePresence>
			)}
		</div>
	);
};

export default TabCollapsed;
