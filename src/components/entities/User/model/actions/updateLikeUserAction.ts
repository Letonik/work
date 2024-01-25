import { ThunkConfig } from "@/components/providers/StoreProvider/config/StateSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toasterActions } from "@/components/shared/ui/Toaster";

type PayloadType = {
	success: true;
};

type DateType = {
	isLike: boolean;
	userId: string;
};

export const updateLikeUserAction = createAsyncThunk<
	PayloadType,
	DateType,
	ThunkConfig<string>
>("updateLikeUserAction", async (data, thunkApi) => {
	const { extra, dispatch, rejectWithValue } = thunkApi;
	try {
		const response = await extra.api.put<PayloadType>("user/update_like", data);
		if (!response.data) {
			throw new Error();
		}
		return response.data;
	} catch (e) {
		const status = "Избранное";
		const errorMessage = `Не удалось обновить статус ${status} У кандидата!`;
		dispatch(toasterActions.setError([errorMessage]));
		return rejectWithValue(errorMessage);
	}
});
