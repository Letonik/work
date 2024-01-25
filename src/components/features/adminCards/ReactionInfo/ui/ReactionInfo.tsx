import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
	getIsLoadingCommentReaction,
	getIsLoadingDataReaction,
	getReactionAction,
	getReactionDataReaction,
	getIsLoadingStatusReaction,
} from "@/components/entities/Reaction";
import { SpinGlobal } from "@/components/shared/ui/SpinGlobal";
import { convertDateFormat } from "@/components/shared/utils/convertDateFormatDb";
import {
	getReactionIdTM,
	translateModalActions,
} from "@/components/entities/TranslateModal";
import { useAppDispatch } from "@/components/shared/hooks/useAppDispatch";
import { CommentsCard } from "@/components/features/adminCards/CommentsCard";
import ChipCustom from "@/components/shared/ui/ChipCustom/ChipCustom";
import { countries } from "@/components/shared/const/countries";
import { cities } from "@/components/shared/const/cities";
import ButtonCustom from "@/components/shared/ui/ButtonCustom/ButtonCustom";
import Image from "next/image";
import SelectCustom from "@/components/shared/ui/SelectCustom/SelectCustom";
import { SelectItem } from "@nextui-org/react";
import { STATUSES } from "@/components/shared/const/statuses";
import { addCommentReactionAction } from "@/components/entities/Reaction/model/actions/addCommentReactionAction";
import { updateStatusReactionAction } from "@/components/entities/Reaction/model/actions/updateStatusReactionAction";
import TitleCard from "../../TitleCard/ui/TitleCard";

// eslint-disable-next-line no-warning-comments
// todo: Пофиксить editor (исчезает при наборе)
// eslint-disable-next-line no-warning-comments
// todo: Исправить логику удаления

const ReactionInfo = (): JSX.Element => {
	const [status, setStatus] = useState("");
	const [disabled, setDisabled] = useState(true);

	const reactionId = useSelector(getReactionIdTM);
	const reactionData = useSelector(getReactionDataReaction);
	const isLoadingReaction = useSelector(getIsLoadingDataReaction);
	const isLoadingComment = useSelector(getIsLoadingCommentReaction);
	const isLoadingStatus = useSelector(getIsLoadingStatusReaction);

	const dispatch = useAppDispatch();

	const addNewComment = async (val: string) => {
		await dispatch(addCommentReactionAction(val));
	};

	const changeStatus = () => {
		dispatch(updateStatusReactionAction(status));
		dispatch(translateModalActions.setDidChange());
		setDisabled(true);
	};
	const goToHistory = () => {
		dispatch(translateModalActions.setStep("historyReaction"));
	};

	const goToVacancy = (id: string) => {
		dispatch(translateModalActions.setStep("vacancy"));
		dispatch(translateModalActions.setVacancyId(id));
	};

	const setNewStatus = (val: string) => {
		setStatus(val);
		setDisabled(false);
	};

	useEffect(() => {
		if (!status && reactionData?.status) setStatus(reactionData.status);
	}, [reactionData?.status]);

	useEffect(() => {
		if (reactionId) dispatch(getReactionAction(reactionId));
	}, [reactionId]);

	return (
		<div className="text-m text-default700 h-full ">
			{reactionData && !isLoadingReaction ? (
				<>
					<TitleCard title="Личные данные" />
					<div className="flex justify-between gap-10 h-[calc(90vh-170px)] overflow-y-auto lichiScrollBar">
						<div className="w-full">
							<div className="mb-7">
								<div className="text-l h-10 flex align-center">
									<div className="mr-6 font-medium text-h1Size text-[#000000] mb-2">
										{reactionData.user.firstName} {reactionData.user.middleName}{" "}
										{reactionData.user.lastName}
									</div>
									<ChipCustom dep={reactionData.vacancy.department} />
								</div>
								<div className="text-default900 flex align-center">
									{countries[reactionData.vacancy.country].name},{" "}
									{cities[reactionData.vacancy.city].name}
								</div>
							</div>
							<div className="mb-7">
								<div className="mb-1">Статус</div>
								<div className="text-default900 font-medium">
									{STATUSES[reactionData.status].name}
								</div>
							</div>
							<div className="mb-7">
								<div className="mb-1">Эл. почта</div>
								<div className="text-default900 font-medium">
									{reactionData.user.email}
								</div>
							</div>
							<div className="mb-7">
								<div className="mb-1">Телефон</div>
								<div className="text-default900 font-medium">
									{reactionData.user.phoneNumber}
								</div>
							</div>
							<div className="mb-7">
								<div className="mb-1">Отклики</div>
								<div>
									<div
										className="text-primary500 font-medium cursor-pointer"
										onClick={() => goToVacancy(reactionData.vacancy._id)}
									>
										{reactionData.vacancy.name}
									</div>
									<div className="text-xs text-default400">
										{convertDateFormat(reactionData.createdAt, true)}{" "}
										{countries[reactionData.vacancy.country].name},{" "}
										{cities[reactionData.vacancy.city].name}
									</div>
								</div>
							</div>
							<div className="mb-7">
								<div className="mb-1">Сопроводительное письмо</div>
								<div className="mt-2 text-default800">
									{reactionData.coverLetter
										? reactionData.coverLetter
										: "Отсутствует"}
								</div>
							</div>
						</div>
						<div className="w-full">
							<div
								className="mb-7 text-default500 font-medium text-s cursor-pointer hover:text-default400"
								onClick={goToHistory}
							>
								История действий
							</div>
							<div className="mb-3 font-medium text-[#000000 text-xxl">
								Изменить статус заявки
							</div>
							<SelectCustom
								placeholder="Выберите статус"
								className="w-[230px] mb-4"
								aria-label="status"
								isLoading={isLoadingStatus}
								selectedKeys={status ? [status] : []}
								onChange={(val) => {
									setNewStatus(val.target.value);
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
							<CommentsCard
								comments={reactionData.comments}
								addNewComment={addNewComment}
								isLoadingBtn={isLoadingComment}
							/>
						</div>
					</div>
					<div className="flex justify-end gap-2 items-end mt-[30px]">
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
							onClick={() => {}}
						>
							Отказ
						</ButtonCustom>
						<ButtonCustom
							colorTheme="primary"
							size="xl"
							className="rounded-lg"
							onClick={changeStatus}
							isLoading={isLoadingStatus}
							isDisabled={disabled}
						>
							Сохранить
						</ButtonCustom>
					</div>
				</>
			) : (
				<SpinGlobal />
			)}
		</div>
	);
};

export default ReactionInfo;
