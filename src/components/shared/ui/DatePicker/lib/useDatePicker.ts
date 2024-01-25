import {
	MutableRefObject,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
	useState,
} from "react";
import { useClickAway } from "@uidotdev/usehooks";
import { getLangNames } from "../const/langNames";
import {
	DateData,
	DayDetails,
	GetDayDetailsArgs,
	GetMonthStr,
	OnDateClick,
	SetMonth,
	SetYear,
	UpdateDateFromInput,
	UseDatePicker,
} from "../model/types";

const oneDay = 60 * 60 * 24 * 1000;
const todayTimestamp =
	Date.now() -
	(Date.now() % oneDay) +
	new Date().getTimezoneOffset() * 1000 * 60;
const date = new Date();

export const useDatePicker: UseDatePicker = (
	lang,
	range,
	onChange,
	dateInitial,
	dateInitialEnd,
	dateInitialStart,
	refClear
) => {
	const { weekHeadDays, daysMap, monthMap, monthShortMap, emptyViewDate } =
		getLangNames(lang);

	const initialTimestamp = dateInitial
		? new Date(dateInitial).getTime()
		: undefined;
	const initialTimestampEnd = dateInitialEnd
		? new Date(dateInitialEnd).getTime()
		: undefined;
	const initialTimestampStart = dateInitialStart
		? new Date(dateInitialStart).getTime()
		: undefined;

	const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
	const [showDateInput, setShowDateInput] = useState<boolean>(false);
	const [showDateStartInput, setShowDateStartInput] = useState<boolean>(false);
	const [showDateEndInput, setShowDateEndInput] = useState<boolean>(false);
	const [yearState, setYearState] = useState<number>(date.getFullYear());
	const [monthState, setMonthState] = useState<number>(date.getMonth());
	const [selectedDay, setSelectedDay] = useState<number | undefined>(
		initialTimestamp
	);
	const [monthDetails, setMonthDetails] = useState<DayDetails[]>([]);
	const [selectedStartDay, setSelectedStartDay] = useState<number | undefined>(
		initialTimestampStart
	);
	const [selectedEndDay, setSelectedEndDay] = useState<number | undefined>(
		initialTimestampEnd
	);

	const refMainInput = useRef<HTMLDivElement>(null);
	const refDatePicker = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const onOutCalendar = (e: MouseEvent) => {
			const datePicker = refDatePicker.current;
			const mainInput = refMainInput.current;
			if (
				datePicker &&
				!datePicker.contains(e.target as HTMLDivElement) &&
				mainInput &&
				!mainInput.contains(e.target as HTMLDivElement)
			) {
				setShowDatePicker(false);
			}
		};
		document.addEventListener("mousedown", onOutCalendar);
		return () => {
			document.removeEventListener("mousedown", onOutCalendar);
		};
	}, [refDatePicker, refMainInput]);

	const clear = () => {
		setSelectedDay(undefined);
		setSelectedStartDay(undefined);
		setSelectedEndDay(undefined);
	};

	useImperativeHandle(refClear, () => ({
		clear,
	}));

	const refDateInput: MutableRefObject<HTMLInputElement> = useClickAway(() => {
		if (showDateInput) {
			updateDateFromInput();
			setShowDateInput(false);
		}
	});

	const refDateInputStart: MutableRefObject<HTMLInputElement> = useClickAway(
		() => {
			if (showDateStartInput) {
				updateDateFromInput("start");
				setShowDateStartInput(false);
			}
		}
	);
	const refDateInputEnd: MutableRefObject<HTMLInputElement> = useClickAway(
		() => {
			if (showDateEndInput) {
				updateDateFromInput("end");
				setShowDateEndInput(false);
			}
		}
	);

	const getNumberOfDays = (year: number, month: number) => {
		return 40 - new Date(year, month, 40).getDate();
	};

	const getDayDetails = (args: GetDayDetailsArgs): DayDetails => {
		const getDateRu = args.firstDay === 0 ? 6 : args.firstDay - 1;
		const dateTemp = args.index - (lang === "en" ? args.firstDay : getDateRu);
		const day = args.index % 7;
		let prevMonth = args.month - 1;
		let prevYear = args.year;
		if (prevMonth < 0) {
			prevMonth = 11;
			prevYear -= 1;
		}
		const prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);
		const dateResult =
			(dateTemp < 0
				? prevMonthNumberOfDays + dateTemp
				: dateTemp % args.numberOfDays) + 1;
		let month = 0;
		if (dateTemp < 0) month = -1;
		if (!(dateTemp < 0) && dateTemp >= args.numberOfDays) month = 1;
		const timestamp = new Date(args.year, args.month, dateResult).getTime();
		return {
			date: dateResult,
			day,
			month,
			timestamp,
			dayString: daysMap[day],
		};
	};

	const getMonthDetails = (year: number, month: number): DayDetails[] => {
		const rows = 6;
		const cols = 7;
		const firstDay = new Date(year, month).getDay();
		const numberOfDays = getNumberOfDays(year, month);
		const monthArray = [];
		let currentDay = null;
		let index = 0;

		for (let row = 0; row < rows; row += 1) {
			for (let col = 0; col < cols; col += 1) {
				currentDay = getDayDetails({
					index,
					numberOfDays,
					firstDay,
					year,
					month,
				});
				monthArray.push(currentDay);
				index += 1;
			}
		}
		return monthArray;
	};

	const getDateFromDateString = (dateValue: string): DateData | null => {
		const dateData = dateValue.split("-").map((d) => parseInt(d, 10));
		if (dateData.length < 3) {
			return null;
		}
		const [year, month, dateTemp] = dateData;
		return { year, month, date: dateTemp };
	};

	const getMonthStr: GetMonthStr = (month) =>
		monthMap[Math.max(Math.min(11, month), 0)] || "Month";

	const getDateStringFromTimestamp = (timestamp: number) => {
		const dateObject = new Date(timestamp);
		const month = dateObject.getMonth() + 1;
		const dateTemp = dateObject.getDate();
		return `${dateObject.getFullYear()}-${month < 10 ? `0${month}` : month}-${
			dateTemp < 10 ? `0${dateTemp}` : dateTemp
		}`;
	};

	const getDateViewFromTimestamp = (timestamp: number) => {
		const dateObject = new Date(timestamp);
		const month = dateObject.getMonth();
		const dateTemp = dateObject.getDate();
		return `${dateTemp < 10 ? `0${dateTemp}` : dateTemp} ${
			monthShortMap[month]
		} ${dateObject.getFullYear()}`;
	};

	const dateViewRange: [string, string] = useMemo(() => {
		const res: [string, string] = [...emptyViewDate];
		if (selectedEndDay) {
			res[1] = getDateViewFromTimestamp(selectedEndDay);
		}
		if (selectedStartDay) {
			const startDay = getDateViewFromTimestamp(selectedStartDay).split(" ");
			if (startDay[2] === res[1].split(" ")[2]) {
				res[0] = `${startDay[0]} ${startDay[1]}`;
			} else {
				res[0] = startDay.join(" ");
			}
		}
		return res;
	}, [selectedStartDay, selectedEndDay]);

	const dateView: string = useMemo(() => {
		let [res] = emptyViewDate;
		if (selectedDay) {
			res = getDateViewFromTimestamp(selectedDay);
		}
		return res;
	}, [selectedDay]);

	const getDate = (dateData: DateData) => {
		return new Date(dateData.year, dateData.month - 1, dateData.date).getTime();
	};

	const updateDateFromInput: UpdateDateFromInput = (dateType) => {
		if (!dateType) {
			const dateData = getDateFromDateString(refDateInput.current.value);
			if (dateData !== null) {
				setSelectedDay(getDate(dateData));
				setYearState(dateData.year);
				setMonthState(dateData.month - 1);
				setMonthDetails(getMonthDetails(dateData.year, dateData.month - 1));
			}
		}
		if (dateType === "start") {
			const dateData = getDateFromDateString(refDateInputStart.current.value);
			if (dateData !== null) {
				setSelectedStartDay(getDate(dateData));
				setYearState(dateData.year);
				setMonthState(dateData.month - 1);
				setMonthDetails(getMonthDetails(dateData.year, dateData.month - 1));
			}
		}
		if (dateType === "end") {
			const dateData = getDateFromDateString(refDateInputEnd.current.value);
			if (dateData !== null) {
				if (selectedStartDay && getDate(dateData) <= selectedStartDay) {
					setSelectedStartDay(getDate(dateData));
				} else {
					setSelectedEndDay(getDate(dateData));
				}
				setYearState(dateData.year);
				setMonthState(dateData.month - 1);
				setMonthDetails(getMonthDetails(dateData.year, dateData.month - 1));
			}
		}
	};

	useEffect(() => {
		if (selectedDay && showDateInput) {
			refDateInput.current.value = getDateStringFromTimestamp(selectedDay);
		}
	}, [showDateInput]);

	useEffect(() => {
		if (selectedStartDay && showDateStartInput) {
			refDateInputStart.current.value =
				getDateStringFromTimestamp(selectedStartDay);
		}
	}, [showDateStartInput]);

	useEffect(() => {
		if (selectedEndDay && showDateEndInput) {
			refDateInputEnd.current.value =
				getDateStringFromTimestamp(selectedEndDay);
		}
	}, [showDateEndInput]);

	useEffect(() => {
		if (range) {
			onChange({
				dateStart: selectedStartDay
					? getDateStringFromTimestamp(selectedStartDay)
					: undefined,
				dateEnd: selectedEndDay
					? getDateStringFromTimestamp(selectedEndDay)
					: undefined,
			});
		} else {
			onChange({
				date: selectedDay ? getDateStringFromTimestamp(selectedDay) : undefined,
			});
		}
	}, [selectedDay, selectedStartDay, selectedEndDay]);

	const onSetShowDateStartInput = () => setShowDateStartInput(true);
	const onSetShowDateEndInput = () => setShowDateEndInput(true);
	const onSetShowDateInput = () => setShowDateInput(true);

	const onDateClick: OnDateClick = (day) => {
		if (range) {
			if (!selectedStartDay || selectedStartDay > day.timestamp) {
				if (selectedEndDay && day.timestamp >= selectedEndDay) {
					setSelectedEndDay(undefined);
				}
				setSelectedStartDay(day.timestamp);
			} else if (selectedStartDay === day.timestamp) {
				setSelectedStartDay(undefined);
			} else if (selectedEndDay === day.timestamp) {
				setSelectedEndDay(undefined);
			} else {
				setSelectedEndDay(day.timestamp);
			}
		}
		if (!range) {
			if (selectedDay === day.timestamp) {
				setSelectedDay(undefined);
			} else {
				setSelectedDay(day.timestamp);
			}
		}
	};

	const setYear: SetYear = (offset) => {
		const year = yearState + offset;
		const month = monthState;
		setYearState(year);
		setMonthDetails(getMonthDetails(year, month));
	};

	const setMonth: SetMonth = (offset) => {
		let year = yearState;
		let month = monthState + offset;
		if (month === -1) {
			month = 11;
			year -= 1;
		} else if (month === 12) {
			month = 0;
			year += 1;
		}
		const monthDetailsData = getMonthDetails(year, month);
		setYearState(year);
		setMonthState(month);
		setMonthDetails(monthDetailsData);
	};

	useEffect(() => {
		setMonthDetails(getMonthDetails(yearState, monthState));
	}, []);

	return {
		setShowDatePicker,
		onSetShowDateStartInput,
		onSetShowDateEndInput,
		onSetShowDateInput,
		updateDateFromInput,
		getMonthStr,
		setMonth,
		setYear,
		onDateClick,
		showDatePicker,
		showDateStartInput,
		showDateEndInput,
		showDateInput,
		monthState,
		yearState,
		monthDetails,
		todayTimestamp,
		weekHeadDays,
		selectedDay,
		selectedStartDay,
		selectedEndDay,
		refDatePicker,
		refMainInput,
		refDateInput,
		refDateInputStart,
		refDateInputEnd,
		dateView,
		dateViewRange,
	};
};
