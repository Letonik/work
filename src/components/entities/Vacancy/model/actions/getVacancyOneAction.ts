import { ThunkConfig } from "@/components/providers/StoreProvider/config/StateSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toasterActions } from "@/components/shared/ui/Toaster";
import { VacancyDataType } from "../types/VacancySchema";

export const getVacancyOneAction = createAsyncThunk<
	VacancyDataType,
	string,
	ThunkConfig<string>
>("getVacancyOneAction", async (id, thunkApi) => {
	const { extra, dispatch, rejectWithValue } = thunkApi;
	try {
		const response = await extra.api.get<VacancyDataType>(
			`vacancy/get_one?_id=${id}`
		);
		if (!response.data) {
			throw new Error();
		}
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { createdAt, updatedAt, ...payload } = response.data;
		return payload;
	} catch (e) {
		const errMessage = "Не удалось получить данные о вакансии!";
		dispatch(toasterActions.setError([errMessage]));
		return rejectWithValue(errMessage);
	}
});
