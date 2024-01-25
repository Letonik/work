type Experience = {
	name: string;
	value: string;
};

export const experience: Record<string, Experience> = {
	all: {
		value: "all",
		name: "Любой",
	},
	none: {
		value: "none",
		name: "Нет опыта",
	},
	one: {
		value: "one",
		name: "От 1 года до 3 лет",
	},
	three: {
		value: "three",
		name: "От 3 до 6 лет",
	},
	six: {
		value: "six",
		name: "Более 6 лет",
	},
};
