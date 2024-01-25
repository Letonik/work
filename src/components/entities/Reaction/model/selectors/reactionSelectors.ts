/* eslint-disable */
import { StateSchema } from "@/components/providers/StoreProvider";

export const getReactionListReaction = (state: StateSchema) =>
	state.reaction.reactionList;
export const getPageReaction = (state: StateSchema) => state.reaction.page;
export const getReactionDataReaction = (state: StateSchema) =>
	state.reaction.reaction;
export const getReactionHistoryReaction = (state: StateSchema) =>
	state.reaction.history;
export const getTotalReaction = (state: StateSchema) => state.reaction.total;
export const getIsLoadingListReaction = (state: StateSchema) =>
	state.reaction.isLoadingList;
export const getIsLoadingDataReaction = (state: StateSchema) =>
	state.reaction.isLoadingReaction;
export const getIsLoadingCommentReaction = (state: StateSchema) =>
	state.reaction.isLoadingComment;
export const getIsLoadingStatusReaction = (state: StateSchema) =>
	state.reaction.isLoadingStatus;
export const getIsLoadingHistoryReaction = (state: StateSchema) =>
	state.reaction.isLoadingHistory;
export const getCountStatusesReaction = (state: StateSchema) =>
	state.reaction.countStatuses;
