import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TranslateModalSchema } from "../types/TranslateModalSchema";

const initialState: TranslateModalSchema = {
	reactionId: "",
	userId: "",
	vacancyId: "",
	didChange: false,
	historyPaginate: [],
	step: "",
	direction: 1,
	isOpenModal: false,
};
export const translateModalSlice = createSlice({
	name: "translateModalSlice",
	initialState,
	reducers: {
		setReactionId: (state, action: PayloadAction<string>) => {
			state.reactionId = action.payload;
		},
		setUserId: (state, action: PayloadAction<string>) => {
			state.userId = action.payload;
		},
		setVacancyId: (state, action: PayloadAction<string>) => {
			state.vacancyId = action.payload;
		},
		setStep: (state, action: PayloadAction<string>) => {
			if (state.step) {
				state.historyPaginate.push(state.step);
			}
			state.step = action.payload;
			state.direction = 1;
		},
		setInitialStep: (state, action: PayloadAction<string>) => {
			state.step = action.payload;
			state.direction = 1;
		},
		goBack: (state) => {
			const lastElem = state.historyPaginate.pop();
			if (lastElem) state.step = lastElem;
			state.direction = -1;
		},
		setDidChange: (state) => {
			state.didChange = true;
		},
		setOpen: (state) => {
			state.isOpenModal = true;
		},
		clearTM: (state) => {
			state.reactionId = "";
			state.userId = "";
			state.vacancyId = "";
			state.didChange = false;
			state.historyPaginate = [];
			state.step = "";
			state.direction = 1;
			state.isOpenModal = false;
		},
	},
});
export const { actions: translateModalActions } = translateModalSlice;
export const { reducer: translateModalReducer } = translateModalSlice;
