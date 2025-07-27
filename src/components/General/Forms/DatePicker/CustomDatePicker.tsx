import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./CustomDatePicker.module.scss";

import ChooseDate from "components/General/Forms/DatePicker/ChooseDate/ChooseDate";
import { clsx, generateUniqueId } from "utils/functions";
import FormButton from "components/General/Forms/FormButton/FormButton";
import useCMSTranslate from "utils/hooks/useCMSTranslate";
import { ButtonRef } from "utils/types/form";
import { on } from "events";

function* range(_start_, _end_) {
	for (let h = _start_; h <= _end_; h++) {
		yield h;
	}
}

function getYear(date) {
	return date?.getFullYear()?.toString();
}

function getDate(currentDate) {
	if (currentDate) {
		return currentDate.getDate() + "/" + ("0" + (currentDate.getMonth() + 1)).slice(-2) + "/" + getYear(currentDate);
	}
}

type Props = {
	value?: Date;
	minDate?: Date;
	placeholder?: string;
	icon?: string;
	disabled?: boolean;
	name: string;
	onChange: (name: string, date: Date | null) => void;

	className?: string;
	startYear?: number;
	endYear?: number;
	ref?: ButtonRef;
	id?: string;
};

function CustomDatePicker(props: Props) {
	const {
		value,
		minDate = new Date(),
		placeholder = "",
		icon,
		disabled = false,
		name = "",
		onChange = () => {},

		className = "",
		startYear = minDate?.getFullYear(),
		endYear = startYear + 5,
		ref,
		id = generateUniqueId(16),
	} = props;

	const translate = useCMSTranslate();

	const [years, setYears] = useState<Array<number>>([]);
	const [isOpen, setIsOpen] = useState(false);
	const [isDateSelected, setIsDateSelected] = useState(false);
	const [isFloating, setIsFloating] = useState(false);
	const [showSelectMonth, setShowSelectMonth] = useState(false);
	const [showSelectYear, setShowSelectYear] = useState(false);

	useEffect(() => {
		if (value) {
			setIsDateSelected(true);
			setIsFloating(true);
		} else {
			setIsDateSelected(false);
			setIsFloating(false);
		}
	}, [value]);

	useEffect(() => {
		const years: Array<number> = [];
		for (const h of range(startYear, endYear)) {
			years.push(h);
		}
		setYears(years);
	}, []);

	const months = [
		translate("january"),
		translate("february"),
		translate("march"),
		translate("april"),
		translate("may"),
		translate("june"),
		translate("july"),
		translate("august"),
		translate("september"),
		translate("october"),
		translate("november"),
		translate("december"),
	];

	function getMonth(date) {
		return months[date.getMonth()];
	}

	function onBtnClickHandler() {
		setIsOpen((prevState) => !prevState);
	}

	function onMonthSelectHandler(changeMonthFunction, month) {
		changeMonthFunction(months.indexOf(month));
		setShowSelectMonth(false);
	}
	function onYearSelectHandler(changeYearFunction, year) {
		changeYearFunction(year);
		setShowSelectYear(false);
		setShowSelectMonth(true);
	}
	function onMonthClick() {
		setShowSelectMonth((prevState) => !prevState);
		setShowSelectYear(false);
	}
	function onYearClick() {
		setShowSelectMonth(false);
		setShowSelectYear((prevState) => !prevState);
	}
	function onClickTodayButton() {
		setShowSelectYear(false);
		setShowSelectMonth(false);
		onDateSelectHandler(new Date());
	}

	function onDateSelectHandler(date: Date | null) {
		onChange(name, date);
		setIsOpen(false);
	}

	const isFloatingClassName = isFloating ? "floating" : "";
	const isOpenMonthYear = showSelectYear || showSelectMonth;
	const isDisabledClassName = disabled ? "disabled" : "";
	const showSelectMonthClassName = showSelectMonth ? "show" : "";
	const showSelectYearClassName = showSelectYear ? "show" : "";
	const isOpenMonthYearClassName = isOpenMonthYear ? "open-year-month-select" : "";

	return (
		<div
			className={clsx(
				styles["custom-datepicker-wrapper"],
				styles[isDisabledClassName],
				styles[isOpenMonthYearClassName],
				className,
				isOpen ? styles["active"] : "",
			)}
		>
			<FormButton
				ref={ref}
				id={id}
				className={styles["custom-datepicker-btn-wrapper"]}
				onClick={onBtnClickHandler}
				onFocus={onBtnClickHandler}
			>
				<div className={`${styles["custom-datepicker-btn"]} ${styles[isFloatingClassName]}`}>{placeholder}</div>
				{isDateSelected && <span className={styles["custom-datepicker-date-selected"]}>{getDate(value)}</span>}
				{icon && (
					<div className={styles["custom-datepicker-icon"]}>
						<img
							src={icon}
							alt=""
						/>
					</div>
				)}
			</FormButton>
			{isOpen && (
				<div className={styles["custom-datepicker"]}>
					<DatePicker
						open={isOpen}
						onClickOutside={onBtnClickHandler}
						selected={value}
						locale={"he"}
						shouldCloseOnSelect={true}
						minDate={minDate}
						onChange={(date) => {
							onDateSelectHandler(date);
						}}
						disabledKeyboardNavigation
						dayClassName={(date) => (new Date().getDate() === date.getDate() ? "selected" : "")}
						fixedHeight
						renderCustomHeader={({
							date,
							changeYear,
							changeMonth,
							decreaseMonth,
							increaseMonth,
							prevMonthButtonDisabled,
							nextMonthButtonDisabled,
						}) => (
							<div className={styles["header-select"]}>
								<div className={styles["header-wrapper"]}>
									<div className={styles["selected-month-year"]}>
										<FormButton
											className={styles["selected-year"]}
											onClick={onYearClick}
										>
											{getYear(date)}
										</FormButton>
										<FormButton
											className={styles["selected-month"]}
											onClick={onMonthClick}
										>
											{getMonth(date)}
										</FormButton>
									</div>
									<div className={styles["nav-months"]}>
										<FormButton
											className={`${styles["btn-nav"]} ${prevMonthButtonDisabled ? styles["disabled"] : ""}`}
											onClick={decreaseMonth}
											disabled={prevMonthButtonDisabled}
										>
											<img
												className={clsx(styles["arrow-up"], "input-icon-mark")}
												src={"/assets/icons/drop-down.svg"}
											/>
										</FormButton>
										<FormButton
											className={`${styles["btn-nav"]} ${nextMonthButtonDisabled ? styles["disabled"] : ""}`}
											onClick={increaseMonth}
											disabled={nextMonthButtonDisabled}
										>
											<img
												className={clsx(styles["arrow-down"], "input-icon-mark")}
												src={"/assets/icons/drop-down.svg"}
											/>
										</FormButton>
									</div>
								</div>
								{isOpenMonthYear && (
									<div className={styles["select-year-month"]}>
										<div className={`${styles["select-month"]}  ${styles[showSelectMonthClassName]}`}>
											<ChooseDate
												options={months}
												current={getMonth(date)}
												changeFunction={changeMonth}
												onSelect={onMonthSelectHandler}
											/>
										</div>
										<div className={`${styles["select-year"]}  ${styles[showSelectYearClassName]}`}>
											<ChooseDate
												options={years}
												current={getYear(date)}
												changeFunction={changeYear}
												onSelect={onYearSelectHandler}
											/>
										</div>
										<FormButton
											className={styles["today-button"]}
											onClick={onClickTodayButton}
										>
											{translate("today")}
										</FormButton>
									</div>
								)}
							</div>
						)}
					></DatePicker>
				</div>
			)}
		</div>
	);
}

export default CustomDatePicker;
