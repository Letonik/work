import type {
	GetUserListActionDataType,
	UserListItem,
	UserSchema,
	Reaction,
	ReactionUser,
	Institutes,
	PlacesOfWork,
	Comments,
	User,
	UserHistory,
	ReactionUserHistory,
	HistoryElemUser,
} from "./model/types/UserSchema";
import { userActions, userReducer } from "./model/slice/userSlice";
import { getUserListAction } from "./model/actions/getUserListAction";
import { getUserAction } from "./model/actions/getUserAction";
import { updateBlackListUserAction } from "./model/actions/updateBlackListUserAction";
import { updateLikeUserAction } from "./model/actions/updateLikeUserAction";
import { addCommentUserAction } from "./model/actions/addCommentUserAction";
import { getUserHistoryAction } from "./model/actions/getUserHistoryAction";
import { createApplicantAction } from "./model/actions/createApplicantAction";
import {
	getIsLoadingListUser,
	getUserListUser,
	getTotalUser,
	getIsLoadingCreate,
	getPageUser,
	getIsLoadingUser,
	getUserDataUser,
	getIsLoadingComment,
	getIsLoadingHistory,
	getUserHistoryUser,
	getApplicantDataUser,
} from "./model/selectors/userSelectors";

export {
	userActions,
	userReducer,

	// actions
	getUserListAction,
	getUserAction,
	getUserHistoryAction,
	updateBlackListUserAction,
	updateLikeUserAction,
	addCommentUserAction,
	createApplicantAction,

	// selectors
	getIsLoadingListUser,
	getIsLoadingComment,
	getIsLoadingUser,
	getIsLoadingCreate,
	getUserListUser,
	getUserDataUser,
	getPageUser,
	getTotalUser,
	getIsLoadingHistory,
	getApplicantDataUser,
	getUserHistoryUser,

	// types
	UserSchema,
	UserListItem,
	GetUserListActionDataType,
	Reaction,
	ReactionUser,
	Institutes,
	PlacesOfWork,
	Comments,
	User,
	UserHistory,
	ReactionUserHistory,
	HistoryElemUser,
};
