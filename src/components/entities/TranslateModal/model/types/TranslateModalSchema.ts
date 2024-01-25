export interface TranslateModalSchema {
	reactionId: string;
	userId: string;
	vacancyId: string;
	didChange: boolean;
	isOpenModal: boolean;
	historyPaginate: string[];
	step: string;
	direction: number;
}
