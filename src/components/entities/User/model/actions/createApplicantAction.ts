import { ThunkConfig } from "@/components/providers/StoreProvider/config/StateSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toasterActions } from "@/components/shared/ui/Toaster";

export const createApplicantAction = createAsyncThunk<
	{ success: true },
	void,
	ThunkConfig<string>
>("createApplicantAction", async (_, thunkApi) => {
	const { extra, getState, dispatch, rejectWithValue } = thunkApi;

	try {
		const { user } = getState();
		const response = await extra.api.post<any>(
			"user/add_applicant",
			user.applicantData
		);
		if (!response.data) {
			throw new Error();
		}
		extra.navigate.push("/admin/resume/all");
		dispatch(toasterActions.setSuccess(["Соискатель упешно создан!"]));
		return response.data;
	} catch (e) {
		const errMessage =
			"Не удалось создать соискателя! Пожалуйста проверьте, все ли поля были заполнены?";
		dispatch(toasterActions.setError([errMessage]));
		return rejectWithValue(errMessage);
	}
});
