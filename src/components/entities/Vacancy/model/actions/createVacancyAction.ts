import { ThunkConfig } from "@/components/providers/StoreProvider/config/StateSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toasterActions } from "@/components/shared/ui/Toaster";

export const createVacancyAction = createAsyncThunk<
	any,
	void,
	ThunkConfig<string>
>("createVacancyAction", async (_, thunkApi) => {
	const { extra, getState, dispatch, rejectWithValue } = thunkApi;

	try {
		const { vacancy } = getState();
		const response = await extra.api.post<any>(
			"vacancy/create",
			vacancy.vacancyData
		);
		if (!response.data) {
			throw new Error();
		}
		extra.navigate.push("/admin/vacancy/active");
		dispatch(toasterActions.setSuccess(["Вакансия упешно создана!"]));
		return response.data;
	} catch (e) {
		const errMessage = "Не удалось создать вакансию! Ошибка на сервере!";
		dispatch(toasterActions.setError([errMessage]));
		return rejectWithValue(errMessage);
	}
});
