export interface ReactionListItem {
	_id: string;
	firstName: string;
	lastName: string;
	city: string;
	country: string;
	name: string;
	department: string;
}

export interface Comments {
	author: string;
	date: string;
	comment: string;
	_id: string;
}

export interface Reaction {
	_id: string;
	user: {
		firstName: string;
		middleName: string;
		lastName: string;
		email: string;
		phoneNumber: string;
	};
	vacancy: {
		_id: string;
		name: string;
		city: string;
		country: number;
		department: string;
	};
	coverLetter: string;
	status: string;
	comments: Comments[];
	createdAt: string;
}

export interface HistoryElemReaction {
	_id: string;
	value: string;
	date: string;
	vacancyName?: boolean;
	status?: string;
}

export interface ReactionHistory {
	_id: string;
	user: {
		firstName: string;
		middleName: string;
		lastName: string;
	};
	vacancy: {
		_id: string;
		name: string;
	};
	history: HistoryElemReaction[];
	createdAt: string;
}

export interface CountStatutes {
	all: number;
	application: number;
	consideration: number;
	interview: number;
	employee: number;
}

export interface ReactionSchema {
	reactionList: ReactionListItem[];
	reaction: Reaction | null;
	history: ReactionHistory | null;
	isLoadingList: boolean;
	isLoadingReaction: boolean;
	isLoadingComment: boolean;
	isLoadingStatus: boolean;
	isLoadingHistory: boolean;
	count: number;
	countStatuses: CountStatutes;
	page: number;
	total: number;
}

// actions
export type GetReactionListActionDataType = {
	page: number;
	isLike?: boolean;
	isBlackList?: boolean;
	firstName?: string;
	lastName?: string;
	age?: string;
	vacancy?: string;
	city?: string;
	phoneNumber?: string;
	email?: string;
	dateStart?: string;
	dateEnd?: string;
};
