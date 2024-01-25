export interface VacancyDataType {
	_id?: string;
	name: string;
	department: string;
	city: string;
	country: number;
	salary?: {
		min: number;
		max: number;
		currency: string;
	};
	address: string;
	experience?: string;
	descriptionJson: any;
	isActive?: boolean;
	updatedAt?: string;
	createdAt?: string;
}

export interface VacancySchema {
	vacancyData: VacancyDataType;
	vacancyList: VacancyDataType[];
	vacancyNames: string[];
	isLoadingCreate: boolean;
	isLoadingDelete: boolean;
	isLoadingGetOne: boolean;
	isLoadingPublish: boolean;
	isLoadingNames: boolean;
	isLoading: boolean;
	count: number;
	page: number;
	total: number;
}

// actions
export type GetVacancyListActionDataType = {
	isActive: boolean;
	page: number;
	name?: string;
	city?: string;
	department?: string;
	dateStart?: string;
	dateEnd?: string;
};
