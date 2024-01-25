/* eslint-disable */
import { StateSchema } from "@/components/providers/StoreProvider";
import { ApplicantData } from "@/components/entities/User/model/types/UserSchema";

export const getUserListUser = (state: StateSchema) => state.user.userList;
export const getUserDataUser = (state: StateSchema) => state.user.user;
export const getUserHistoryUser = (state: StateSchema) => state.user.history;
export const getPageUser = (state: StateSchema) => state.user.page;
export const getTotalUser = (state: StateSchema) => state.user.total;
export const getIsLoadingListUser = (state: StateSchema) =>
	state.user.isLoadingList;
export const getIsLoadingUser = (state: StateSchema) =>
	state.user.isLoadingUser;
export const getIsLoadingCreate = (state: StateSchema) =>
	state.user.isLoadingCreate;
export const getIsLoadingComment = (state: StateSchema) =>
	state.user.isLoadingComment;
export const getIsLoadingHistory = (state: StateSchema) =>
	state.user.isLoadingHistory;
export const getApplicantDataUser = (state: StateSchema) =>
	state.user.applicantData;
