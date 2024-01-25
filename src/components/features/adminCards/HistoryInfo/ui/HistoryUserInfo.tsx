import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { SpinGlobal } from "@/components/shared/ui/SpinGlobal";
import TitleCard from "@/components/features/adminCards/TitleCard/ui/TitleCard";
import HistoryItem from "@/components/features/adminCards/HistoryInfo/ui/HistoryItem";
import {
	getUserIdTM,
	translateModalActions,
} from "@/components/entities/TranslateModal";
import {
	getIsLoadingHistory,
	getUserHistoryAction,
	getUserHistoryUser,
} from "@/components/entities/User";
import { useAppDispatch } from "@/components/shared/hooks/useAppDispatch";
import DropdownContainer from "./DropdownContainer";

const HistoryUserInfo = (): JSX.Element => {
	const userId = useSelector(getUserIdTM);
	const isLoading = useSelector(getIsLoadingHistory);
	const historyData = useSelector(getUserHistoryUser);

	const dispatch = useAppDispatch();

	const goToVacancy = (id: string) => {
		dispatch(translateModalActions.setStep("vacancy"));
		dispatch(translateModalActions.setVacancyId(id));
	};

	useEffect(() => {
		if (userId) dispatch(getUserHistoryAction(userId));
	}, [userId]);

	return (
		<div className="text-m text-default700 h-full ">
			<TitleCard title="История действий" />
			{historyData && !isLoading ? (
				<div className="h-[calc(90vh-110px)] overflow-y-auto lichiScrollBar">
					<div className="mr-6 font-medium text-h1Size text-[#000000] mb-1">
						{historyData.firstName} {historyData.middleName}{" "}
						{historyData.lastName}
					</div>
					{historyData.reactions.map((reaction) => (
						<div className="border-b border-default100 py-8" key={reaction._id}>
							<DropdownContainer
								title={
									<div>
										<span className="text-xxl mr-3">Вакансия</span>
										<span
											className="text-primary500 text-xxl font-medium cursor-pointer"
											onClick={() => goToVacancy(reaction.vacancy._id)}
										>
											{reaction.vacancy.name}
										</span>
									</div>
								}
							>
								<div className="px-6 pt-4 flex flex-col gap-3">
									{reaction.history.map((history) => (
										<Fragment key={history._id}>
											<HistoryItem data={history} vacancy={reaction.vacancy} />
										</Fragment>
									))}
								</div>
							</DropdownContainer>
						</div>
					))}
				</div>
			) : (
				<SpinGlobal />
			)}
		</div>
	);
};

export default HistoryUserInfo;
