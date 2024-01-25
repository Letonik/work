import React, { useMemo } from "react";
import ModalCustom from "@/components/shared/ui/ModalCustom/ModalCustom";
import { useSelector } from "react-redux";
import {
	deleteVacancyAction,
	getIsLoadingDeleteVacancy,
	getIsLoadingPublishVacancy,
	getVacancyDataVacancy,
	setVacancyOutArchiveAction,
	setVacancyToArchiveAction,
	vacancyActions,
} from "@/components/entities/Vacancy";
import { useAppDispatch } from "@/components/shared/hooks/useAppDispatch";
import { translateModalActions } from "@/components/entities/TranslateModal";

type PropsType = {
	isOpenDelete: boolean;
	isOpenPublish?: boolean;
	onClosePublish?: () => void;
	onCloseDelete: () => void;
	onCloseVacancy: () => void;
};

const ModalsEditVacancy = (props: PropsType): JSX.Element => {
	const {
		isOpenDelete,
		isOpenPublish,
		onClosePublish,
		onCloseDelete,
		onCloseVacancy,
	} = props;

	const activeVacancy = useSelector(getVacancyDataVacancy);
	const isLoadingDelete = useSelector(getIsLoadingDeleteVacancy);
	const isLoadingPublish = useSelector(getIsLoadingPublishVacancy);

	const dispatch = useAppDispatch();

	const keysModal = useMemo(() => {
		return {
			modalDeleteBtn: activeVacancy?.isActive ? "Переместить" : "Удалить",
			modalDeleteText: activeVacancy?.isActive
				? "Вы действительно хотите переместить вакансию в архив?"
				: "Вы действительно хотите удалить вакансию?",
			deleteVacancyFn: activeVacancy?.isActive
				? setVacancyToArchiveAction
				: deleteVacancyAction,
		};
	}, [activeVacancy]);

	const deleteVacancy = async () => {
		if (activeVacancy) {
			const res = await dispatch(
				keysModal.deleteVacancyFn(activeVacancy._id as string)
			);
			if (res.payload?.success) {
				onCloseDelete();
				if (activeVacancy.isActive) {
					dispatch(vacancyActions.setVacancyActive(!activeVacancy.isActive));
					dispatch(translateModalActions.setDidChange());
				} else {
					setTimeout(() => {
						onCloseVacancy();
					}, 500);
				}
			}
		}
	};

	const publishVacancy = async () => {
		if (activeVacancy) {
			const res = await dispatch(
				setVacancyOutArchiveAction(activeVacancy._id as string)
			);
			if (
				res.payload?.success &&
				onClosePublish &&
				isOpenPublish !== undefined
			) {
				onClosePublish();
				if (!activeVacancy.isActive) {
					dispatch(translateModalActions.setDidChange());
					dispatch(vacancyActions.setVacancyActive(!activeVacancy.isActive));
				}
			}
		}
	};

	return (
		<>
			<ModalCustom
				isOpen={isOpenDelete}
				textHeader={activeVacancy?.name}
				text={keysModal.modalDeleteText}
				textBtnOk={keysModal.modalDeleteBtn}
				handleClose={onCloseDelete}
				onConfirm={deleteVacancy}
				isLoadingBtnOk={isLoadingDelete}
				variant="confirm"
			/>
			{onClosePublish && isOpenPublish !== undefined && (
				<ModalCustom
					isOpen={isOpenPublish}
					textHeader={activeVacancy?.name}
					text="Вы действительно хотите опубликовать вакансию?"
					textBtnOk="Опубликовать"
					handleClose={onClosePublish}
					onConfirm={publishVacancy}
					isLoadingBtnOk={isLoadingPublish}
					variant="confirm"
				/>
			)}
		</>
	);
};

export default ModalsEditVacancy;
