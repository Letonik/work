import { ThunkConfig } from "@/components/providers/StoreProvider/config/StateSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toasterActions } from "@/components/shared/ui/Toaster";

type DataSend = {
	name: string;
	city?: string;
};

const objectToQueryString = (obj: Record<string, string>) => {
	const queryParams: string[] = [];
	Object.keys(obj).forEach((key) => {
		if (obj[key] !== "") {
			queryParams.push(
				`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
			);
		}
	});
	return queryParams.join("&");
};

export const getVacancyNamesAction = createAsyncThunk<
	string[],
	DataSend,
	ThunkConfig<string>
>("getVacancyNamesAction", async (data, thunkApi) => {
	const { extra, dispatch, rejectWithValue } = thunkApi;
	try {
		const response = await extra.api.get<string[]>(
			`vacancy/get_names?${objectToQueryString(data)}`
		);
		if (!response.data) {
			throw new Error();
		}
		return response.data;
	} catch (e) {
		const errMessage = "Не удалось загрузить названия вакансий в поле поиска!";
		dispatch(toasterActions.setError([errMessage]));
		return rejectWithValue(errMessage);
	}
});
