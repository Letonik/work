import { ThunkConfig } from "@/components/providers/StoreProvider/config/StateSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	addQueryParams,
	getQueryParams,
} from "@/components/shared/url/addQueryParams/addQueryParams";
import { toasterActions } from "@/components/shared/ui/Toaster";
import {
	GetReactionListActionDataType,
	ReactionListItem,
} from "../types/ReactionSchema";

type PayloadType = {
	count: number;
	data: ReactionListItem[];
};

export const getReactionListAction = createAsyncThunk<
	PayloadType,
	GetReactionListActionDataType,
	ThunkConfig<string>
>("getReactionListAction", async (data, thunkApi) => {
	const { extra, dispatch, rejectWithValue } = thunkApi;
	addQueryParams(data, extra.navigate);
	try {
		const response = await extra.api.get<PayloadType>(
			`reaction/get${getQueryParams(data)}`
		);
		if (!response.data) {
			throw new Error();
		}
		return response.data;
	} catch (e) {
		const errMessage = "Не удалось загрузить список откликов!";
		dispatch(toasterActions.setError([errMessage]));
		return rejectWithValue(errMessage);
	}
});
