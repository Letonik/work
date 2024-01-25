export interface Reaction {
	_id: string;
	vacancy: {
		_id: string;
		name: string;
	};
}

export interface ReactionUser {
	_id: string;
	createdAt: string;
	vacancy: {
		_id: string;
		name: string;
		city: string;
		country: number;
	};
}

export interface UserListItem {
	_id: string;
	firstName: string;
	lastName: string;
	city: string;
	country: string;
	reactions: Reaction[];
}

export interface Institutes {
	educationInstitution: string;
	specialization: string;
	yearOfEnding: string;
	_id: string;
}

export interface PlacesOfWork {
	companyName: string;
	position: string;
	yearStart: string;
	yearEnd: string;
	description: string;
	_id: string;
}

export interface Comments {
	author: string;
	date: string;
	comment: string;
	_id: string;
}

export interface User {
	_id: string;
	firstName: string;
	middleName: string;
	lastName: string;
	city: string;
	country: string;
	email: string;
	birthDay: string;
	phoneNumber: string;
	educationLevel: string;
	institutes: Institutes[];
	certificate: {
		links: string[];
		fileLinks: string[];
		_id: string;
	};
	experience: string;
	placesOfWork: PlacesOfWork[];
	isBlackList: boolean;
	isLike: boolean;
	comments: Comments[];
	reactions: ReactionUser[];
	createdAt: string;
}

export interface HistoryElemUser {
	_id: string;
	value: string;
	date: string;
	vacancyName?: boolean;
	status?: string;
}

export interface ReactionUserHistory {
	_id: string;
	history: HistoryElemUser[];
	vacancy: {
		_id: string;
		name: string;
	};
}

export interface UserHistory {
	_id: string;
	firstName: string;
	middleName: string;
	lastName: string;
	reactions: ReactionUserHistory[];
	createdAt: string;
}

export interface ApplicantData {
	firstName: string;
	lastName: string;
	middleName: string;
	phoneNumber: string;
	email: string;
	city: string;
	birthDay: string;
	vacancy: string;
	status: string;
	comment: string;
}

export interface UserSchema {
	user: User | null;
	applicantData: ApplicantData;
	userList: UserListItem[];
	history: UserHistory | null;
	isLoadingList: boolean;
	isLoadingUser: boolean;
	isLoadingCreate: boolean;
	isLoadingComment: boolean;
	isLoadingHistory: boolean;
	count: number;
	page: number;
	total: number;
}

// actions
export type GetUserListActionDataType = {
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
