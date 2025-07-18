"use client";

import React, { useRef } from "react";

import styles from "./TrashPopup.module.scss";
import { SlidePopupRef } from "utils/types/popup";
import SlidePopup from "popups/Presets/SlidePopup/SlidePopup";
import LottieAnimation from "components/General/LottieAnimation/LottieAnimation";

import TrashAnimation from "animations/trash.json";
import { clsx } from "utils/functions";
import useCMSTranslate from "utils/hooks/useCMSTranslate";
import CmsButton from "components/Cms/CmsButton/CmsButton";

type Props = {
	payload: Payload;
	popupIndex: number;
};

type Payload = {
	title: string;
	onClickDelete: (callback: () => void) => void;
};

function TrashPopup(props: Props) {
	const ref = useRef<SlidePopupRef>(null);
	const { payload, popupIndex } = props;
	const { title, onClickDelete } = payload;

	const translate = useCMSTranslate();

	const animateOut = () => ref.current?.animateOut();

	function onClickHandler() {
		onClickDelete(animateOut);
	}

	return (
		<SlidePopup
			className={styles["trash-popup"]}
			ref={ref}
			popupIndex={popupIndex}
		>
			<div className={styles["content"]}>
				<div className={styles["animation-wrapper"]}>
					<LottieAnimation
						animation={TrashAnimation}
						autoplay
						loop
					/>
				</div>
				<span className={styles["title"]}>{title}</span>
				<span className={styles["disclaimer"]}>{translate("trash_popup_subtitle")}</span>

				<div className={styles["actions"]}>
					<CmsButton
						text={translate("trash_popup_ok")}
						className={clsx(styles["button"])}
						onClick={onClickHandler}
						color={"green"}
					/>

					<CmsButton
						text={translate("trash_popup_cancel")}
						className={clsx(styles["button"])}
						onClick={onClickHandler}
						color={"red"}
					/>
				</div>
			</div>
		</SlidePopup>
	);
}

export default TrashPopup;
