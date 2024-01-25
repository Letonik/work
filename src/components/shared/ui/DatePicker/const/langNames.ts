const weekHeadDays: Record<"ru" | "en", string[]> = {
	ru: ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"],
	en: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
};

const daysMap: Record<"ru" | "en", string[]> = {
	ru: [
		"Понедельник",
		"Вторник",
		"Среда",
		"Четверг",
		"Пятница",
		"Суббота",
		"Воскресенье",
	],
	en: [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	],
};

const monthMap: Record<"ru" | "en", string[]> = {
	ru: [
		"Январь",
		"Февраль",
		"Март",
		"Апрель",
		"Май",
		"Июнь",
		"Июль",
		"Август",
		"Сентябрь",
		"Октябрь",
		"Ноябрь",
		"Декабрь",
	],
	en: [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	],
};

const monthShortMap: Record<"ru" | "en", string[]> = {
	ru: [
		"янв",
		"фев",
		"мар",
		"апр",
		"мая",
		"июн",
		"июл",
		"авг",
		"сен",
		"окт",
		"ноя",
		"дек",
	],
	en: [
		"jan",
		"feb",
		"mar",
		"apr",
		"may",
		"jun",
		"jul",
		"aug",
		"sep",
		"oct",
		"nov",
		"dec",
	],
};

const emptyViewDate: Record<"ru" | "en", [string, string]> = {
	ru: ["дд.мм.гггг", "дд.мм.гггг"],
	en: ["dd.mm.yyyy", "dd.mm.yyyy"],
};

type NamesType = {
	weekHeadDays: string[];
	daysMap: string[];
	monthMap: string[];
	monthShortMap: string[];
	emptyViewDate: [string, string];
};
export const getLangNames = (lang: "ru" | "en"): NamesType => {
	return {
		weekHeadDays: weekHeadDays[lang],
		daysMap: daysMap[lang],
		monthMap: monthMap[lang],
		monthShortMap: monthShortMap[lang],
		emptyViewDate: emptyViewDate[lang],
	};
};
