import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getReactionListAction } from "../actions/getReactionListAction";
import { ReactionSchema } from "../types/ReactionSchema";
import { getReactionAction } from "../actions/getReactionAction";
import { addCommentReactionAction } from "../actions/addCommentReactionAction";
import { updateStatusReactionAction } from "../actions/updateStatusReactionAction";
import { getReactionHistoryAction } from "../actions/getReactionHistoryAction";
import { getCountStatusesAction } from "@/components/entities/Reaction/model/actions/getCountStatusesAction";

const initialState: ReactionSchema = {
	isLoadingList: false,
	isLoadingReaction: false,
	isLoadingComment: false,
	isLoadingStatus: false,
	isLoadingHistory: false,
	reactionList: [],
	reaction: null,
	history: null,
	countStatuses: {
		all: 0,
		application: 0,
		consideration: 0,
		interview: 0,
		employee: 0,
	},
	count: 0,
	page: 1,
	total: 0,
};
export const reactionSlice = createSlice({
	name: "reactionSlice",
	initialState,
	reducers: {
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
		},
		clearVacancyList: (state) => {
			state.reactionList = [];
			state.page = 1;
			state.total = 0;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getReactionListAction.pending, (state) => {
				state.isLoadingList = true;
			})
			.addCase(getReactionListAction.fulfilled, (state, action) => {
				const { count, data } = action.payload;
				state.reactionList = data;
				state.count = count;
				state.total = Math.ceil(count / 10);
				state.isLoadingList = false;
			})
			.addCase(getReactionListAction.rejected, (state) => {
				state.isLoadingList = false;
			})
			.addCase(getReactionAction.pending, (state) => {
				state.isLoadingReaction = true;
			})
			.addCase(getReactionAction.fulfilled, (state, action) => {
				state.reaction = action.payload;
				state.isLoadingReaction = false;
			})
			.addCase(getReactionAction.rejected, (state) => {
				state.isLoadingReaction = false;
			})
			.addCase(addCommentReactionAction.pending, (state) => {
				state.isLoadingComment = true;
			})
			.addCase(addCommentReactionAction.fulfilled, (state, action) => {
				if (state.reaction) {
					state.reaction.comments.push(action.payload);
				}
				state.isLoadingComment = false;
			})
			.addCase(addCommentReactionAction.rejected, (state) => {
				state.isLoadingComment = false;
			})
			.addCase(updateStatusReactionAction.pending, (state) => {
				state.isLoadingStatus = true;
			})
			.addCase(updateStatusReactionAction.fulfilled, (state, action) => {
				if (state.reaction) {
					state.reaction.status = action.payload;
				}
				state.isLoadingStatus = false;
			})
			.addCase(updateStatusReactionAction.rejected, (state) => {
				state.isLoadingStatus = false;
			})
			.addCase(getReactionHistoryAction.pending, (state) => {
				state.isLoadingHistory = true;
			})
			.addCase(getReactionHistoryAction.fulfilled, (state, action) => {
				state.history = action.payload;
				state.isLoadingHistory = false;
			})
			.addCase(getReactionHistoryAction.rejected, (state) => {
				state.isLoadingHistory = false;
			})
			.addCase(getCountStatusesAction.fulfilled, (state, action) => {
				state.countStatuses = action.payload;
			});
	},
});
export const { actions: reactionActions } = reactionSlice;
export const { reducer: reactionReducer } = reactionSlice;
