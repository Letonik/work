import { ThunkConfig } from "@/components/providers/StoreProvider/config/StateSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toasterActions } from "@/components/shared/ui/Toaster";

type PayloadType = {
	success: true;
};

export const updateVacancyAction = createAsyncThunk<
	PayloadType,
	string,
	ThunkConfig<string>
>("updateVacancyAction", async (id, thunkApi) => {
	const { extra, getState, dispatch, rejectWithValue } = thunkApi;

	try {
		const { vacancy } = getState();
		const response = await extra.api.put<PayloadType>("vacancy/update", {
			_id: id,
			properties: vacancy.vacancyData,
		});
		if (!response.data) {
			throw new Error();
		}
		extra.navigate.push("/admin/vacancy/active");
		dispatch(toasterActions.setSuccess(["Вакансия упешно обновлена!"]));
		return response.data;
	} catch (e) {
		const errMessage = "Не удалось обновить вакансию! Ошибка на сервере!";
		dispatch(toasterActions.setError([errMessage]));
		return rejectWithValue(errMessage);
	}
});
