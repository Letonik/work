"use client";

import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import { WrapperComponent } from "@/components/shared/ui/WrapperComponent";
import { ItemFormLayout } from "@/components/shared/ui/ItemFormLayout";
import { useAppDispatch } from "@/components/shared/hooks/useAppDispatch";
import {
	createVacancyAction,
	getIsLoadingCreateVacancy,
	getIsLoadingGetOneVacancy,
	getVacancyDataVacancy,
	getVacancyOneAction,
	updateVacancyAction,
	vacancyActions,
} from "@/components/entities/Vacancy";
import InputCustom from "@/components/shared/ui/InputCustom/InputCustom";
import SelectCustom from "@/components/shared/ui/SelectCustom/SelectCustom";
import { Button, Radio, RadioGroup, SelectItem } from "@nextui-org/react";
import { useErrorHook } from "@/components/widgets/admin/vacancy/VacancyForm/lib/useErrorHook";
import Editor from "@/components/widgets/admin/Editor";
import { departments } from "@/components/shared/const/departments";
import { cities } from "@/components/shared/const/cities";
import { countries } from "@/components/shared/const/countries";
import { currencies } from "@/components/shared/const/currencies";
import { experience } from "@/components/shared/const/experience";
import cls from "./CreateVacancyForm.module.scss";

type PropsType = {
	isEdit?: boolean;
	isCopy?: boolean;
	paramsId?: string;
};

const VacancyForm = (props: PropsType): JSX.Element => {
	const { isEdit, isCopy, paramsId } = props;

	const isLoadingCreate = useSelector(getIsLoadingCreateVacancy);
	const isLoadingGetOne = useSelector(getIsLoadingGetOneVacancy);
	const vacancyData = useSelector(getVacancyDataVacancy);

	const { checkErrors, resetErrorField, errors } = useErrorHook();

	const dispatch = useAppDispatch();

	const changeValue = (key: string, value: any) => {
		if (value && errors.includes(key)) resetErrorField(key);
		dispatch(vacancyActions.setVacancyValue({ key, value }));
	};

	const editor = useMemo(() => {
		if (
			vacancyData.descriptionJson ||
			(!isEdit && !isCopy && !vacancyData.descriptionJson)
		) {
			return (
				<Editor
					data={vacancyData.descriptionJson}
					onChange={(val: any) => changeValue("descriptionJson", val)}
					holder="editorjs-container"
				/>
			);
		}
		return "";
	}, [vacancyData.descriptionJson, isEdit, isCopy]);

	const sendData = () => {
		if (!checkErrors(Object.entries(vacancyData))) {
			if (isEdit) {
				if (paramsId !== null)
					dispatch(updateVacancyAction(paramsId as string));
			} else {
				dispatch(createVacancyAction());
			}
		}
	};

	useEffect(() => {
		if ((isEdit || isCopy) && paramsId) dispatch(getVacancyOneAction(paramsId));
	}, [isEdit, isCopy]);

	useEffect(() => {
		return () => dispatch(vacancyActions.clearVacancyData());
	}, []);

	return (
		<WrapperComponent isLoading={isLoadingGetOne}>
			<div className={cls.CreateVacancyForm}>
				<ItemFormLayout title="Название вакансии" isRequired>
					<InputCustom
						value={vacancyData.name}
						onValueChange={(val) => changeValue("name", val)}
						className="max-w-[784px]"
						isError={errors.includes("name")}
						errorMessage="Вы не заполнили поле"
					/>
				</ItemFormLayout>
				<ItemFormLayout title="Привяжите вакансию к отделу" isRequired>
					<SelectCustom
						placeholder="Выберите отдел"
						className="w-[230px]"
						aria-label="Выберите отдел"
						selectedKeys={
							vacancyData.department ? [vacancyData.department] : []
						}
						onChange={(val) => changeValue("department", val.target.value)}
						isError={errors.includes("department")}
						errorMessage="Вы не заполнили поле"
					>
						{Object.values(departments).map((opt) => (
							<SelectItem
								className="rounded-lg"
								key={opt.value}
								value={opt.value}
								startContent={
									<div
										className="h-2 w-2 rounded"
										style={{ background: opt.color }}
									/>
								}
							>
								{opt.name}
							</SelectItem>
						))}
					</SelectCustom>
				</ItemFormLayout>
				<div className="flex gap-[30px]">
					<ItemFormLayout title="Страна" isRequired>
						<SelectCustom
							placeholder="Выберите страну"
							className="w-[230px]"
							aria-label="Выберите отдел"
							selectedKeys={
								vacancyData.country ? [vacancyData.country.toString()] : []
							}
							isError={errors.includes("country")}
							errorMessage="Вы не заполнили поле"
							onChange={(val) => changeValue("country", +val.target.value)}
						>
							{Object.values(countries).map((opt) => (
								<SelectItem
									className="rounded-lg"
									key={opt.value}
									value={opt.value}
								>
									{opt.name}
								</SelectItem>
							))}
						</SelectCustom>
					</ItemFormLayout>
					<ItemFormLayout title="Город" isRequired>
						<SelectCustom
							placeholder="Выберите город"
							className="w-[230px]"
							aria-label="Выберите город"
							selectedKeys={vacancyData.city ? [vacancyData.city] : []}
							isError={errors.includes("city")}
							errorMessage="Вы не заполнили поле"
							onChange={(val) => changeValue("city", val.target.value)}
						>
							{Object.values(cities).map((opt) => (
								<SelectItem
									className="rounded-lg"
									key={opt.value}
									value={opt.value}
								>
									{opt.name}
								</SelectItem>
							))}
						</SelectCustom>
					</ItemFormLayout>
				</div>
				<ItemFormLayout title="Предпологаемый уровень дохода в месяц">
					<div className="flex">
						<InputCustom
							placeholder="от"
							value={
								vacancyData.salary?.min ? vacancyData.salary.min.toString() : ""
							}
							onValueChange={(val) => changeValue("min", +val)}
							type="number"
							className="w-[143px]"
							classNames={{
								inputWrapper: "rounded-r-none border-r-0",
							}}
						/>
						<InputCustom
							placeholder="до"
							value={
								vacancyData.salary?.max ? vacancyData.salary.max.toString() : ""
							}
							onValueChange={(val) => changeValue("max", +val)}
							type="number"
							className="w-[143px]"
							classNames={{
								inputWrapper: "rounded-none border-r-0",
							}}
						/>
						<SelectCustom
							className="w-[68px]"
							classNames={{
								trigger: "rounded-l-none",
							}}
							aria-label="Выберите валюту"
							selectedKeys={[vacancyData.salary?.currency || ""]}
							onChange={(e) => changeValue("currency", e.target.value)}
						>
							{Object.values(currencies).map((opt) => (
								<SelectItem
									className="rounded-lg"
									key={opt.value}
									value={opt.value}
								>
									{opt.name}
								</SelectItem>
							))}
						</SelectCustom>
					</div>
				</ItemFormLayout>
				<ItemFormLayout
					title="Адрес"
					isRequired
					infoText="Укажите адрес, где будет работать будущий сотрудник. Или адрес основного офиса, если предполагается разъездная работа."
				>
					<InputCustom
						className="max-w-[784px]"
						value={vacancyData.address}
						onValueChange={(val) => changeValue("address", val)}
						isError={errors.includes("address")}
						errorMessage="Вы не заполнили поле"
						endContent={
							<Image
								src="/images/icons/search-icon.svg"
								width={18}
								height={18}
								alt="Picture of the author"
							/>
						}
					/>
				</ItemFormLayout>
				<ItemFormLayout title="Опыт работы">
					<RadioGroup
						value={vacancyData.experience}
						onValueChange={(val: string) => changeValue("experience", val)}
					>
						{Object.values(experience).map((opt) => (
							<Radio key={opt.value} value={opt.value}>
								{opt.name}
							</Radio>
						))}
					</RadioGroup>
				</ItemFormLayout>
				<ItemFormLayout title="Описание вакансии" isRequired>
					<div
						className={`${
							errors.includes("descriptionJson") ? cls.editorError : ""
						}`}
					>
						{editor}
					</div>
				</ItemFormLayout>
				<Button
					onClick={sendData}
					className="bg-primary400 text-[15px] text-white rounded-lg px-[24px]"
					isLoading={isLoadingCreate}
				>
					Сохранить
				</Button>
			</div>
		</WrapperComponent>
	);
};

export default VacancyForm;
