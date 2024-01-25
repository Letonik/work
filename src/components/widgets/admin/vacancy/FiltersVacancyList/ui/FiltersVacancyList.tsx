"use client";

import React, { useEffect, useRef, useState } from "react";
import { WrapperComponent } from "@/components/shared/ui/WrapperComponent";
import InputCustom from "@/components/shared/ui/InputCustom/InputCustom";
import Image from "next/image";
import { SelectItem } from "@nextui-org/react";
import SelectCustom from "@/components/shared/ui/SelectCustom/SelectCustom";
import { DatePicker } from "@/components/shared/ui/DatePicker";
import ButtonCustom from "@/components/shared/ui/ButtonCustom/ButtonCustom";
import { useAppDispatch } from "@/components/shared/hooks/useAppDispatch";
import {
	getIsLoadingVacancy,
	getPageVacancy,
	getVacancyListAction,
	GetVacancyListActionDataType,
	vacancyActions,
} from "@/components/entities/Vacancy";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { cities } from "@/components/shared/const/cities";
import { departments } from "@/components/shared/const/departments";

type Date = {
	dateStart: string;
	dateEnd: string;
};

type PropsType = {
	isActive: boolean;
};

const FiltersVacancyList = (props: PropsType): JSX.Element => {
	const { isActive } = props;

	const datePickerRef: React.MutableRefObject<{
		clear: () => void;
	} | null> = useRef(null);

	const searchParams = useSearchParams();

	const initialName = searchParams.get("name") ? searchParams.get("name") : "";
	const initialCity = searchParams.get("city") ? searchParams.get("city") : "";
	const initialDeparment = searchParams.get("department")
		? searchParams.get("department")
		: "";
	const initialDateStart = searchParams.get("dateStart");
	const initialDateEnd = searchParams.get("dateEnd");
	const initialPage = searchParams.get("page");

	const [firstLoadPage, setFirstLoadPage] = useState<boolean>(true);
	const [name, setName] = useState<string>(initialName as string);
	const [city, setCity] = useState<string>(initialCity as string);
	const [department, setDepartment] = useState<string>(
		initialDeparment as string
	);
	const [dateStart, setDateStart] = useState<string | null>(initialDateStart);
	const [dateEnd, setDateEnd] = useState<string | null>(initialDateEnd);

	const dispatch = useAppDispatch();

	const page = useSelector(getPageVacancy);
	const isLoadingTable = useSelector(getIsLoadingVacancy);

	const getVacancyList = () => {
		let dataSend: GetVacancyListActionDataType = { isActive, page };
		if (name) dataSend = { ...dataSend, name };
		if (city) dataSend = { ...dataSend, city };
		if (department) dataSend = { ...dataSend, department };
		if (dateStart) dataSend = { ...dataSend, dateStart };
		if (dateEnd) dataSend = { ...dataSend, dateEnd };
		dispatch(getVacancyListAction(dataSend));
	};

	useEffect(() => {
		setFirstLoadPage(false);
		if (initialPage) dispatch(vacancyActions.setPage(+initialPage));
		if (page !== 1) dispatch(vacancyActions.setPage(1));
		if (page === 1 && !initialPage) getVacancyList();
	}, []);

	useEffect(() => {
		if (!firstLoadPage) getVacancyList();
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
		setName("");
		setCity("");
		setDepartment("");
		setDateStart(null);
		setDateEnd(null);
		if (page === 1) {
			dispatch(getVacancyListAction({ isActive, page: 1 }));
		} else {
			dispatch(vacancyActions.setPage(1));
		}
	};

	return (
		<WrapperComponent>
			<div className="m-auto">
				<InputCustom
					value={name}
					onValueChange={(val) => setName(val)}
					placeholder="Название вакансии"
					endContent={
						<Image
							src="/images/icons/search-icon.svg"
							width={18}
							height={18}
							alt="Seach"
						/>
					}
				/>
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
					<SelectCustom
						placeholder="Все"
						label="Отдел"
						className="grow"
						removeLabel={false}
						selectedKeys={department ? [department] : []}
						onChange={(val) => setDepartment(val.target.value)}
					>
						{Object.values(departments).map((opt) => (
							<SelectItem
								className="rounded-lg"
								key={opt.value}
								value={opt.value}
							>
								{opt.name}
							</SelectItem>
						))}
					</SelectCustom>
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
						onClick={getVacancyList}
						isLoading={isLoadingTable}
					>
						Поиск
					</ButtonCustom>
				</div>
			</div>
		</WrapperComponent>
	);
};

export default FiltersVacancyList;
