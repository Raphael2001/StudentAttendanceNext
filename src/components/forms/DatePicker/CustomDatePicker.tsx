import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import he from "date-fns/locale/he";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./CustomDatePicker.module.scss";

import ArrowUp from "/public/assets/icons/drop-down.svg";
import ChooseDate from "./ChooseDate/ChooseDate";
import { clsx } from "utils/functions";

function* range(_start_, _end_) {
  for (let h = _start_; h <= _end_; h++) {
    yield h;
  }
}

function getYear(date) {
  return date?.getFullYear()?.toString();
}
function getMonth(date) {
  return months[date.getMonth()];
}

function getDate(currentDate) {
  if (currentDate) {
    return (
      currentDate.getDate() +
      "/" +
      ("0" + (currentDate.getMonth() + 1)).slice(-2) +
      "/" +
      getYear(currentDate)
    );
  }
}

const months = [
  "ינואר",
  "פברואר",
  "מרץ",
  "אפריל",
  "מאי",
  "יוני",
  "יולי",
  "אוגוסט",
  "ספטמבר",
  "אוקטובר",
  "נובמבר",
  "דצמבר",
];

type Props = {
  value: Date | undefined;
  minDate?: Date;
  placeholder?: string;
  icon?: string;
  disabled?: boolean;
  name: string;
  onChange: (name: string, date: Date) => void;

  className?: string;
  startYear?: number;
  endYear?: number;
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
  } = props;

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

  function onDateSelectHandler(date: Date) {
    onChange(name, date);
    setIsOpen(false);
  }

  const isFloatingClassName = isFloating ? "floating" : "";
  const isOpenMonthYear = showSelectYear || showSelectMonth;
  const isDisabledClassName = disabled ? "disabled" : "";
  const showSelectMonthClassName = showSelectMonth ? "show" : "";
  const showSelectYearClassName = showSelectYear ? "show" : "";
  const isOpenMonthYearClassName = isOpenMonthYear
    ? "open-year-month-select"
    : "";

  return (
    <div
      className={clsx(
        styles["custom-datepicker-wrapper"],
        styles[isDisabledClassName],
        styles[isOpenMonthYearClassName],
        className,
        isOpen ? styles["active"] : ""
      )}
    >
      <div
        className={styles["custom-datepicker-btn-wrapper"]}
        onClick={onBtnClickHandler}
      >
        <div
          className={`${styles["custom-datepicker-btn"]} ${styles[isFloatingClassName]}`}
        >
          {placeholder}
        </div>
        {isDateSelected && (
          <span className={styles["custom-datepicker-date-selected"]}>
            {getDate(value)}
          </span>
        )}
        {icon && (
          <div className={styles["custom-datepicker-icon"]}>
            <img src={icon} alt="" />
          </div>
        )}
      </div>
      {isOpen && (
        <div className={styles["custom-datepicker"]}>
          <DatePicker
            open={isOpen}
            onClickOutside={onBtnClickHandler}
            selected={value}
            locale={he}
            rtl
            shouldCloseOnSelect={true}
            minDate={minDate}
            onChange={(date) => {
              onDateSelectHandler(date);
            }}
            disabledKeyboardNavigation
            dayClassName={(date) =>
              new Date().getDate() === date.getDate() ? "selected" : ""
            }
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
                    <button
                      className={styles["selected-year"]}
                      onClick={onYearClick}
                    >
                      {getYear(date)}
                    </button>
                    <button
                      className={styles["selected-month"]}
                      onClick={onMonthClick}
                    >
                      {getMonth(date)}
                    </button>
                  </div>
                  <div className={styles["nav-months"]}>
                    <button
                      className={`${styles["btn-nav"]} ${
                        prevMonthButtonDisabled ? styles["disabled"] : ""
                      }`}
                      onClick={decreaseMonth}
                      disabled={prevMonthButtonDisabled}
                    >
                      <img
                        className={clsx(styles["arrow-up"], "input-icon-mark")}
                        src={ArrowUp.src}
                      />
                    </button>
                    <button
                      className={`${styles["btn-nav"]} ${
                        nextMonthButtonDisabled ? styles["disabled"] : ""
                      }`}
                      onClick={increaseMonth}
                      disabled={nextMonthButtonDisabled}
                    >
                      <img
                        className={clsx(
                          styles["arrow-down"],
                          "input-icon-mark"
                        )}
                        src={ArrowUp.src}
                      />
                    </button>
                  </div>
                </div>
                {isOpenMonthYear && (
                  <div className={styles["select-year-month"]}>
                    <div
                      className={`${styles["select-month"]}  ${styles[showSelectMonthClassName]}`}
                    >
                      <ChooseDate
                        options={months}
                        current={getMonth(date)}
                        changeFunction={changeMonth}
                        onSelect={onMonthSelectHandler}
                      />
                    </div>
                    <div
                      className={`${styles["select-year"]}  ${styles[showSelectYearClassName]}`}
                    >
                      <ChooseDate
                        options={years}
                        current={getYear(date)}
                        changeFunction={changeYear}
                        onSelect={onYearSelectHandler}
                      />
                    </div>
                    <button
                      className={styles["today-button"]}
                      onClick={onClickTodayButton}
                    >
                      היום
                    </button>
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
