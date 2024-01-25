import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { SpinGlobal } from "@/components/shared/ui/SpinGlobal";
import TitleCard from "@/components/features/adminCards/TitleCard/ui/TitleCard";
import HistoryItem from "@/components/features/adminCards/HistoryInfo/ui/HistoryItem";
import { getReactionIdTM } from "@/components/entities/TranslateModal";
import { useAppDispatch } from "@/components/shared/hooks/useAppDispatch";
import {
	getIsLoadingHistoryReaction,
	getReactionHistoryAction,
	getReactionHistoryReaction,
} from "@/components/entities/Reaction";

const HistoryReactionInfo = (): JSX.Element => {
	const reactionId = useSelector(getReactionIdTM);
	const isLoading = useSelector(getIsLoadingHistoryReaction);
	const historyData = useSelector(getReactionHistoryReaction);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (reactionId) dispatch(getReactionHistoryAction(reactionId));
	}, [reactionId]);

	return (
		<div className="text-m text-default700 h-full ">
			<TitleCard title="История действий" />
			{historyData && !isLoading ? (
				<div className="h-[calc(90vh-110px)] overflow-y-auto lichiScrollBar">
					<div className="mr-6 font-medium text-h1Size text-[#000000] mb-1">
						{historyData.user.firstName} {historyData.user.middleName}{" "}
						{historyData.user.lastName}
					</div>
					{historyData.history.map((item) => (
						<div
							className="border-b last:border-none border-default100 py-4"
							key={item._id}
						>
							<HistoryItem data={item} vacancy={historyData.vacancy} />
						</div>
					))}
				</div>
			) : (
				<SpinGlobal />
			)}
		</div>
	);
};

export default HistoryReactionInfo;
