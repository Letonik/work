"use client";

import React, { useEffect } from "react";
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
	getIsLoadingListReaction,
	getPageReaction,
	getReactionListReaction,
	getTotalReaction,
	reactionActions,
	ReactionListItem,
} from "@/components/entities/Reaction";
import { cities } from "@/components/shared/const/cities";
import { countries } from "@/components/shared/const/countries";
import ChipCustom from "@/components/shared/ui/ChipCustom/ChipCustom";
import {
	getIsOpenModalTM,
	translateModalActions,
} from "@/components/entities/TranslateModal";

const columns = [
	{ name: "Имя", uid: "firstName" },
	{ name: "Фамилия", uid: "lastName" },
	{ name: "Должность", uid: "reactions" },
	{ name: "Город", uid: "city" },
	{ name: "Отдел", uid: "department" },
	{ name: "Действия", uid: "actions" },
];

const ReactionListTable = (): JSX.Element => {
	const reactionList: ReactionListItem[] = useSelector(getReactionListReaction);
	const page = useSelector(getPageReaction);
	const total = useSelector(getTotalReaction);
	const isLoadingTable = useSelector(getIsLoadingListReaction);
	const isOpenTM = useSelector(getIsOpenModalTM);

	const onShowReaction = () => dispatch(translateModalActions.setOpen());

	const dispatch = useAppDispatch();

	const setPage = (currentPage: number) => {
		dispatch(reactionActions.setPage(currentPage));
	};

	const onShowReactionModal = (id: string) => {
		dispatch(translateModalActions.setReactionId(id));
		onShowReaction();
	};

	useEffect(() => {
		if (!isOpenTM) {
			dispatch(translateModalActions.setInitialStep("reaction"));
		}
	}, [isOpenTM]);
	useEffect(() => {
		return () => dispatch(translateModalActions.clearTM());
	}, []);

	return (
		<TableCustom
			aria-label="reactions"
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
				items={reactionList}
				isLoading={isLoadingTable}
				loadingContent={<SkeletonTable />}
			>
				{reactionList.map((reaction) => (
					<TableRow key={reaction._id}>
						<TableCell>{reaction.firstName}</TableCell>
						<TableCell>{reaction.lastName}</TableCell>
						<TableCell>{reaction.name}</TableCell>
						<TableCell>
							{cities[reaction.city].name}, {countries[reaction.country].name}
						</TableCell>
						<TableCell>
							<ChipCustom dep={reaction.department} />
						</TableCell>
						<TableCell>
							<div className="relative flex items-center gap-2">
								<IconWrapper
									tooltip="Просмотр"
									src="/images/icons/eye-icon.svg"
									alt="eye"
									onClick={() => onShowReactionModal(reaction._id)}
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

export default ReactionListTable;
