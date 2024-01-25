"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
	Pagination,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@nextui-org/react";
import TableCustom from "@/components/shared/ui/TableCustom/TableCustom";
import { useAppDispatch } from "@/components/shared/hooks/useAppDispatch";
import SkeletonTable from "@/components/shared/ui/SkeletonTable/SkeletonTable";
import IconWrapper from "@/components/shared/ui/IconWrapper/IconWrapper";
import {
	getIsLoadingListUser,
	getPageUser,
	getTotalUser,
	getUserListUser,
	userActions,
	UserListItem,
} from "@/components/entities/User";
import {
	getIsOpenModalTM,
	translateModalActions,
} from "@/components/entities/TranslateModal";

const columns = [
	{ name: "Имя", uid: "firstName" },
	{ name: "Фамилия", uid: "lastName" },
	{ name: "Отклики на должность", uid: "reactions" },
	{ name: "Город", uid: "city" },
	{ name: "Действия", uid: "actions" },
];

const UserListTable = (): JSX.Element => {
	const userList: UserListItem[] = useSelector(getUserListUser);
	const page = useSelector(getPageUser);
	const total = useSelector(getTotalUser);
	const isLoadingTable = useSelector(getIsLoadingListUser);
	const isOpenTM = useSelector(getIsOpenModalTM);

	const [reactionOpenKeys, setReactionOpenKeys] = useState<{
		[key: string]: boolean;
	}>({});

	const dispatch = useAppDispatch();
	const setPage = (currentPage: number) => {
		dispatch(userActions.setPage(currentPage));
	};

	const onShowUser = (userId: string) => {
		dispatch(translateModalActions.setUserId(userId));
		dispatch(translateModalActions.setOpen());
	};

	useEffect(() => {
		const keys = userList.reduce(
			(acc, item) => {
				if (item.reactions.length > 1) acc[item._id] = false;
				return acc;
			},
			{} as { [key: string]: boolean }
		);
		setReactionOpenKeys(keys);
	}, [userList]);

	useEffect(() => {
		if (!isOpenTM) {
			dispatch(translateModalActions.setInitialStep("user"));
		}
	}, [isOpenTM]);
	useEffect(() => {
		return () => dispatch(translateModalActions.clearTM());
	}, []);

	const setOpenReaction = (key: string) => {
		setReactionOpenKeys((prevState) => ({ ...prevState, [key]: true }));
	};

	return (
		<TableCustom
			aria-label="users"
			bottomContent={
				<div className="flex w-full justify-center">
					{total > 1 && (
						<Pagination
							initialPage={page}
							page={page}
							total={total}
							onChange={(current) => setPage(current)}
						/>
					)}
				</div>
			}
		>
			<TableHeader columns={columns}>
				{(column) => (
					<TableColumn
						key={column.uid}
						align={column.uid === "actions" ? "center" : "start"}
					>
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody
				items={userList}
				isLoading={isLoadingTable}
				loadingContent={<SkeletonTable />}
			>
				{userList.map((user) => (
					<TableRow key={user._id}>
						<TableCell>{user.firstName}</TableCell>
						<TableCell>{user.lastName}</TableCell>
						<TableCell>
							<div>
								{reactionOpenKeys[user._id] === false ? (
									<>
										<div className="mb-3">{user.reactions[0].vacancy.name}</div>
										<div
											onClick={() => setOpenReaction(user._id)}
											className="text-default400 cursor-pointer"
										>
											еще {user.reactions.length - 1}
										</div>
									</>
								) : (
									<>
										{user.reactions.map((item) => (
											<div className="mb-3 last:mb-0" key={item._id}>
												{item.vacancy.name}
											</div>
										))}
									</>
								)}
								{!user.reactions.length && "Нет откликов"}
							</div>
						</TableCell>
						<TableCell>
							{user.city}, {user.country}
						</TableCell>
						<TableCell>
							<div className="relative flex items-center gap-2">
								<IconWrapper
									tooltip="Просмотр"
									src="/images/icons/eye-icon.svg"
									alt="eye"
									onClick={() => onShowUser(user._id)}
									size="6"
									sizeIcon={18}
								/>
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</TableCustom>
	);
};

export default UserListTable;
