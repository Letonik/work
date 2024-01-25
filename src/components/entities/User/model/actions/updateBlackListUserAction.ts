import { ThunkConfig } from "@/components/providers/StoreProvider/config/StateSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toasterActions } from "@/components/shared/ui/Toaster";

type PayloadType = {
	success: true;
};

type DateType = {
	isBlackList: boolean;
	userId: string;
};

export const updateBlackListUserAction = createAsyncThunk<
	PayloadType,
	DateType,
	ThunkConfig<string>
>("updateBlackListUserAction", async (data, thunkApi) => {
	const { extra, dispatch, rejectWithValue } = thunkApi;
	try {
		const response = await extra.api.put<PayloadType>("user/update_bl", data);
		if (!response.data) {
			throw new Error();
		}
		return response.data;
	} catch (e) {
		const status = "ЧС";
		const errorMessage = `Не удалось обновить статус ${status} у кандидата!`;
		dispatch(toasterActions.setError([errorMessage]));
		return rejectWithValue(errorMessage);
	}
});
