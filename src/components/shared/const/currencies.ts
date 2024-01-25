type Currency = {
	name: string;
	value: string;
};

export const currencies: Record<string, Currency> = {
	rub: {
		value: "rub",
		name: "₽",
	},
	kzt: {
		value: "kzt",
		name: "₸",
	},
};
