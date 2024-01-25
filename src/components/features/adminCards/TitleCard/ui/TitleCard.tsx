import React from "react";
import { useSelector } from "react-redux";
import {
	getHistoryTM,
	translateModalActions,
} from "@/components/entities/TranslateModal";
import { useAppDispatch } from "@/components/shared/hooks/useAppDispatch";
import ArrowIcon from "@/components/shared/icons/ArrowIcon";

type PropsType = {
	title: string;
};

const TitleCard = (props: PropsType): JSX.Element => {
	const { title } = props;
	const history = useSelector(getHistoryTM);
	const dispatch = useAppDispatch();
	const goBack = () => {
		dispatch(translateModalActions.goBack());
	};

	return (
		<div className="mb-5 flex items-center gap-4">
			{!!history.length && (
				<div className="rotate-[270deg] cursor-pointer" onClick={goBack}>
					<ArrowIcon />
				</div>
			)}
			<h2 className="text-default600 text-l">{title}</h2>
		</div>
	);
};

export default TitleCard;
