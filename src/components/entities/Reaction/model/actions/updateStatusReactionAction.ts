import { ThunkConfig } from "@/components/providers/StoreProvider/config/StateSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toasterActions } from "@/components/shared/ui/Toaster";
import { getCountStatusesAction } from "@/components/entities/Reaction";

type PayloadType = {
	success: true;
};

export const updateStatusReactionAction = createAsyncThunk<
	string,
	string,
	ThunkConfig<string>
>("updateStatusReactionAction", async (status, thunkApi) => {
	const { extra, dispatch, rejectWithValue, getState } = thunkApi;
	try {
		const reactionId = getState().reaction.reaction?._id;
		const data = { reactionId, status };
		const response = await extra.api.put<PayloadType>(
			"reaction/update_status",
			data
		);
		if (!response.data) {
			throw new Error();
		}
		dispatch(toasterActions.setSuccess(["Изменения успешьно сохранены!"]));
		dispatch(getCountStatusesAction());
		return status;
	} catch (e) {
		const errorMessage = "Не удалось обновить статус отклика!";
		dispatch(toasterActions.setError([errorMessage]));
		return rejectWithValue(errorMessage);
	}
});
