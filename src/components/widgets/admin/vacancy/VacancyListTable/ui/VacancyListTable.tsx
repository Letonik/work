"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
	Pagination,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@nextui-org/react";
import TableCustom from "@/components/shared/ui/TableCustom/TableCustom";
import {
	getIsLoadingVacancy,
	getPageVacancy,
	getTotalVacancy,
	getVacancyListVacancy,
	vacancyActions,
	VacancyDataType,
} from "@/components/entities/Vacancy";
import { convertDateFormat } from "@/components/shared/utils/convertDateFormatDb";
import { cities } from "@/components/shared/const/cities";
import ChipCustom from "@/components/shared/ui/ChipCustom/ChipCustom";
import { useAppDispatch } from "@/components/shared/hooks/useAppDispatch";
import SkeletonTable from "@/components/shared/ui/SkeletonTable/SkeletonTable";
import IconWrapper from "@/components/shared/ui/IconWrapper/IconWrapper";
import { ModalsEditVacancy } from "@/components/features/adminCards/VacancyInfo";
import {
	getIsOpenModalTM,
	translateModalActions,
} from "@/components/entities/TranslateModal";

const columns = [
	{ name: "Название", uid: "name" },
	{ name: "Публикация", uid: "date" },
	{ name: "Город", uid: "city" },
	{ name: "Отдел", uid: "department" },
	{ name: "Действия", uid: "actions" },
];

type PropsType = {
	isActive: boolean;
};

const VacancyListTable = (props: PropsType): JSX.Element => {
	const { isActive } = props;

	const router = useRouter();

	const vacancyList: VacancyDataType[] = useSelector(getVacancyListVacancy);
	const total = useSelector(getTotalVacancy);
	const page = useSelector(getPageVacancy);
	const isLoadingTable = useSelector(getIsLoadingVacancy);
	const isOpenTM = useSelector(getIsOpenModalTM);

	const [isOpenDelete, setOpenDelete] = useState<boolean>(false);

	const dispatch = useAppDispatch();

	const onOpenDelete = () => setOpenDelete(true);
	const onCloseDelete = () => setOpenDelete(false);
	const onShowVacancy = () => dispatch(translateModalActions.setOpen());

	const setPage = (currentPage: number) => {
		dispatch(vacancyActions.setPage(currentPage));
	};

	const onShowVacancyModal = (id: string) => {
		dispatch(translateModalActions.setVacancyId(id));
		onShowVacancy();
	};
	const onDeleteModal = (vacancy: VacancyDataType) => {
		dispatch(vacancyActions.setVacancy(vacancy));
		onOpenDelete();
	};

	const goToEditPage = (id: string) => {
		router.push(`/admin/vacancy/edit/${id}`);
	};

	useEffect(() => {
		if (!isOpenTM) {
			dispatch(translateModalActions.setInitialStep("vacancy"));
		}
	}, [isOpenTM]);

	useEffect(() => {
		return () => dispatch(translateModalActions.clearTM());
	}, []);

	const renderCell = React.useCallback(
		(vacancy: VacancyDataType, columnKey: string) => {
			switch (columnKey) {
				case "name":
					return <div>{vacancy.name}</div>;
				case "date":
					return <div>{convertDateFormat(vacancy.updatedAt as string)}</div>;
				case "city":
					return <div>{cities[vacancy.city].name}</div>;
				case "department":
					return <ChipCustom dep={vacancy.department} />;
				case "actions":
					return (
						<div className="relative flex items-center gap-2">
							<IconWrapper
								tooltip="Просмотр"
								src="/images/icons/eye-icon.svg"
								alt="eye"
								onClick={() => onShowVacancyModal(vacancy._id as string)}
								size="6"
								sizeIcon={18}
							/>
							<IconWrapper
								tooltip="Редактировать"
								src="/images/icons/pencil-icon.svg"
								alt="pencil"
								onClick={() => goToEditPage(vacancy._id as string)}
								size="6"
								sizeIcon={13}
							/>
							<IconWrapper
								tooltip={isActive ? "Перевести в архив" : "Удалить"}
								src="/images/icons/trash-icon.svg"
								alt="trash"
								onClick={() => onDeleteModal(vacancy)}
								size="6"
								sizeIcon={14}
								colorTooltip="danger"
							/>
						</div>
					);
				default:
					return false;
			}
		},
		[vacancyList]
	);

	return (
		<>
			<TableCustom
				aria-label="vacancies"
				bottomContent={
					<div className="flex w-full justify-center">
						{total > 1 && (
							<Pagination
								initialPage={page}
								page={page}
								total={total}
								onChange={(current) => setPage(current)}
							/>
						)}
					</div>
				}
			>
				<TableHeader columns={columns}>
					{(column) => (
						<TableColumn
							key={column.uid}
							align={column.uid === "actions" ? "center" : "start"}
						>
							{column.name}
						</TableColumn>
					)}
				</TableHeader>
				<TableBody
					items={vacancyList}
					isLoading={isLoadingTable}
					loadingContent={<SkeletonTable />}
				>
					{(item) => (
						// eslint-disable-next-line no-underscore-dangle
						<TableRow key={item._id}>
							{(columnKey) => (
								<TableCell>{renderCell(item, columnKey as string)}</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</TableCustom>
			<ModalsEditVacancy
				isOpenDelete={isOpenDelete}
				onCloseDelete={onCloseDelete}
				onCloseVacancy={() => dispatch(translateModalActions.clearTM())}
			/>
		</>
	);
};

export default VacancyListTable;
