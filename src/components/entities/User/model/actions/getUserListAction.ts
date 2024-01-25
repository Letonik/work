import { ThunkConfig } from "@/components/providers/StoreProvider/config/StateSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	addQueryParams,
	getQueryParams,
} from "@/components/shared/url/addQueryParams/addQueryParams";
import { toasterActions } from "@/components/shared/ui/Toaster";
import { GetUserListActionDataType, UserListItem } from "../types/UserSchema";

type PayloadType = {
	count: number;
	data: UserListItem[];
};

export const getUserListAction = createAsyncThunk<
	PayloadType,
	GetUserListActionDataType,
	ThunkConfig<string>
>("getUserListAction", async (data, thunkApi) => {
	const { extra, dispatch, rejectWithValue } = thunkApi;
	addQueryParams(data, extra.navigate);
	try {
		const response = await extra.api.get<PayloadType>(
			`user/get${getQueryParams(data)}`
		);
		if (!response.data) {
			throw new Error();
		}
		return response.data;
	} catch (e) {
		const errMessage = "Не удалось загрузить список кандидатов!";
		dispatch(toasterActions.setError([errMessage]));
		return rejectWithValue(errMessage);
	}
});
