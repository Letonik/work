/* eslint-disable */
import { StateSchema } from "@/components/providers/StoreProvider";

export const getVacancyListVacancy = (state: StateSchema) =>
	state.vacancy.vacancyList;
export const getVacancyNamesVacancy = (state: StateSchema) =>
	state.vacancy.vacancyNames;
export const getVacancyDataVacancy = (state: StateSchema) =>
	state.vacancy.vacancyData;
export const getCountVacancy = (state: StateSchema) => state.vacancy.count;
export const getPageVacancy = (state: StateSchema) => state.vacancy.page;
export const getTotalVacancy = (state: StateSchema) => state.vacancy.total;
export const getIsLoadingVacancy = (state: StateSchema) =>
	state.vacancy.isLoading;
export const getIsLoadingNamesVacancy = (state: StateSchema) =>
	state.vacancy.isLoadingNames;
export const getIsLoadingGetOneVacancy = (state: StateSchema) =>
	state.vacancy.isLoadingGetOne;
export const getIsLoadingCreateVacancy = (state: StateSchema) =>
	state.vacancy.isLoadingCreate;
export const getIsLoadingDeleteVacancy = (state: StateSchema) =>
	state.vacancy.isLoadingDelete;
export const getIsLoadingPublishVacancy = (state: StateSchema) =>
	state.vacancy.isLoadingPublish;
