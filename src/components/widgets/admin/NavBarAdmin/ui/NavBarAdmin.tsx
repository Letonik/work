"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { tabsCollapsedList, tabsList } from "../const/tabs";
import { getTitle } from "../const/titles";
import NavBarMotion from "./NavBarMotion";
import cls from "./NavBarAdmin.module.scss";

type NavBarAdminType = {
	children: JSX.Element;
};

const NavBarAdmin = (props: NavBarAdminType): JSX.Element => {
	const { children } = props;

	const pathname = usePathname();

	return (
		<div className={cls.NavBarAdmin}>
			<NavBarMotion tabsCollapsed={tabsCollapsedList} tabs={tabsList} />
			<div className={cls.pageWrapper}>
				<div className={cls.title}>{getTitle(pathname)}</div>
				{children}
			</div>
		</div>
	);
};

export default NavBarAdmin;
