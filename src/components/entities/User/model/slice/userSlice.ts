import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApplicantData, UserSchema } from "../types/UserSchema";
import { getUserAction } from "../actions/getUserAction";
import { getUserListAction } from "../actions/getUserListAction";
import { updateBlackListUserAction } from "../actions/updateBlackListUserAction";
import { updateLikeUserAction } from "../actions/updateLikeUserAction";
import { addCommentUserAction } from "../actions/addCommentUserAction";
import { getUserHistoryAction } from "../actions/getUserHistoryAction";
import { createApplicantAction } from "../actions/createApplicantAction";

const initialApplicantData = {
	firstName: "",
	lastName: "",
	middleName: "",
	phoneNumber: "",
	email: "",
	city: "",
	birthDay: "",
	vacancy: "",
	status: "application",
	comment: "",
};

const initialState: UserSchema = {
	isLoadingList: false,
	isLoadingCreate: false,
	isLoadingUser: false,
	isLoadingComment: false,
	isLoadingHistory: false,
	userList: [],
	history: null,
	count: 0,
	page: 1,
	total: 0,
	user: null,
	applicantData: initialApplicantData,
};
export const userSlice = createSlice({
	name: "userSlice",
	initialState,
	reducers: {
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
		},
		clearVacancyList: (state) => {
			state.userList = [];
			state.page = 1;
			state.total = 0;
		},
		clearApplicantData: (state) => {
			state.applicantData = initialApplicantData;
		},
		setApplicantDataValue: (
			state,
			action: PayloadAction<{ key: keyof ApplicantData; value: any }>
		) => {
			const { key, value } = action.payload;
			state.applicantData[key] = value;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUserListAction.pending, (state) => {
				state.isLoadingList = true;
			})
			.addCase(getUserListAction.fulfilled, (state, action) => {
				const { count, data } = action.payload;
				state.userList = data;
				state.count = count;
				state.total = Math.ceil(count / 10);
				state.isLoadingList = false;
			})
			.addCase(getUserListAction.rejected, (state) => {
				state.isLoadingList = false;
			})
			.addCase(getUserAction.pending, (state) => {
				state.isLoadingUser = true;
			})
			.addCase(getUserAction.fulfilled, (state, action) => {
				state.user = action.payload;
				state.isLoadingUser = false;
			})
			.addCase(getUserAction.rejected, (state) => {
				state.isLoadingUser = false;
			})
			.addCase(updateBlackListUserAction.pending, (state) => {
				state.isLoadingUser = true;
			})
			.addCase(updateBlackListUserAction.fulfilled, (state) => {
				if (state.user) {
					state.user.isBlackList = !state.user.isBlackList;
				}
				state.isLoadingUser = false;
			})
			.addCase(updateBlackListUserAction.rejected, (state) => {
				state.isLoadingUser = false;
			})
			.addCase(updateLikeUserAction.pending, (state) => {
				state.isLoadingUser = true;
			})
			.addCase(updateLikeUserAction.fulfilled, (state) => {
				if (state.user) {
					state.user.isLike = !state.user.isLike;
				}
				state.isLoadingUser = false;
			})
			.addCase(updateLikeUserAction.rejected, (state) => {
				state.isLoadingUser = false;
			})
			.addCase(addCommentUserAction.pending, (state) => {
				state.isLoadingComment = true;
			})
			.addCase(addCommentUserAction.fulfilled, (state, action) => {
				if (state.user) {
					state.user.comments.push(action.payload);
				}
				state.isLoadingComment = false;
			})
			.addCase(addCommentUserAction.rejected, (state) => {
				state.isLoadingComment = false;
			})
			.addCase(getUserHistoryAction.pending, (state) => {
				state.isLoadingHistory = true;
			})
			.addCase(getUserHistoryAction.fulfilled, (state, action) => {
				state.history = action.payload;
				state.isLoadingHistory = false;
			})
			.addCase(getUserHistoryAction.rejected, (state) => {
				state.isLoadingHistory = false;
			})
			.addCase(createApplicantAction.pending, (state) => {
				state.isLoadingCreate = true;
			})
			.addCase(createApplicantAction.fulfilled, (state) => {
				state.isLoadingCreate = false;
			})
			.addCase(createApplicantAction.rejected, (state) => {
				state.isLoadingCreate = false;
			});
	},
});
export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
