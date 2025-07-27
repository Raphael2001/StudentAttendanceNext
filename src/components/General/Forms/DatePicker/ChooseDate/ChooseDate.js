import React from "react";
import styles from "./ChooseDate.module.scss";
import FormButton from "components/General/Forms/FormButton/FormButton";

function ChooseDate(props) {
	const { className = "", options, current, changeFunction, onSelect } = props;
	return (
		<div className={`${styles["choose-date-wrapper"]} ${className}`}>
			{options.map((option, i) => {
				const selectedOption = current === option ? "selected" : "";
				return (
					<FormButton
						className={`${styles["option-card"]} ${styles[selectedOption]}`}
						key={i}
						onClick={() => {
							onSelect(changeFunction, option);
						}}
					>
						{option}
					</FormButton>
				);
			})}
		</div>
	);
}

export default ChooseDate;
