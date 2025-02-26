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
type option = {
  _id: string;
  name: string;
};
type Props = {
  options: Array<option>;
  apiCall: (id: string, onSuccess: (data: any) => void) => void;
  extraHeaders?: TableHeader;
};

function StudentAttendanceView({ options, apiCall, extraHeaders = {} }: Props) {
  usePermission(CMS_MODULES.ATTENDANCE);

  const [value, setValue] = useState<string>("");
  const [data, setData] = useState();

  function onChange(name: string, option: any) {
    if (option) {
      setValue(option._id);
    } else {
      setValue("");
    }
  }

  function getData() {
    apiCall(value, setData);
  }

  const basicHeader = {
    studentId: { title: "תעודת זהות", type: TABLE_CELL_TYPES.TEXT },
    studentName: { title: "שם", type: TABLE_CELL_TYPES.TEXT },
    ...extraHeaders,
    totalAbsent: { title: "סהכ נוכחות", type: TABLE_CELL_TYPES.TEXT },
    totalPresent: { title: "סהכ חיסורים", type: TABLE_CELL_TYPES.TEXT },
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
        <CmsButton
          text={"חיפוש"}
          className="create"
          onClick={getData}
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
