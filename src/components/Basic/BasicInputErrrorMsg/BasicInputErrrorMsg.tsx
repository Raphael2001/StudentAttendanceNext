import React from "react";

import styles from "./BasicInputErrrorMsg.module.scss";

type Props = {
  showError: boolean;
  errorMessage: string;
};

function BasicInputErrrorMsg(props: Props) {
  const { showError, errorMessage = "" } = props;

  return showError ? (
    <span className={styles["error-message"]}>{errorMessage}</span>
  ) : null;
}

export default BasicInputErrrorMsg;
