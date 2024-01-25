import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VacancyDataType, VacancySchema } from "../types/VacancySchema";
import { createVacancyAction } from "../actions/createVacancyAction";
import { getVacancyListAction } from "../actions/getVacancyListAction";
import { setVacancyToArchiveAction } from "../actions/setVacancyToArchiveAction";
import { deleteVacancyAction } from "../actions/deleteVacancyAction";
import { getVacancyOneAction } from "../actions/getVacancyOneAction";
import { updateVacancyAction } from "../actions/updateVacancyAction";
import { setVacancyOutArchiveAction } from "../actions/setVacancyOutArchiveAction";
import { getVacancyNamesAction } from "../actions/getVacancyNamesAction";

const initialVacancyData = {
	name: "",
	department: "",
	city: "",
	country: 0,
	salary: {
		min: 0,
		max: 0,
		currency: "rub",
	},
	address: "",
	experience: "all",
	descriptionJson: null,
};

const initialState: VacancySchema = {
	vacancyData: initialVacancyData,
	isLoadingCreate: false,
	isLoadingDelete: false,
	isLoadingPublish: false,
	isLoadingGetOne: false,
	isLoadingNames: false,
	isLoading: false,
	vacancyList: [],
	vacancyNames: [],
	count: 0,
	page: 1,
	total: 0,
};

const checkSalary = (key: string): boolean => {
	return ["min", "max", "currency"].includes(key);
};

export const vacancySlice = createSlice({
	name: "vacancySlice",
	initialState,
	reducers: {
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
		},
		clearVacancyData: (state) => {
			state.vacancyData = initialVacancyData;
		},
		clearVacancyList: (state) => {
			state.vacancyList = [];
			state.count = 0;
			state.page = 1;
		},
		setVacancyValue: (
			state,
			action: PayloadAction<{ key: string; value: any }>
		) => {
			const { key, value } = action.payload;
			if (!checkSalary(key)) {
				// @ts-ignore
				state.vacancyData[key] = value;
			} else {
				// @ts-ignore
				state.vacancyData.salary[key] = value;
			}
		},
		setVacancy: (state, action: PayloadAction<VacancyDataType>) => {
			state.vacancyData = action.payload;
		},
		setVacancyActive: (state, action: PayloadAction<boolean>) => {
			state.vacancyData.isActive = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createVacancyAction.pending, (state) => {
				state.isLoadingCreate = true;
			})
			.addCase(createVacancyAction.fulfilled, (state) => {
				state.isLoadingCreate = false;
			})
			.addCase(createVacancyAction.rejected, (state) => {
				state.isLoadingCreate = false;
			})
			.addCase(updateVacancyAction.pending, (state) => {
				state.isLoadingCreate = true;
			})
			.addCase(updateVacancyAction.fulfilled, (state) => {
				state.isLoadingCreate = false;
			})
			.addCase(updateVacancyAction.rejected, (state) => {
				state.isLoadingCreate = false;
			})
			.addCase(getVacancyListAction.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getVacancyListAction.fulfilled, (state, action) => {
				const { count, data } = action.payload;
				state.vacancyList = data;
				state.count = count;
				state.total = Math.ceil(count / 10);
				state.isLoading = false;
			})
			.addCase(getVacancyListAction.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(getVacancyNamesAction.pending, (state) => {
				state.isLoadingNames = true;
			})
			.addCase(getVacancyNamesAction.fulfilled, (state, action) => {
				state.vacancyNames = action.payload;
				state.isLoadingNames = false;
			})
			.addCase(getVacancyNamesAction.rejected, (state) => {
				state.isLoadingNames = false;
			})
			.addCase(setVacancyToArchiveAction.pending, (state) => {
				state.isLoadingDelete = true;
			})
			.addCase(setVacancyToArchiveAction.fulfilled, (state) => {
				state.isLoadingDelete = false;
			})
			.addCase(setVacancyToArchiveAction.rejected, (state) => {
				state.isLoadingDelete = false;
			})
			.addCase(setVacancyOutArchiveAction.pending, (state) => {
				state.isLoadingPublish = true;
			})
			.addCase(setVacancyOutArchiveAction.fulfilled, (state) => {
				state.isLoadingPublish = false;
			})
			.addCase(setVacancyOutArchiveAction.rejected, (state) => {
				state.isLoadingPublish = false;
			})
			.addCase(deleteVacancyAction.pending, (state) => {
				state.isLoadingDelete = true;
			})
			.addCase(deleteVacancyAction.fulfilled, (state) => {
				state.isLoadingDelete = false;
			})
			.addCase(deleteVacancyAction.rejected, (state) => {
				state.isLoadingDelete = false;
			})
			.addCase(getVacancyOneAction.pending, (state) => {
				state.isLoadingGetOne = true;
			})
			.addCase(getVacancyOneAction.fulfilled, (state, action) => {
				state.isLoadingGetOne = false;
				state.vacancyData = action.payload;
			})
			.addCase(getVacancyOneAction.rejected, (state) => {
				state.isLoadingGetOne = false;
			});
	},
});
export const { actions: vacancyActions } = vacancySlice;
export const { reducer: vacancyReducer } = vacancySlice;
