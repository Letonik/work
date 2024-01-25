/* eslint-disable */
import { StateSchema } from "@/components/providers/StoreProvider";

export const getReactionIdTM = (state: StateSchema) =>
	state.translateModal.reactionId;
export const getUserIdTM = (state: StateSchema) => state.translateModal.userId;
export const getVacancyIdTM = (state: StateSchema) =>
	state.translateModal.vacancyId;
export const getDidChangeTM = (state: StateSchema) =>
	state.translateModal.didChange;
export const getStepTM = (state: StateSchema) => state.translateModal.step;
export const getDirectionTM = (state: StateSchema) =>
	state.translateModal.direction;
export const getHistoryTM = (state: StateSchema) =>
	state.translateModal.historyPaginate;
export const getIsOpenModalTM = (state: StateSchema) =>
	state.translateModal.isOpenModal;
