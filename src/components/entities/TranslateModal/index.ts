import {
	translateModalActions,
	translateModalReducer,
} from "./model/slice/translateModalSlice";
import {
	getReactionIdTM,
	getUserIdTM,
	getVacancyIdTM,
	getDidChangeTM,
	getStepTM,
	getDirectionTM,
	getHistoryTM,
	getIsOpenModalTM,
} from "./model/selectors/translateModalSelectors";
import type { TranslateModalSchema } from "./model/types/TranslateModalSchema";

export {
	translateModalActions,
	translateModalReducer,

	// selectors
	getReactionIdTM,
	getUserIdTM,
	getVacancyIdTM,
	getDidChangeTM,
	getStepTM,
	getDirectionTM,
	getHistoryTM,
	getIsOpenModalTM,

	// types
	TranslateModalSchema,
};
