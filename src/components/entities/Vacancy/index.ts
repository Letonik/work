import type {
	VacancySchema,
	VacancyDataType,
	GetVacancyListActionDataType,
} from "./model/types/VacancySchema";
import { vacancyActions, vacancyReducer } from "./model/slice/vacancySlice";
import { createVacancyAction } from "./model/actions/createVacancyAction";
import { getVacancyListAction } from "./model/actions/getVacancyListAction";
import { setVacancyToArchiveAction } from "./model/actions/setVacancyToArchiveAction";
import { setVacancyOutArchiveAction } from "./model/actions/setVacancyOutArchiveAction";
import { deleteVacancyAction } from "./model/actions/deleteVacancyAction";
import { getVacancyOneAction } from "./model/actions/getVacancyOneAction";
import { updateVacancyAction } from "./model/actions/updateVacancyAction";
import { getVacancyNamesAction } from "./model/actions/getVacancyNamesAction";
import {
	getIsLoadingDeleteVacancy,
	getIsLoadingCreateVacancy,
	getIsLoadingGetOneVacancy,
	getIsLoadingPublishVacancy,
	getIsLoadingNamesVacancy,
	getIsLoadingVacancy,
	getCountVacancy,
	getPageVacancy,
	getTotalVacancy,
	getVacancyListVacancy,
	getVacancyDataVacancy,
	getVacancyNamesVacancy,
} from "./model/selectors/vacancySelectors";

export {
	vacancyActions,
	vacancyReducer,

	// actions
	createVacancyAction,
	getVacancyListAction,
	setVacancyToArchiveAction,
	setVacancyOutArchiveAction,
	deleteVacancyAction,
	getVacancyOneAction,
	updateVacancyAction,
	getVacancyNamesAction,

	// selectors
	getIsLoadingDeleteVacancy,
	getIsLoadingCreateVacancy,
	getIsLoadingGetOneVacancy,
	getIsLoadingPublishVacancy,
	getIsLoadingNamesVacancy,
	getIsLoadingVacancy,
	getCountVacancy,
	getPageVacancy,
	getTotalVacancy,
	getVacancyListVacancy,
	getVacancyDataVacancy,
	getVacancyNamesVacancy,

	// types
	VacancySchema,
	VacancyDataType,
	GetVacancyListActionDataType,
};
