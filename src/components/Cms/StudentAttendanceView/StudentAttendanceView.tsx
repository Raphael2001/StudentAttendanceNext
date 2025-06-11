"use client";

import React, { useState } from "react";

import styles from "./StudentAttendanceView.module.scss";
import AutoComplete from "components/forms/AutoComplete/AutoComplete";
import CmsButton from "components/CmsButton/CmsButton";

import TableCreator from "components/TableCreator/TableCreator";
import TABLE_CELL_TYPES from "constants/TableCellType";
import TABLE_COLORS from "constants/TableColors";
import usePermission from "utils/hooks/usePermission";
import CMS_MODULES from "constants/CMSModules";
import { TableHeader } from "utils/types/table";
import CustomDatePicker from "components/forms/DatePicker/CustomDatePicker";
import { formatDate } from "utils/functions";
type option = {
  _id: string;
  name: string;
};
type Props = {
  options: Array<option>;
  apiCall: (
    id: string,
    extraParams: { [key: string]: string },
    onSuccess: (data: any) => void
  ) => void;
  extraHeaders?: TableHeader;
  dateFilter?: boolean;
};

function StudentAttendanceView({
  options,
  apiCall,
  extraHeaders = {},
  dateFilter = false,
}: Props) {
  usePermission(CMS_MODULES.ATTENDANCE);

  const [value, setValue] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [data, setData] = useState();

  function onChange(name: string, option: any) {
    if (option) {
      setValue(option._id);
    } else {
      setValue("");
    }
  }

  function onChangeDatePicker(name: string, date: Date) {
    if (name === "startDate") {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  }

  function getData(action = "search") {
    const extra = { action };
    if (startDate) {
      extra["startDate"] = formatDate(startDate);
    }
    if (endDate) {
      extra["endDate"] = formatDate(endDate);
    }

    apiCall(value, extra, setData);
  }

  const basicHeader = {
    studentId: { title: "תעודת זהות", type: TABLE_CELL_TYPES.TEXT },
    studentName: { title: "שם", type: TABLE_CELL_TYPES.TEXT },
    ...extraHeaders,
    totalPresent: { title: "סהכ נוכחות", type: TABLE_CELL_TYPES.TEXT },
    totalAbsent: { title: "סהכ חיסורים", type: TABLE_CELL_TYPES.TEXT },
  };

  return (
    <div className={styles["attendance-page"]}>
      <div className={styles["attendance-page-header"]}>
        <AutoComplete
          value={value}
          options={options}
          onChange={onChange}
          field="name"
          className={styles["auto-complete"]}
        />

        {dateFilter && (
          <>
            <CustomDatePicker
              minDate={new Date(2000, 0, 1)}
              placeholder="תאריך התחלה"
              name="startDate"
              onChange={onChangeDatePicker}
              value={startDate}
            />
            <CustomDatePicker
              minDate={startDate ?? new Date(2000, 0, 1)}
              placeholder="תאריך סיום"
              name="endDate"
              onChange={onChangeDatePicker}
              value={endDate}
            />
          </>
        )}

        <CmsButton
          text={"חיפוש"}
          className="create"
          onClick={() => getData("search")}
          isDisabled={!value}
        />
        <CmsButton
          text={"ייצוא"}
          className="create"
          onClick={() => getData("export")}
          isDisabled={!value}
        />
      </div>

      {data && (
        <TableCreator
          data={data}
          header={basicHeader}
          className={styles["table"]}
        />
      )}
    </div>
  );
}

export default StudentAttendanceView;
