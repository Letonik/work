import React from "react";
import { DayDetails, LangType, OnDateClick } from "../model/types";
import cls from "./DatePicker.module.scss";

type PropsType = {
	monthDetails: DayDetails[];
	onDateClick: OnDateClick;
	todayTimestamp: number;
	weekHeadDays: string[];
	selectedDay: number | undefined;
	selectedStartDay: number | undefined;
	selectedEndDay: number | undefined;
	lang: LangType;
	range: boolean;
};

const Calendar = (props: PropsType): JSX.Element => {
	const {
		monthDetails,
		todayTimestamp,
		weekHeadDays,
		selectedDay,
		onDateClick,
		selectedStartDay,
		selectedEndDay,
		lang,
		range,
	} = props;

	const isWeekendDay = (day: DayDetails): string => {
		if (
			(lang === "ru" && (day.day === 5 || day.day === 6)) ||
			(lang === "en" && (day.day === 0 || day.day === 6))
		) {
			return ` ${cls.weekendDay}`;
		}
		return "";
	};

	const getClassesDay = (day: DayDetails): string => {
		let classes = "";
		if (day.month !== 0) classes += ` ${cls.disabled}`;
		if (day.month === 0) {
			if (day.timestamp === todayTimestamp) classes += ` ${cls.todayTimestamp}`;
			if (range) {
				if (day.timestamp === selectedStartDay) {
					if (!selectedEndDay) {
						classes += ` ${cls.selectedDay}`;
					} else {
						classes += ` ${cls.selectedStartDay}`;
					}
				}
				if (selectedStartDay && selectedEndDay) {
					if (
						selectedStartDay < day.timestamp &&
						day.timestamp < selectedEndDay
					) {
						classes += ` ${cls.intermediateDay}`;
					}
				}
				if (day.timestamp === selectedEndDay) {
					classes += ` ${cls.selectedEndDay}`;
				}
			}
			if (!range) {
				if (day.timestamp === selectedDay) classes += ` ${cls.selectedDay}`;
			}
		}
		classes += isWeekendDay(day);
		return classes;
	};

	return (
		<div className={cls.calendarContainer}>
			<div className={cls.calendarHead}>
				{weekHeadDays.map((d, i) => (
					<div key={i} className={cls.weekDayName}>
						{d}
					</div>
				))}
			</div>
			<div className={cls.calendarBody}>
				{monthDetails.map((day, index) => (
					<div
						className={`${cls.dayContainer}${getClassesDay(day)}`}
						key={index}
					>
						<div className={cls.daySubContainer}>
							<span onClick={() => onDateClick(day)}>{day.date}</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Calendar;
