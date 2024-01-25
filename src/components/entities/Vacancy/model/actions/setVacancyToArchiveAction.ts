import { ThunkConfig } from "@/components/providers/StoreProvider/config/StateSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getVacancyListAction } from "@/components/entities/Vacancy";
import { toasterActions } from "@/components/shared/ui/Toaster";

type PayloadType = {
	success: true;
};

export const setVacancyToArchiveAction = createAsyncThunk<
	PayloadType,
	string,
	ThunkConfig<string>
>("setVacancyToArchiveAction", async (data, thunkApi) => {
	const { extra, dispatch, rejectWithValue } = thunkApi;
	try {
		const response = await extra.api.put<PayloadType>("vacancy/set_archive", {
			_id: data,
		});
		if (!response.data) {
			throw new Error();
		}
		dispatch(
			toasterActions.setSuccess(["Вакансия упешно перемещена в архив!"])
		);
		const searchParams = new URLSearchParams(window.location.search);
		const queryParams = Object.fromEntries(searchParams.entries());
		if (queryParams) {
			// @ts-ignore
			dispatch(getVacancyListAction(queryParams));
		}

		return response.data;
	} catch (e) {
		dispatch(
			toasterActions.setError(["Не удалось добавить вакансию в архив!"])
		);
		return rejectWithValue("Не удалось добавить вакансию в архив!");
	}
});
