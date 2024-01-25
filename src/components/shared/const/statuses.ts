type Status = {
	name: string;
	value: string;
};

export const STATUSES: Record<string, Status> = {
	application: {
		name: "Заявки",
		value: "application",
	},
	consideration: {
		name: "На рассмотрении",
		value: "consideration",
	},
	interview: {
		name: "Собеседование",
		value: "interview",
	},
	employee: {
		name: "Сотрудники",
		value: "employee",
	},
};
