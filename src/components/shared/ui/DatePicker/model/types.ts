import React, {
	ChangeEvent,
	Dispatch,
	MutableRefObject,
	RefObject,
	SetStateAction,
} from "react";

export type LangType = "ru" | "en";

export type GetDayDetailsArgs = {
	firstDay: number;
	index: number;
	month: number;
	numberOfDays: number;
	year: number;
};

export type DayDetails = {
	date: number;
	day: number;
	dayString: string;
	month: number;
	timestamp: number;
};

export type DateData = {
	date: number;
	year: number;
	month: number;
};

export type DateType = "start" | "end" | void;

export type RefType = React.ForwardedRef<{
	clear: () => void;
} | null>;

export type OnChangeArgsType<T extends boolean> = T extends true
	? { dateStart: string | undefined; dateEnd: string | undefined }
	: { date: string | undefined };

export type OnChangeType<T extends boolean> = (
	arg: OnChangeArgsType<T>
) => void;

export type OnDateClick = (day: DayDetails) => void;
export type UpdateDateFromInput = (dateType: DateType) => void;
export type GetMonthStr = (month: number) => string;
export type SetMonth = (month: number) => void;
export type SetYear = (month: number) => void;
export type OnChangeDateInputValue = (
	e: ChangeEvent<HTMLInputElement>,
	setDate: Dispatch<SetStateAction<string>>
) => void;
export type OnChangeDateInputValueWrapper = (
	e: ChangeEvent<HTMLInputElement>
) => void;

export type UseDatePicker = (
	lang: LangType,
	range: boolean,
	onChange: OnChangeType<typeof range>,
	date: string | undefined,
	dateStart: string | undefined,
	dateEnd: string | undefined,
	refClear?: RefType
) => {
	setShowDatePicker: Dispatch<SetStateAction<boolean>>;
	onSetShowDateStartInput: () => void;
	onSetShowDateEndInput: () => void;
	onSetShowDateInput: () => void;
	updateDateFromInput: UpdateDateFromInput;
	getMonthStr: GetMonthStr;
	setMonth: SetMonth;
	setYear: SetYear;
	onDateClick: OnDateClick;
	showDatePicker: boolean;
	showDateStartInput: boolean;
	showDateEndInput: boolean;
	showDateInput: boolean;
	monthState: number;
	yearState: number;
	monthDetails: DayDetails[];
	todayTimestamp: number;
	weekHeadDays: string[];
	selectedDay: number | undefined;
	selectedEndDay: number | undefined;
	selectedStartDay: number | undefined;
	refDatePicker: RefObject<HTMLDivElement>;
	refMainInput: RefObject<HTMLDivElement>;
	refDateInputStart: MutableRefObject<HTMLInputElement>;
	refDateInputEnd: MutableRefObject<HTMLInputElement>;
	refDateInput: MutableRefObject<HTMLInputElement>;
	dateView: string;
	dateViewRange: [string, string];
};
