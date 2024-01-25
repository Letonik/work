import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import {
	getIsLoadingListUser,
	getPageUser,
	getUserListAction,
	userActions,
} from "@/components/entities/User";
import {
	getIsLoadingListReaction,
	getPageReaction,
	getReactionListAction,
} from "@/components/entities/Reaction";
import FiltersResumeList from "./FiltersResumeList";

type PropsType = {
	paramsType: string;
	pageType: "resume" | "reaction";
};

const FiltersList = (props: PropsType): JSX.Element => {
	const { paramsType, pageType } = props;
	const pageUser = useSelector(getPageUser);
	const pageReaction = useSelector(getPageReaction);
	const isLoadingTableUser = useSelector(getIsLoadingListUser);
	const isLoadingTableReaction = useSelector(getIsLoadingListReaction);
	const paramSend = useMemo(() => {
		if (pageType === "resume") {
			if (paramsType === "bl") return { isBlackList: true };
			if (paramsType === "like") return { isLike: true };
		}
		if (pageType === "reaction" && paramsType !== "all") {
			return { status: paramsType };
		}
		return {};
	}, [paramsType, pageType]);

	return (
		<div>
			{pageType === "resume" && (
				<FiltersResumeList
					paramSend={paramSend}
					page={pageUser}
					isLoadingTable={isLoadingTableUser}
					getListForTable={getUserListAction}
					setPage={userActions.setPage}
				/>
			)}
			{pageType === "reaction" && (
				<FiltersResumeList
					paramSend={paramSend}
					page={pageReaction}
					isLoadingTable={isLoadingTableReaction}
					getListForTable={getReactionListAction}
					setPage={userActions.setPage}
				/>
			)}
		</div>
	);
};

export default FiltersList;
