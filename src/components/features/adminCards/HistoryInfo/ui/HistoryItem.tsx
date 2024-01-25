import React from "react";
import { convertDateFormat } from "@/components/shared/utils/convertDateFormatDb";
import { STATUSES } from "@/components/shared/const/statuses";
import { HistoryElemUser } from "@/components/entities/User";
import { translateModalActions } from "@/components/entities/TranslateModal";
import { useAppDispatch } from "@/components/shared/hooks/useAppDispatch";

type PropsType = {
	data: HistoryElemUser;
	vacancy: {
		_id: string;
		name: string;
	};
};

const HistoryItem = (props: PropsType): JSX.Element => {
	const { data, vacancy } = props;

	const dispatch = useAppDispatch();

	const goToVacancy = (id: string) => {
		dispatch(translateModalActions.setStep("vacancy"));
		dispatch(translateModalActions.setVacancyId(id));
	};

	return (
		<div>
			<span className="mr-4 text-default600">
				{convertDateFormat(data.date, true)}
			</span>
			<span className="mr-2">{data.value}</span>
			{data.vacancyName && (
				<span
					className="text-primary500"
					onClick={() => goToVacancy(vacancy._id)}
				>
					{vacancy.name}
				</span>
			)}
			{!!data.status && (
				<span className="text-default900">{STATUSES[data.status].name}</span>
			)}
		</div>
	);
};

export default HistoryItem;
