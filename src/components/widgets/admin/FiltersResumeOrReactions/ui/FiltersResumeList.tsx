"use client";

import React, { useEffect, useRef, useState } from "react";
import { WrapperComponent } from "@/components/shared/ui/WrapperComponent";
import InputCustom from "@/components/shared/ui/InputCustom/InputCustom";
import Image from "next/image";
import { AutocompleteItem, SelectItem } from "@nextui-org/react";
import SelectCustom from "@/components/shared/ui/SelectCustom/SelectCustom";
import { DatePicker } from "@/components/shared/ui/DatePicker";
import ButtonCustom from "@/components/shared/ui/ButtonCustom/ButtonCustom";
import { useAppDispatch } from "@/components/shared/hooks/useAppDispatch";
import {
	getIsLoadingNamesVacancy,
	getVacancyNamesAction,
	getVacancyNamesVacancy,
} from "@/components/entities/Vacancy";
import { useSelector } from "react-redux";
import { cities } from "@/components/shared/const/cities";
import { usePhoneNumberInput } from "@/components/shared/hooks/usePhoneNumberInput";
import {
	GetUserListActionDataType,
	userActions,
} from "@/components/entities/User";
import SelectAutocompleteCustom from "@/components/shared/ui/SelectAutocompleteCustom/SelectAutocompleteCustom";
import { useDebounce } from "@uidotdev/usehooks";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useInitialValues } from "../lib/useInitialValues";

type Date = {
	dateStart: string;
	dateEnd: string;
};

type PropsType = {
	paramSend: Record<string, boolean> | NonNullable<unknown>;
	page: number;
	isLoadingTable: boolean;
	getListForTable: any;
	setPage: ActionCreatorWithPayload<number, "userSlice/setPage">;
};

const FiltersResumeList = (props: PropsType): JSX.Element => {
	const { paramSend, setPage, page, isLoadingTable, getListForTable } = props;

	const vacancyNames = useSelector(getVacancyNamesVacancy);
	const isLoadingNames = useSelector(getIsLoadingNamesVacancy);

	const initial = useInitialValues();

	const [firstLoadPage, setFirstLoadPage] = useState<boolean>(true);
	const [firstName, setFirstName] = useState<string>(
		initial.firstName as string
	);
	const [lastName, setLastName] = useState<string>(initial.lastName as string);
	const [age, setAge] = useState<string>(initial.age as string);
	const [vacancy, setVacancy] = useState<string>(initial.vacancy as string);
	const [city, setCity] = useState<string>(initial.city as string);
	const [phoneNumber, setPhoneNumber] = useState<string>(
		initial.phoneNumber as string
	);
	const [email, setEmail] = useState<string>(initial.email as string);
	const [dateStart, setDateStart] = useState<string | null>(initial.dateStart);
	const [dateEnd, setDateEnd] = useState<string | null>(initial.dateEnd);

	const changePhoneNumber = usePhoneNumberInput(setPhoneNumber);

	const debouncedVacancy = useDebounce(vacancy, 300);

	const dispatch = useAppDispatch();

	const datePickerRef: React.MutableRefObject<{
		clear: () => void;
	} | null> = useRef(null);

	const getTableList = () => {
		let dataSend: GetUserListActionDataType = { page, ...paramSend };
		if (firstName) dataSend = { ...dataSend, firstName };
		if (lastName) dataSend = { ...dataSend, lastName };
		if (age) dataSend = { ...dataSend, age };
		if (vacancy) dataSend = { ...dataSend, vacancy };
		if (city) dataSend = { ...dataSend, city };
		if (phoneNumber) dataSend = { ...dataSend, phoneNumber };
		if (email) dataSend = { ...dataSend, email };
		if (dateStart) dataSend = { ...dataSend, dateStart };
		if (dateEnd) dataSend = { ...dataSend, dateEnd };
		dispatch(getListForTable(dataSend));
	};

	useEffect(() => {
		setFirstLoadPage(false);
		if (initial.page) dispatch(userActions.setPage(+initial.page));
		if (page !== 1) dispatch(userActions.setPage(1));
		if (page === 1 && !initial.page) getTableList();
	}, []);

	useEffect(() => {
		if (!firstLoadPage) {
			getTableList();
		}
	}, [page, firstLoadPage]);

	const changeDate = (dates: Date) => {
		setDateStart(dates.dateStart);
		setDateEnd(dates.dateEnd);
	};

	const clearDatePicker = () => {
		datePickerRef?.current?.clear();
	};

	const clearFilters = () => {
		clearDatePicker();
		setFirstName("");
		setLastName("");
		setAge("");
		setVacancy("");
		setCity("");
		setPhoneNumber("");
		setEmail("");
		setDateStart(null);
		setDateEnd(null);
		if (page === 1) {
			dispatch(getListForTable({ page: 1 }));
		} else {
			dispatch(setPage(1));
		}
	};

	useEffect(() => {
		dispatch(getVacancyNamesAction({ name: debouncedVacancy }));
	}, [debouncedVacancy]);

	return (
		<WrapperComponent>
			<div className="m-auto">
				<div className="my-5 flex gap-5">
					<InputCustom
						value={firstName}
						onValueChange={(val) => setFirstName(val)}
						placeholder="Введите имя"
						removeLabel={false}
						label="Имя"
					/>
					<InputCustom
						value={lastName}
						onValueChange={(val) => setLastName(val)}
						placeholder="Введите фамилию"
						removeLabel={false}
						label="Фамилия"
					/>
					<InputCustom
						value={age}
						onValueChange={(val) => setAge(val)}
						placeholder="До"
						removeLabel={false}
						type="number"
						label="Возраст"
					/>
					<SelectAutocompleteCustom
						label="Должность"
						placeholder="Найти должность"
						className="autocompleteSelect"
						removeLabel={false}
						isLoading={isLoadingNames}
						defaultSelectedKey={vacancy}
						onInputChange={(val) => setVacancy(val)}
					>
						{vacancyNames.map((name) => (
							<AutocompleteItem className="rounded-lg" key={name} value={name}>
								{name}
							</AutocompleteItem>
						))}
					</SelectAutocompleteCustom>
				</div>
				<div className="my-5 flex gap-5">
					<SelectCustom
						placeholder="Все"
						label="Город"
						className="grow"
						removeLabel={false}
						selectedKeys={city ? [city] : []}
						onChange={(val) => setCity(val.target.value)}
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
					<InputCustom
						type="tel"
						value={phoneNumber}
						onValueChange={(val) => changePhoneNumber(val)}
						placeholder="+7"
						removeLabel={false}
						label="Номер телефона"
					/>
					<InputCustom
						type="email"
						value={email}
						onValueChange={(val) => setEmail(val)}
						placeholder="Введите адрес эл. почты"
						removeLabel={false}
						label="Email"
					/>
					<DatePicker
						lang="ru"
						range
						onChange={(arg) => changeDate(arg as Date)}
						ref={datePickerRef}
					/>
				</div>
				<div className="flex justify-end gap-2">
					<ButtonCustom
						startContent={
							<Image
								src="/images/icons/cancel-icon.svg"
								width={20}
								height={20}
								style={{ marginRight: "-5px" }}
								alt="Cancel"
							/>
						}
						colorTheme="secondary"
						size="xl"
						className="rounded-lg"
						onClick={clearFilters}
					>
						Очистить
					</ButtonCustom>
					<ButtonCustom
						startContent={
							<Image
								src="/images/icons/search-icon.svg"
								width={14}
								height={14}
								alt="Seach"
							/>
						}
						colorTheme="primary"
						size="xl"
						className="rounded-lg"
						onClick={getTableList}
						isLoading={isLoadingTable}
					>
						Поиск
					</ButtonCustom>
				</div>
			</div>
		</WrapperComponent>
	);
};

export default FiltersResumeList;
