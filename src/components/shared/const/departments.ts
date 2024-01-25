type Department = {
	name: string;
	value: string;
	color: string;
	bg: string;
};

export const departments: Record<string, Department> = {
	it: {
		name: "IT",
		value: "it",
		color: "#6020A0",
		bg: "#E4D4F4",
	},
	retail: {
		name: "Розница",
		value: "retail",
		color: "#F31260",
		bg: "#FEE7EF",
	},
	stoke: {
		name: "Склад",
		value: "stoke",
		color: "#006FEE",
		bg: "#CCE3FD",
	},
	office: {
		name: "Офис",
		value: "office",
		color: "#F5A524",
		bg: "#FEFCE8",
	},
	photoStudio: {
		name: "Фотостудия",
		value: "photoStudio",
		color: "#17C964",
		bg: "#E8FAF0",
	},
};
