import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tab } from "../types/types";
import cls from "./InnerDropdownTab.module.scss";

type PropsType = {
	tab: Tab;
};

const InnerDropdownTab = (props: PropsType): JSX.Element => {
	const { tab } = props;

	const pathname = usePathname();

	const getActive = (route: string) => {
		return pathname === route ? "bg-default700" : "";
	};

	const getCount = (count: number): string => {
		if (count > 100) {
			return "+100";
		}
		return count.toString();
	};

	return (
		<div className={cls.InnerDropdownTab}>
			<div className={cls.container}>
				<Link
					href={tab.route}
					className={`${cls.textWrapper} ${getActive(tab.route)}`}
				>
					<span className="flex items-center gap-[12px]">
						{!!tab.icon && tab.icon}
						{tab.name}
					</span>
					{!!tab.count && (
						<span className="bg-danger500 rounded-full text-white text-xxs px-1 flex justify-center min-w-[25px]">
							{getCount(tab.count)}
						</span>
					)}
				</Link>
			</div>
		</div>
	);
};

export default InnerDropdownTab;
