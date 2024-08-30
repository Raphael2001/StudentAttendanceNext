"use client";
import React, { useEffect, useState } from "react";
import {
  clsx,
  formatTime,
  getHoursByStartEnd,
  getMinutesByInterval,
} from "utils/functions";

import styles from "./TimePicker.module.scss";
import BasicInputErrrorMsg from "components/Basic/BasicInputErrrorMsg/BasicInputErrrorMsg";

type Props = {
  startHour?: number;
  endHour?: number;
  minuteInterval?: number;
  selectedHour?: number;
  selectedMinute?: number;
  icon?: string;
  isOpenAtStart?: boolean;
  disabled?: boolean;
  onPicked: (name: string, phase: "minute" | "hour", value: string) => void;
  name: string;
  errorMessage?: string;
  showError?: boolean;
  placeholder?: string;
};

function TimePicker(props: Props) {
  const {
    startHour = 0,
    endHour = 23,
    minuteInterval = 15,
    selectedHour = startHour,
    selectedMinute = 0,
    icon,
    isOpenAtStart = false,
    disabled = false,
    onPicked = () => {},
    errorMessage = "",
    showError = false,
    name,
    placeholder = "",
  } = props;

  const [minutes, setMinutes] = useState<Array<string>>([]);
  const [hours, setHours] = useState<Array<string>>([]);
  const [isOpen, setIsOpen] = useState(isOpenAtStart);

  useEffect(() => {
    const minutes = getMinutesByInterval(minuteInterval);
    setMinutes(minutes);
  }, [minuteInterval]);

  useEffect(() => {
    const hours = getHoursByStartEnd(startHour, endHour);
    setHours(hours);
  }, [startHour, endHour]);

  function onMinutePickedHandler(minute: string) {
    typeof onPicked === "function" && onPicked(name, "minute", minute);
  }
  function onHourPickedHandler(hour: string) {
    typeof onPicked === "function" && onPicked(name, "hour", hour);
  }

  function togglePicker() {
    if (!disabled) {
      setIsOpen((prevState) => !prevState);
    }
  }

  function closePicker() {
    setIsOpen(false);
  }

  return (
    <div className={styles["time-picker-container"]}>
      {placeholder && (
        <span className={styles["placeholder"]}>{placeholder}</span>
      )}
      <div
        className={clsx(
          styles["time-picker-wrapper"],
          disabled ? styles["disabled"] : "",
          isOpen ? styles["active"] : ""
        )}
      >
        <button className={styles["time-picked-button"]} onClick={togglePicker}>
          {icon && (
            <div className={styles["clock-icon"]}>
              <img src={icon} alt={"clock"} />
            </div>
          )}
          <span className={styles["time-picked"]}>
            {formatTime(selectedMinute)} : {formatTime(selectedHour)}
          </span>
        </button>
        <div
          className={clsx(
            styles["time-picker-container"],
            isOpen ? styles["active"] : ""
          )}
        >
          <div className={styles["time-lists"]}>
            <div className={styles["time-panel-column"]}>
              {hours.map((hour, index) => {
                const isSelected = Number(hour) === Number(selectedHour);

                const onClicked = () => onHourPickedHandler(hour);
                return (
                  <button
                    className={clsx(
                      styles["time-cell"],
                      isSelected ? styles["selected"] : ""
                    )}
                    key={"hour-" + hour}
                    onClick={onClicked}
                  >
                    <span className={styles["time-cell-inner"]}>{hour}</span>
                  </button>
                );
              })}
            </div>
            <div className={styles["time-panel-column"]}>
              {minutes.map((minute, index) => {
                const isSelected = Number(minute) === Number(selectedMinute);
                const onClicked = () => onMinutePickedHandler(minute);

                return (
                  <button
                    className={`${styles["time-cell"]}  ${
                      isSelected ? styles["selected"] : ""
                    }`}
                    key={"minute-" + minute}
                    onClick={onClicked}
                  >
                    <span className={styles["time-cell-inner"]}>{minute}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className={styles["actions"]}>
            <button className={styles["ok-button"]} onClick={closePicker}>
              אישור
            </button>
          </div>
        </div>
      </div>
      <BasicInputErrrorMsg showError={showError} errorMessage={errorMessage} />
    </div>
  );
}

export default TimePicker;
