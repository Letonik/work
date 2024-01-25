import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { AutocompleteItem, Button, SelectItem } from "@nextui-org/react";
import InputCustom from "@/components/shared/ui/InputCustom/InputCustom";
import { ItemFormLayout } from "@/components/shared/ui/ItemFormLayout";
import SelectAutocompleteCustom from "@/components/shared/ui/SelectAutocompleteCustom/SelectAutocompleteCustom";
import { WrapperComponent } from "@/components/shared/ui/WrapperComponent";
import { useAppDispatch } from "@/components/shared/hooks/useAppDispatch";
import {
	createApplicantAction,
	getApplicantDataUser,
	getIsLoadingCreate,
	userActions,
} from "@/components/entities/User";
import { ApplicantData } from "@/components/entities/User/model/types/UserSchema";
import { DatePicker } from "@/components/shared/ui/DatePicker";
import SelectCustom from "@/components/shared/ui/SelectCustom/SelectCustom";
import TextareaCustom from "@/components/shared/ui/TextareaCustom/TextareaCustom";
import { useDebounce } from "@uidotdev/usehooks";
import {
	getIsLoadingNamesVacancy,
	getVacancyNamesAction,
	getVacancyNamesVacancy,
} from "@/components/entities/Vacancy";
import { STATUSES } from "@/components/shared/const/statuses";
import { useErrorHook } from "../lib/useHookError";

const AddNewUserForm = (): JSX.Element => {
	const applicantData = useSelector(getApplicantDataUser);
	const vacancyNames = useSelector(getVacancyNamesVacancy);
	const isLoadingNames = useSelector(getIsLoadingNamesVacancy);
	const isLoadingCreate = useSelector(getIsLoadingCreate);

	const { checkErrors, resetErrorField, errors } = useErrorHook();

	const dispatch = useAppDispatch();

	const debouncedVacancy = useDebounce(applicantData.vacancy, 300);
	const debouncedCity = useDebounce(applicantData.city, 300);

	const changeValue = (key: keyof ApplicantData, value: any) => {
		if (value && errors.includes(key)) resetErrorField(key);
		dispatch(userActions.setApplicantDataValue({ key, value }));
	};

	const sendData = () => {
		if (!checkErrors(Object.entries(applicantData))) {
			dispatch(createApplicantAction());
		}
	};

	useEffect(() => {
		dispatch(
			getVacancyNamesAction({ name: debouncedVacancy, city: debouncedCity })
		);
	}, [debouncedVacancy, debouncedCity]);

	return (
		<WrapperComponent>
			<>
				<ItemFormLayout title="Личные данные" isRequired>
					<div className="max-w-[354px] relative flex flex-col gap-3">
						<InputCustom
							value={applicantData.firstName}
							onValueChange={(val) => changeValue("firstName", val)}
							placeholder="Введите имя"
							removeLabel={false}
							label="Имя"
							isError={errors.includes("firstName")}
							errorMessage="Вы не заполнили поле"
						/>
						<InputCustom
							value={applicantData.lastName}
							onValueChange={(val) => changeValue("lastName", val)}
							placeholder="Введите фамилию"
							removeLabel={false}
							label="Фамилия"
							isError={errors.includes("lastName")}
							errorMessage="Вы не заполнили поле"
						/>
						<InputCustom
							value={applicantData.middleName}
							onValueChange={(val) => changeValue("middleName", val)}
							placeholder="Введите отчество"
							removeLabel={false}
							label="Отчество"
							isError={errors.includes("middleName")}
							errorMessage="Вы не заполнили поле"
						/>
						<DatePicker
							lang="ru"
							onChange={(val) => changeValue("birthDay", val.date)}
						/>
					</div>
				</ItemFormLayout>
				<ItemFormLayout title="Контактные данные" isRequired>
					<div className="max-w-[354px] flex flex-col gap-3">
						<InputCustom
							type="tel"
							value={applicantData.phoneNumber}
							onValueChange={(val) => changeValue("phoneNumber", val)}
							placeholder="+7"
							removeLabel={false}
							label="Номер телефона"
							isError={errors.includes("phoneNumber")}
							errorMessage="Вы не заполнили поле"
						/>
						<InputCustom
							type="email"
							value={applicantData.email}
							onValueChange={(val) => changeValue("email", val)}
							placeholder="Введите адрес эл. почты"
							removeLabel={false}
							label="Email"
							isError={errors.includes("email")}
							errorMessage="Вы не заполнили поле"
						/>
					</div>
				</ItemFormLayout>
				<ItemFormLayout title="Город" isRequired>
					<div className="max-w-[354px] flex flex-col gap-3">
						<InputCustom
							aria-label="city"
							value={applicantData.city}
							onValueChange={(val) => changeValue("city", val)}
						/>
					</div>
				</ItemFormLayout>
				<ItemFormLayout title="Прикрепить должность" isRequired>
					<div className="max-w-[354px] flex flex-col gap-3">
						<SelectAutocompleteCustom
							aria-label="vacancy"
							className="autocompleteSelect autocompleteSelectWithoutLabel"
							isError={errors.includes("vacancy")}
							errorMessage="Вы не заполнили поле"
							isLoading={isLoadingNames}
							defaultSelectedKey={applicantData.vacancy}
							onInputChange={(val) => changeValue("vacancy", val)}
						>
							{vacancyNames.map((name) => (
								<AutocompleteItem
									className="rounded-lg"
									key={name}
									value={name}
								>
									{name}
								</AutocompleteItem>
							))}
						</SelectAutocompleteCustom>
					</div>
				</ItemFormLayout>
				<ItemFormLayout title="Статус" isRequired>
					<div className="max-w-[354px] flex flex-col gap-3">
						<SelectCustom
							placeholder="Выберите статус"
							removeLabel={false}
							classNames={{
								value: "group-data-[has-value=true]:text-default300",
							}}
							label="Статус"
							selectedKeys={applicantData.status ? [applicantData.status] : []}
							onChange={(val) => {
								changeValue("status", val.target.value);
							}}
						>
							{Object.values(STATUSES).map((opt) => (
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
				<ItemFormLayout title="Добавить комментарий" isRequired>
					<div className="max-w-[783px] flex flex-col gap-3">
						<TextareaCustom
							aria-label="comment"
							classNames={{ inputWrapper: "min-h-[329px]" }}
							value={applicantData.comment}
							onValueChange={(val) => changeValue("comment", val)}
						/>
					</div>
				</ItemFormLayout>
				<Button
					onClick={sendData}
					className="bg-primary400 text-[15px] text-white rounded-lg px-[24px]"
					isLoading={isLoadingCreate}
				>
					Сохранить
				</Button>
			</>
		</WrapperComponent>
	);
};

export default AddNewUserForm;
