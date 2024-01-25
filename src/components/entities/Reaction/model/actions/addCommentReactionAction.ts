import { ThunkConfig } from "@/components/providers/StoreProvider/config/StateSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toasterActions } from "@/components/shared/ui/Toaster";
import { Comments } from "@/components/entities/Reaction";

export const addCommentReactionAction = createAsyncThunk<
	Comments,
	string,
	ThunkConfig<string>
>("addCommentReactionAction", async (comment, thunkApi) => {
	const { extra, dispatch, rejectWithValue, getState } = thunkApi;
	try {
		const reactionId = getState().reaction.reaction?._id;
		const response = await extra.api.post<Comments>("reaction/add_comment", {
			reactionId,
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
