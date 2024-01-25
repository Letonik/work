import { ThunkConfig } from "@/components/providers/StoreProvider/config/StateSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toasterActions } from "@/components/shared/ui/Toaster";
import { CountStatutes } from "../types/ReactionSchema";

export const getCountStatusesAction = createAsyncThunk<
	CountStatutes,
	void,
	ThunkConfig<string>
>("getCountStatusesAction", async (data, thunkApi) => {
	const { extra, dispatch, rejectWithValue } = thunkApi;
	try {
		const response = await extra.api.get<CountStatutes>("reaction/get_count");
		if (!response.data) {
			throw new Error();
		}
		return response.data;
	} catch (e) {
		const errMessage = "Не обновить колличество заявок!";
		dispatch(toasterActions.setError([errMessage]));
		return rejectWithValue(errMessage);
	}
});
