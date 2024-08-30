import React from "react";

import styles from "./LoginButton.module.scss";

type Props = {
  onClick: () => void;
  text: string;
};

function LoginButton(props: Props) {
  const { onClick, text } = props;

  return (
    <button className={styles["login-btn"]} onClick={onClick}>
      {text}
    </button>
  );
}

export default LoginButton;
