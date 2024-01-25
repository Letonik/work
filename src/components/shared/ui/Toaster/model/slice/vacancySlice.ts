import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ToasterSchema } from "../types/ToasterSchema";

const initialState: ToasterSchema = {
	error: [],
	success: [],
};

export const toasterSlice = createSlice({
	name: "toaster",
	initialState,
	reducers: {
		setError: (state, action: PayloadAction<string[]>) => {
			state.error = action.payload;
		},
		setSuccess: (state, action: PayloadAction<string[]>) => {
			state.success = action.payload;
		},
	},
});

export const { actions: toasterActions } = toasterSlice;
export const { reducer: toasterReducer } = toasterSlice;
