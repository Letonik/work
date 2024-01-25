import PlusIcon from "@/components/shared/icons/PlusIcon";
import React from "react";
import UsersIcon from "@/components/shared/icons/UsersIcon";
import ReactionsIcon from "@/components/shared/icons/ReactionsIcon";
import DocumentIcon from "@/components/shared/icons/DocumentIcon";
import LikeIcon from "@/components/shared/icons/LikeIcon";

export const tabsCollapsedList = [
	{
		name: "Резюме",
		icon: <UsersIcon />,
		tabs: [
			{
				name: "Все",
				route: "/admin/resume/all",
			},
			{
				name: "Избранное",
				route: "/admin/resume/like",
				icon: <LikeIcon />,
			},
			{
				name: "Черный список",
				route: "/admin/resume/bl",
			},
		],
	},
	{
		name: "Отклики",
		icon: <ReactionsIcon />,
		tabs: [
			{
				name: "Все",
				route: "/admin/reaction/all",
			},
			{
				name: "Заявки",
				route: "/admin/reaction/application",
			},
			{
				name: "На рассмотрении",
				route: "/admin/reaction/consideration",
			},
			{
				name: "Собеседование",
				route: "/admin/reaction/interview",
			},
			{
				name: "Сотрудники",
				route: "/admin/reaction/employee",
			},
		],
	},
	{
		name: "Вакансии",
		icon: <DocumentIcon />,
		tabs: [
			{
				name: "Активные",
				route: "/admin/vacancy/active",
			},
			{
				name: "Архив",
				route: "/admin/vacancy/archive",
			},
		],
	},
];

export const tabsList = [
	{
		name: "Добавить соискателя",
		route: "/admin/resume/add_user",
		icon: <PlusIcon />,
	},
	{
		name: "Создать вакансию",
		route: "/admin/vacancy/create",
		icon: <PlusIcon />,
	},
];
