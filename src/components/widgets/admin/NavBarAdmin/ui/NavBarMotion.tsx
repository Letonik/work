"use client";

import React, { Fragment, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAppDispatch } from "@/components/shared/hooks/useAppDispatch";
import {
	CountStatutes,
	getCountStatusesAction,
	getCountStatusesReaction,
} from "@/components/entities/Reaction";
import { Dropdown } from "@/components/features/Dropdown";
import {
	Tab,
	TabsCollapsed,
} from "@/components/widgets/admin/NavBarAdmin/types/types";
import InnerDropdownTab from "./InnerDropdownTab";
import TabCollapsed from "./TabCollapsed";
import cls from "./NavBarAdmin.module.scss";

const navVariants = {
	open: { width: 309, transition: { duration: 0.4 } },
	closed: { width: 123, transition: { duration: 0.4 } },
};

const collapseButtonVariants = {
	open: {
		x: 0,
		rotate: 0,
		transition: { duration: 0.4 },
	},
	closed: {
		x: 32,
		rotate: 180,
		transition: { duration: 0.4 },
	},
};

const tabsOpen = {
	initial: { x: -257 },
	open: { x: 0 },
	closed: { x: -257 },
};

const tabsClose = {
	initial: { x: -100 },
	open: { x: 0 },
	closed: { x: -100 },
};

type PropsType = {
	tabsCollapsed: TabsCollapsed[];
	tabs: Tab[];
};

const NavBarMotion = (props: PropsType): JSX.Element => {
	const { tabsCollapsed, tabs } = props;
	const [isOpen, setOpen] = useState<boolean>(true);

	const statusesCount = useSelector(getCountStatusesReaction);

	const changeOpen = (): void => setOpen((prevState) => !prevState);

	const dispatch = useAppDispatch();

	const pathname = usePathname();

	const getActive = (route: string) => {
		return pathname === route ? "bg-default700" : "";
	};

	const tabsCloseNewStructure = useMemo(() => {
		const res = {
			icon: tabs[0].icon,
			tabs: [] as Tab[],
		};
		tabs.forEach((item) => {
			const { route, name } = item;
			res.tabs.push({ route, name });
		});

		return res;
	}, [tabs]);

	const tabsWithReactionsCount = useMemo(() => {
		return tabsCollapsed.map((item) => {
			if (item.name === "Отклики") {
				return {
					...item,
					tabs: item.tabs.map((tabItem) => ({
						...tabItem,
						count:
							statusesCount[
								tabItem.route.split("/").pop() as keyof CountStatutes
							],
					})),
				};
			}
			return item;
		});
	}, [statusesCount]);

	useEffect(() => {
		dispatch(getCountStatusesAction());
	}, []);

	return (
		<motion.div
			initial="open"
			animate={isOpen ? "open" : "closed"}
			variants={navVariants}
			className={cls.navBar}
		>
			<div className={cls.header}>
				<Image
					src="/images/logo.png"
					width={43}
					height={43}
					alt="Picture of the author"
				/>
				<motion.div
					className={cls.buttonCollapsedNavBar}
					onClick={changeOpen}
					variants={collapseButtonVariants}
				>
					<Image
						src="/images/icons/arrow-right.png"
						width={12}
						height={10}
						alt="arrow"
					/>
				</motion.div>
			</div>
			<AnimatePresence initial={false} mode="wait">
				{isOpen ? (
					<div className={cls.tabsContainer}>
						<motion.div
							key={0}
							initial="initial"
							animate="open"
							exit="closed"
							variants={tabsOpen}
							className={`${cls.tabs} overflow-hidden`}
							transition={{ x: { duration: 0.3, ease: "easeInOut" } }}
						>
							<div className={cls.tabsOpen}>
								<div className="mb-[70px] px-[5px]">
									{tabsWithReactionsCount.map((group, key) => (
										<Fragment key={key}>
											<Dropdown title={group.name} icon={group.icon}>
												<div className={cls.dropdownContainer}>
													{group.tabs.map((tab) => (
														<Fragment key={tab.route}>
															<InnerDropdownTab tab={tab} />
														</Fragment>
													))}
												</div>
											</Dropdown>
										</Fragment>
									))}
								</div>
								<div>
									{tabs.map((tab, key) => (
										<Link
											className={`${cls.tabItem} ${getActive(tab.route)}`}
											key={key}
											href={tab.route}
										>
											{tab.icon && (
												<div className={`${cls.icons} ${cls.iconsOpen}`}>
													{tab.icon}
												</div>
											)}
											<div className={cls.tabName}>{tab.name}</div>
										</Link>
									))}
								</div>
							</div>
						</motion.div>
					</div>
				) : (
					<motion.div
						key={1}
						initial="initial"
						animate="open"
						exit="closed"
						variants={tabsClose}
						transition={{ x: { duration: 0.2 } }}
					>
						{tabsCollapsed.map((group, key) => (
							<Fragment key={key}>
								{group.name === "Отклики" ? (
									<TabCollapsed
										icon={group.icon}
										tabs={group.tabs}
										count={statusesCount.all}
									/>
								) : (
									<TabCollapsed icon={group.icon} tabs={group.tabs} />
								)}
							</Fragment>
						))}
						<TabCollapsed
							icon={tabsCloseNewStructure.icon as JSX.Element}
							tabs={tabsCloseNewStructure.tabs}
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
};

export default NavBarMotion;
