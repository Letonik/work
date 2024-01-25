import React from "react";
import { UserInfo } from "@/components/features/adminCards/UserInfo";
import { useSelector } from "react-redux";
import {
	getDirectionTM,
	getStepTM,
} from "@/components/entities/TranslateModal";
import { ReactionInfo } from "@/components/features/adminCards/ReactionInfo";
import {
	HistoryReactionInfo,
	HistoryUserInfo,
} from "@/components/features/adminCards/HistoryInfo";
import { VacancyInfo } from "@/components/features/adminCards/VacancyInfo";
import TranslateModal from "./TranslateModal";

const TranslateModalAdminCards = (): JSX.Element => {
	const step = useSelector(getStepTM);
	const direction = useSelector(getDirectionTM);
	const elemsModal = [
		{
			key: "user",
			elem: <UserInfo />,
		},
		{
			key: "reaction",
			elem: <ReactionInfo />,
		},
		{
			key: "historyUser",
			elem: <HistoryUserInfo />,
		},
		{
			key: "historyReaction",
			elem: <HistoryReactionInfo />,
		},
		{
			key: "vacancy",
			elem: <VacancyInfo />,
		},
	];
	return (
		<TranslateModal elems={elemsModal} direction={direction} step={step} />
	);
};

export default TranslateModalAdminCards;
