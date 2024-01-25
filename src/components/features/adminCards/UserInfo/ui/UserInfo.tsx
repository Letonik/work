import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
	addCommentUserAction,
	getIsLoadingComment,
	getIsLoadingUser,
	getUserAction,
	getUserDataUser,
	updateBlackListUserAction,
	updateLikeUserAction,
} from "@/components/entities/User";
import { SpinGlobal } from "@/components/shared/ui/SpinGlobal";
import { convertDateFormat } from "@/components/shared/utils/convertDateFormatDb";
import { calculateAge } from "@/components/shared/utils/calculateAge";
import { experience } from "@/components/shared/const/experience";
import { useAppDispatch } from "@/components/shared/hooks/useAppDispatch";
import {
	getUserIdTM,
	translateModalActions,
} from "@/components/entities/TranslateModal";
import { PlacesOfWork } from "@/components/features/adminCards/PlacesOfWorkCard";
import { Certificate } from "@/components/features/adminCards/CertificateCard";
import { Institutes } from "@/components/features/adminCards/InstitutesCard";
import { ReactionsCard } from "@/components/features/adminCards/ReactionsCard";
import { UserCardAction } from "@/components/features/adminCards/UserCardAction";
import { CommentsCard } from "@/components/features/adminCards/CommentsCard";
import TitleCard from "../../TitleCard/ui/TitleCard";

const UserInfo = (): JSX.Element => {
	const userId = useSelector(getUserIdTM);
	const userData = useSelector(getUserDataUser);
	const isLoadingUser = useSelector(getIsLoadingUser);
	const isLoadingComment = useSelector(getIsLoadingComment);

	const dispatch = useAppDispatch();

	const setLike = (isLike: boolean) => {
		dispatch(updateLikeUserAction({ userId, isLike }));
		dispatch(translateModalActions.setDidChange());
	};
	const setBlackList = (isBlackList: boolean) => {
		dispatch(updateBlackListUserAction({ userId, isBlackList }));
		dispatch(translateModalActions.setDidChange());
	};

	const addNewComment = async (val: string) => {
		await dispatch(addCommentUserAction(val));
	};

	useEffect(() => {
		if (userId) dispatch(getUserAction(userId));
	}, [userId]);

	const goToHistory = () => {
		dispatch(translateModalActions.setStep("historyUser"));
	};

	return (
		<div className="text-m text-default700 h-full ">
			<TitleCard title="Личные данные" />
			{userData && !isLoadingUser ? (
				<div className="flex justify-between gap-10 h-[calc(90vh-110px)] overflow-y-auto lichiScrollBar">
					<div className="w-full">
						<div className="mb-7">
							<div className="text-l h-10 flex align-center">
								<div className="mr-6 font-medium text-h1Size text-[#000000] mb-2">
									{userData.firstName} {userData.middleName} {userData.lastName}
								</div>
							</div>
							<div className="text-default900 flex align-center">
								{userData.city} {userData.country} {userData.lastName}
							</div>
						</div>
						<div className="mb-7">
							<div className="mb-1">Дата рождения</div>
							<div className="text-default900 font-medium">
								{convertDateFormat(userData.birthDay, true)} (возраст -{" "}
								{calculateAge(userData.birthDay)})
							</div>
						</div>
						<div className="mb-7">
							<div className="mb-1">Эл. почта</div>
							<div className="text-default900 font-medium">
								{userData.email}
							</div>
						</div>
						<div className="mb-7">
							<div className="mb-1">Телефон</div>
							<div className="text-default900 font-medium">
								{userData.phoneNumber}
							</div>
						</div>
						<div className="mb-7">
							<div className="mb-1">Отклики</div>
							<ReactionsCard reactions={userData.reactions} />
						</div>
						<div className="mb-7">
							<div className="mb-1">Образование</div>
							<Institutes institutes={userData.institutes} />
							<div className="text-default400">
								{userData.educationLevel
									? userData.educationLevel
									: "не указан уровень"}
							</div>
						</div>
						<Certificate certificate={userData.certificate} />
						<div className="mb-7">
							<div className="mb-1">Опыт работы</div>
							<div className="text-default900 font-medium">
								{userData.experience
									? experience[userData.experience].name
									: "Стаж не указан"}
							</div>
						</div>
						<PlacesOfWork placesOfWork={userData.placesOfWork} />
					</div>
					<div className="w-full">
						<UserCardAction
							isLike={userData.isLike}
							isBlackList={userData.isBlackList}
							setLike={() => setLike(!userData.isLike)}
							setBlackList={() => setBlackList(!userData.isBlackList)}
						/>
						<div
							onClick={goToHistory}
							className="mb-7 text-default500 font-medium text-s cursor-pointer hover:text-default400"
						>
							История действий
						</div>
						<CommentsCard
							comments={userData.comments}
							addNewComment={addNewComment}
							isLoadingBtn={isLoadingComment}
						/>
					</div>
				</div>
			) : (
				<SpinGlobal />
			)}
		</div>
	);
};

export default UserInfo;
