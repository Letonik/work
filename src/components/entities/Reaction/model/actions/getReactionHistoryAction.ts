import { ThunkConfig } from "@/components/providers/StoreProvider/config/StateSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toasterActions } from "@/components/shared/ui/Toaster";
import { ReactionHistory } from "../types/ReactionSchema";

export const getReactionHistoryAction = createAsyncThunk<
	ReactionHistory,
	string,
	ThunkConfig<string>
>("getReactionHistoryAction", async (id, thunkApi) => {
	const { extra, dispatch, rejectWithValue } = thunkApi;
	try {
		const response = await extra.api.get<ReactionHistory>(
			`reaction/get_history?reactionId=${id}`
		);
		if (!response.data) {
			throw new Error();
		}
		return response.data;
	} catch (e) {
		const errMessage = "Не удалось загрузить данные отклика!";
		dispatch(toasterActions.setError([errMessage]));
		return rejectWithValue(errMessage);
	}
});
