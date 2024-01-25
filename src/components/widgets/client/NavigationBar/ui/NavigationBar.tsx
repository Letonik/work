/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-ts-comment */

"use client";

import React, { memo, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
	DropdownItem,
	DropdownTrigger,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
} from "@nextui-org/react";
import Link from "next/link";
import DropdownMenuCustom from "@/components/shared/ui/DropdownCustom/DropdownMenuCustom";
import DropdownCustom from "@/components/shared/ui/DropdownCustom/DropdownCustom";
import cls from "./NavigationBar.module.scss";
import ChevronDownIcon from "@/components/shared/icons/ChevronDown";
import ButtonCustom from "@/components/shared/ui/ButtonCustom/ButtonCustom";

const NavigationBar: React.FC = memo(() => {
	const [mainClassHeader, setMainClassHeader] = useState(cls.initial);

	// eslint-disable-next-line consistent-return
	useEffect(() => {
		if (typeof window !== "undefined") {
			const handleScroll = () => {
				if (window.pageYOffset) setMainClassHeader(cls.scroll);
				else setMainClassHeader(cls.initial);
			};

			window.addEventListener("scroll", handleScroll);

			return () => {
				window.removeEventListener("scroll", handleScroll);
			};
		}
	}, []);

	const tabs = [
		{ route: "/home", name: "test" },
		{ route: "/", name: "test2" },
	];

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<Navbar
			isMenuOpen={isMenuOpen}
			onMenuOpenChange={setIsMenuOpen}
			className={`${cls.nav} ${mainClassHeader}`}
			classNames={{
				item: ["flex", "relative", "h-full", "items-center"],
				base: "h-full fixed",
				wrapper: "w-full max-w-[1560px] h-[40px] px-[100px]",
				toggleIcon: "after:bg-[#fff] before:bg-[#fff]",
			}}
		>
			<NavbarMenuToggle
				aria-label={isMenuOpen ? "Close menu" : "Open menu"}
				className="sm:hidden color-default900"
			/>
			<NavbarBrand className="max-w-[120px] mr-[40px]">
				<span className="text-[22px] text-[#c61a1a] font-medium mr-1">
					LICHI
				</span>
				<span className="text-[23px] text-default-900">WORK</span>
			</NavbarBrand>
			<NavbarMenu className="z-[999]">
				{tabs?.map((item, index) => (
					<NavbarMenuItem key={`${item}-${index}`}>
						<Link
							color={index === 0 ? "primary" : "danger"}
							className="w-full"
							href={item.route}
						>
							{item.name}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
			<NavbarContent className="hidden sm:flex gap-[40px]" justify="start">
				<NavbarItem>
					<DropdownCustom placement="bottom">
						<DropdownTrigger>
							<div className="flex items-center gap-2 cursor-pointer">
								<span className="text-xxl font-normal">Команда</span>
								<ChevronDownIcon color="#18181b" />
							</div>
						</DropdownTrigger>
						<DropdownMenuCustom aria-label="Departments">
							<DropdownItem key="retail">Розница</DropdownItem>
							<DropdownItem key="stoke">Склад</DropdownItem>
							<DropdownItem key="it">IT отдел</DropdownItem>
							<DropdownItem key="office">Офис</DropdownItem>
							<DropdownItem key="photoStudio">Фотостудия</DropdownItem>
						</DropdownMenuCustom>
					</DropdownCustom>
				</NavbarItem>
				<NavbarItem isActive>
					<Link href="#" aria-current="page" className="text-xxl font-normal">
						Жизнь в Lichi
					</Link>
				</NavbarItem>
			</NavbarContent>
			<NavbarContent className="hidden sm:flex gap-[40px]" justify="end">
				<NavbarItem isActive>
					<Link href="#" aria-current="page" className="text-xxl font-normal">
						Профиль
					</Link>
				</NavbarItem>
				<NavbarItem>
					<DropdownCustom placement="bottom">
						<DropdownTrigger>
							<div className="flex items-center gap-2 cursor-pointer">
								<span className="text-xxl font-normal">Язык</span>
								<ChevronDownIcon color="#18181b" />
							</div>
						</DropdownTrigger>
						<DropdownMenuCustom aria-label="Language">
							<DropdownItem key="retail">Русский</DropdownItem>
							<DropdownItem key="stoke">Английский</DropdownItem>
						</DropdownMenuCustom>
					</DropdownCustom>
				</NavbarItem>
				<NavbarItem>
					<ButtonCustom
						text="normalUppercase"
						colorTheme="black"
						size="xxl"
						className="rounded"
						type="button"
					>
						Вакансии
					</ButtonCustom>
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
});

export default NavigationBar;
