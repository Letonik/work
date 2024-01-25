import React, { useEffect, useMemo, useState } from "react";
import ChipCustom from "@/components/shared/ui/ChipCustom/ChipCustom";
import IconWrapper from "@/components/shared/ui/IconWrapper/IconWrapper";
import ButtonCustom from "@/components/shared/ui/ButtonCustom/ButtonCustom";
import {
	getVacancyDataVacancy,
	getVacancyOneAction,
	vacancyActions,
	VacancyDataType,
} from "@/components/entities/Vacancy";
import { cities } from "@/components/shared/const/cities";
import { countries } from "@/components/shared/const/countries";
import { currencies } from "@/components/shared/const/currencies";
import { experience } from "@/components/shared/const/experience";
import EditorParserComponent from "@/components/shared/ui/EditorParserComponent/EditorParserComponent";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import {
	getVacancyIdTM,
	translateModalActions,
} from "@/components/entities/TranslateModal";
import { useAppDispatch } from "@/components/shared/hooks/useAppDispatch";
import { ModalsEditVacancy } from "@/components/features/adminCards/VacancyInfo";
import TitleCard from "../../TitleCard/ui/TitleCard";

const VacancyInfo = (): JSX.Element => {
	const vacancyId = useSelector(getVacancyIdTM);
	const vacancy = useSelector(getVacancyDataVacancy);

	const [isOpenPublish, setOpenPublish] = useState<boolean>(false);
	const [isOpenDelete, setOpenDelete] = useState<boolean>(false);

	const router = useRouter();

	const dispatch = useAppDispatch();

	const onOpenPublish = () => setOpenPublish(true);
	const onOpenDelete = () => setOpenDelete(true);

	const onClosePublish = () => setOpenPublish(false);
	const onCloseDelete = () => setOpenDelete(false);
	const onPublishModal = (vacancyValue: VacancyDataType) => {
		dispatch(vacancyActions.setVacancy(vacancyValue));

		onOpenPublish();
	};
	const onDeleteModal = (vacancyValue: VacancyDataType) => {
		dispatch(vacancyActions.setVacancy(vacancyValue));
		onOpenDelete();
	};

	const goToEditPage = (id: string) => {
		router.push(`/admin/vacancy/edit/${id}`);
	};

	useEffect(() => {
		if (vacancyId) dispatch(getVacancyOneAction(vacancyId));
	}, [vacancyId]);

	const values = useMemo(() => {
		const res = {
			city: vacancy.city ? cities[vacancy.city].name : "",
			country: vacancy.country ? countries[vacancy.country].name : "",
			department: vacancy.department ? (
				<ChipCustom dep={vacancy.department} />
			) : (
				<div />
			),
			salary: "",
			experience: vacancy.experience ? experience[vacancy.experience].name : "",
			descriptionJson: vacancy.descriptionJson && (
				<EditorParserComponent data={vacancy.descriptionJson} />
			),
			heightModal: vacancy.isActive
				? "h-[calc(90vh-110px)]"
				: "h-[calc(90vh-160px)]",
			tooltipDelete: vacancy.isActive ? "Перевести в архив" : "Удалить",
		};
		if (vacancy.salary?.min) {
			res.salary = `от ${vacancy.salary?.min.toLocaleString("ru-RU")} `;
		}
		if (vacancy.salary?.max) {
			res.salary = `до ${vacancy.salary?.max.toLocaleString("ru-RU")} `;
		}
		if (res.salary.length && vacancy.salary?.currency) {
			res.salary += currencies[vacancy.salary.currency].name;
		} else {
			res.salary = "Не указано";
		}
		return res;
	}, [vacancy]);

	const goToCopyPage = (id: string) => {
		router.push(`/admin/vacancy/edit/${id}`);
	};

	const goToReactions = () => {
		router.push(`/admin/reaction/all?page=1&vacancy=${vacancy.name}`);
	};

	const onBack = () => {
		dispatch(translateModalActions.goBack());
	};

	return (
		<div className="text-m text-default700 h-full ">
			<div className="">
				<TitleCard title={vacancy.name} />
				<div
					className={`${values.heightModal} flex justify-between overflow-y-auto lichiScrollBar`}
				>
					<div className="w-9/12">
						<div className="mb-7">
							<div className="flex items-center mb-1">
								<span className="mr-5 text-h1Size font-medium text-default900">
									{vacancy.name}
								</span>
								{values.department}
							</div>
							<div className="text-default800">
								{values.city}, {values.country}
							</div>
						</div>
						<div className="mb-7">
							<div className="mb-1">Уровень з/п</div>
							<div className="text-default900 font-medium">{values.salary}</div>
						</div>
						<div className="mb-7">
							<div className="mb-1">Адрес</div>
							<div className="text-default900 font-medium">
								{vacancy.address}
							</div>
						</div>
						<div className="mb-7">
							<div className="mb-1">Опыт работы</div>
							<div className="text-default900 font-medium">
								{values.experience}
							</div>
						</div>

						<div className="mb-7">
							<div className="mb-4">Описание</div>
							<div className="text-default900">{values.descriptionJson}</div>
						</div>
					</div>
					<div className="w-2/12 flex flex-col items-end mt-10">
						<div className="relative flex items-center gap-2 mb-6">
							<IconWrapper
								tooltip="Создать ноую вакансию по шаблону"
								src="/images/icons/copy-icon.svg"
								alt="copy"
								onClick={() => goToCopyPage(vacancy._id as string)}
								size="10"
								sizeIcon={18}
							/>
							<IconWrapper
								tooltip="Редактировать"
								src="/images/icons/pencil-icon.svg"
								alt="pencil"
								onClick={() => goToEditPage(vacancy._id as string)}
								size="10"
								sizeIcon={18}
							/>
							<IconWrapper
								tooltip={values.tooltipDelete}
								src="/images/icons/trash-icon.svg"
								alt="trash"
								onClick={() => onDeleteModal(vacancy)}
								size="10"
								sizeIcon={19}
								colorTooltip="danger"
							/>
						</div>
						<div
							className="text-primary500 text-s cursor-pointer font-[400]"
							onClick={goToReactions}
						>
							Отклики
						</div>
					</div>
				</div>
			</div>
			{!vacancy.isActive && (
				<div className="flex justify-end items-end mt-[30px]">
					<ButtonCustom
						colorTheme="primary"
						size="xl"
						className="rounded-lg"
						onClick={() => onPublishModal(vacancy)}
					>
						Опубликовать без изменений
					</ButtonCustom>
				</div>
			)}
			<ModalsEditVacancy
				isOpenDelete={isOpenDelete}
				isOpenPublish={isOpenPublish}
				onCloseDelete={onCloseDelete}
				onClosePublish={onClosePublish}
				onCloseVacancy={onBack}
			/>
		</div>
	);
};

export default VacancyInfo;
