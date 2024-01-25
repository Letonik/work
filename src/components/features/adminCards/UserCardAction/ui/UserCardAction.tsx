import React, { useMemo } from "react";
import LikeOutlineIcon from "@/components/shared/icons/LikeOutlineIcon";
import BlackListIcon from "@/components/shared/icons/BlackListIcon";

type PropsType = {
	isLike: boolean;
	isBlackList: boolean;
	setLike: () => void;
	setBlackList: () => void;
};

const UserCardAction = (props: PropsType): JSX.Element => {
	const { isLike, isBlackList, setLike, setBlackList } = props;

	const like = useMemo(() => {
		return (
			<div
				className={`w-10 h-10 flex justify-center items-center rounded-sm cursor-pointer hover:bg-default200 ${
					!isLike ? "bg-default100" : "bg-danger300"
				}`}
				onClick={setLike}
			>
				<LikeOutlineIcon color={!isLike ? "#565858" : "#920B3A"} />
			</div>
		);
	}, [isLike]);
	const blackList = useMemo(() => {
		return (
			<div
				className={`w-10 h-10 flex justify-center items-center rounded-sm cursor-pointer hover:bg-default200 ${
					!isBlackList ? "bg-default100" : "bg-default900"
				}`}
				onClick={setBlackList}
			>
				<BlackListIcon color={!isBlackList ? "#565858" : "#d4d4d8"} />
			</div>
		);
	}, [isBlackList]);
	return (
		<div className="flex gap-1 mb-7">
			{like}
			{blackList}
		</div>
	);
};

export default UserCardAction;
