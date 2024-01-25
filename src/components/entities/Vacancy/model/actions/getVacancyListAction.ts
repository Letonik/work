import { ThunkConfig } from "@/components/providers/StoreProvider/config/StateSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	addQueryParams,
	getQueryParams,
} from "@/components/shared/url/addQueryParams/addQueryParams";
import { toasterActions } from "@/components/shared/ui/Toaster";
import {
	GetVacancyListActionDataType,
	VacancyDataType,
} from "../types/VacancySchema";

type PayloadType = {
	count: number;
	data: VacancyDataType[];
};

export const getVacancyListAction = createAsyncThunk<
	PayloadType,
	GetVacancyListActionDataType,
	ThunkConfig<string>
>("getVacancyListAction", async (data, thunkApi) => {
	const { extra, dispatch, rejectWithValue } = thunkApi;
	addQueryParams(data, extra.navigate);
	try {
		const response = await extra.api.get<PayloadType>(
			`vacancy/get${getQueryParams(data)}`
		);
		if (!response.data) {
			throw new Error();
		}
		return response.data;
	} catch (e) {
		const errMessage = "Не удалось загрузить список вакансий!";
		dispatch(toasterActions.setError([errMessage]));
		return rejectWithValue(errMessage);
	}
});
