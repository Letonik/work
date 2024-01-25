import React, { useMemo } from "react";
import { ReactionUser } from "@/components/entities/User";
import { convertDateFormat } from "@/components/shared/utils/convertDateFormatDb";
import { countries } from "@/components/shared/const/countries";
import { cities } from "@/components/shared/const/cities";
import { useAppDispatch } from "@/components/shared/hooks/useAppDispatch";
import { translateModalActions } from "@/components/entities/TranslateModal";

type PropsType = {
	reactions: ReactionUser[] | null;
};

const ReactionsCard = (props: PropsType): JSX.Element => {
	const { reactions } = props;

	const dispatch = useAppDispatch();
	const goToReaction = (id: string) => {
		dispatch(translateModalActions.setStep("reaction"));
		dispatch(translateModalActions.setReactionId(id));
	};

	return useMemo(() => {
		if (reactions?.length) {
			return (
				<>
					{reactions.map((item) => (
						<div key={item._id}>
							<div
								className="text-primary500 font-medium cursor-pointer"
								onClick={() => goToReaction(item._id)}
							>
								{item.vacancy.name}
							</div>
							<div className="text-xs text-default400">
								{convertDateFormat(item.createdAt, true)}{" "}
								{countries[item.vacancy.country].name},{" "}
								{cities[item.vacancy.city].name}
							</div>
						</div>
					))}
				</>
			);
		}
		return <div className="text-default900 font-medium">Нет откликов</div>;
	}, [reactions]);
};

export default ReactionsCard;
