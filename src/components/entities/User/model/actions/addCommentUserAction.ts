import { ThunkConfig } from "@/components/providers/StoreProvider/config/StateSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toasterActions } from "@/components/shared/ui/Toaster";
import { Comments } from "@/components/entities/User";

export const addCommentUserAction = createAsyncThunk<
	Comments,
	string,
	ThunkConfig<string>
>("addCommentUserAction", async (comment, thunkApi) => {
	const { extra, dispatch, rejectWithValue, getState } = thunkApi;
	try {
		const userId = getState().user.user?._id;
		const response = await extra.api.post<Comments>("user/add_comment", {
			userId,
			comment,
			token: "Иванов Иван",
		});
		if (!response.data) {
			throw new Error();
		}
		return response.data;
	} catch (e) {
		const errorMessage = "Не удалось добавить комментарий!";
		dispatch(toasterActions.setError([errorMessage]));
		return rejectWithValue(errorMessage);
	}
});
