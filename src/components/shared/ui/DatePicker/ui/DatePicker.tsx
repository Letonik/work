"use client";

import React, { forwardRef } from "react";
import Image from "next/image";
import Calendar from "./Calendar";
import { useDatePicker } from "../lib/useDatePicker";
import { OnChangeType, RefType } from "../model/types";
import cls from "./DatePicker.module.scss";
import arrowLeftOnce from "../icons/arrowLeftOnce.svg";
import note from "../icons/note.svg";

type PropsType = {
	range?: boolean; // Выбор даты в диапозоне
	lang?: "en" | "ru"; // Язык
	onChange: PropsType["range"] extends true
		? OnChangeType<true>
		: OnChangeType<false>;
	date?: string;
	dateStart?: string;
	dateEnd?: string;
};

const DatePicker = forwardRef(
	(props: PropsType, refClear?: RefType): JSX.Element => {
		const {
			date,
			dateEnd,
			dateStart,
			lang = "en",
			range = false,
			onChange,
		} = props;

		const {
			setShowDatePicker,
			onSetShowDateStartInput,
			onSetShowDateEndInput,
			onSetShowDateInput,
			showDatePicker,
			showDateStartInput,
			showDateEndInput,
			showDateInput,
			getMonthStr,
			monthState,
			setMonth,
			yearState,
			setYear,
			monthDetails,
			todayTimestamp,
			weekHeadDays,
			selectedDay,
			selectedStartDay,
			selectedEndDay,
			onDateClick,
			dateView,
			dateViewRange,
			refDatePicker,
			refMainInput,
			refDateInputStart,
			refDateInputEnd,
			refDateInput,
		} = useDatePicker(
			lang,
			range,
			onChange,
			date,
			dateEnd,
			dateStart,
			refClear
		);

		return (
			<div className={cls.MyDatePicker}>
				<div
					className={cls.inputContainer}
					onClick={() => setShowDatePicker(true)}
					ref={refMainInput}
				>
					<div className={cls.inputInfo}>
						<div className={cls.title}>Отклик</div>
						<div className={cls.date}>
							{range ? (
								<>
									{showDateStartInput ? (
										<div className={`${cls.input} ${cls.left}`}>
											<input type="date" ref={refDateInputStart} />
										</div>
									) : (
										<span onClick={onSetShowDateStartInput}>
											{dateViewRange[0]}
										</span>
									)}
									-
									{showDateEndInput ? (
										<div className={`${cls.input} ${cls.right}`}>
											<input type="date" ref={refDateInputEnd} />
										</div>
									) : (
										<span onClick={onSetShowDateEndInput}>
											{dateViewRange[1]}
										</span>
									)}
								</>
							) : (
								// eslint-disable-next-line react/jsx-no-useless-fragment
								<>
									{showDateInput ? (
										<div className={cls.input}>
											<input type="date" ref={refDateInput} />
										</div>
									) : (
										<span onClick={onSetShowDateInput}>{dateView}</span>
									)}
								</>
							)}
						</div>
					</div>
					<div className={cls.iconCalendar}>
						<Image src={note} alt="note" width="24" />
					</div>
				</div>
				{showDatePicker && (
					<div className={cls.mdpContainer} ref={refDatePicker}>
						<div className={cls.mdpcHead}>
							<div className={cls.monthContainer}>
								<div className={cls.value}>{getMonthStr(monthState)}</div>
								<div className={cls.navigate}>
									<div className={cls.up} onClick={() => setMonth(1)}>
										<Image src={arrowLeftOnce} alt="up" width={10} />
									</div>
									<div className={cls.down} onClick={() => setMonth(-1)}>
										<Image src={arrowLeftOnce} alt="down" width={10} />
									</div>
								</div>
							</div>
							<div className={cls.yearContainer}>
								<div className={cls.value}>{yearState}</div>
								<div className={cls.navigate}>
									<div className={cls.up} onClick={() => setYear(1)}>
										<Image src={arrowLeftOnce} alt="up" width="10" />
									</div>
									<div className={cls.down} onClick={() => setYear(-1)}>
										<Image src={arrowLeftOnce} alt="down" width="10" />
									</div>
								</div>
							</div>
						</div>
						<div className="mdpc-body">
							<Calendar
								monthDetails={monthDetails}
								todayTimestamp={todayTimestamp}
								weekHeadDays={weekHeadDays}
								selectedDay={selectedDay}
								selectedEndDay={selectedEndDay}
								selectedStartDay={selectedStartDay}
								onDateClick={onDateClick}
								lang={lang}
								range={range}
							/>
						</div>
					</div>
				)}
			</div>
		);
	}
);

export default DatePicker;
