import React, { DragEvent } from "react";

import styles from "./MediaUploadBox.module.scss";
import FileUpload from "components/General/Svg/FileUpload";
import Text from "components/App/Text/Text";
import useCMSTranslate from "utils/hooks/useCMSTranslate";
import UploadFileButton from "components/General/Forms/UploadFileButton/UploadFileButton";
import { InputEvent } from "utils/types/inputs";
import CloseButton from "components/General/CloseButton/CloseButton";

type Props = {
	currentFile?: File | null;
	onFileChange: (file: File | null) => void;
	accept?: string;
};

export default function MediaUploadBox(props: Props) {
	const { currentFile, onFileChange, accept = "*" } = props;

	const translate = useCMSTranslate();

	function handleDrop(event: DragEvent<HTMLDivElement>) {
		event.preventDefault();
		const droppedFiles = event.dataTransfer.files;
		if (droppedFiles && !currentFile) {
			const file = droppedFiles[0];
			onFileChange(file);
		}
	}

	function onMediaChange(e: InputEvent) {
		const fileList = e.target.files;
		if (fileList) {
			for (let i = 0; i < fileList.length; i++) {
				const file = fileList[i];
				onFileChange(file);
				return;
			}
		}
	}

	function showFile() {
		if (currentFile) {
			const fileUrl = URL.createObjectURL(currentFile);
			const mediaType = currentFile.type.split("/")[0];

			switch (mediaType) {
				case "image":
					return (
						<img
							className={styles["media"]}
							src={fileUrl}
						/>
					);
				case "video":
					return (
						<video
							className={styles["media"]}
							src={fileUrl}
						/>
					);
				default:
					return (
						<img
							className={styles["media"]}
							src={"/assets/icons/file.svg"}
						/>
					);
			}
		}
	}

	function removeFile() {
		onFileChange(null);
	}

	return (
		<div
			className={styles["media-upload-box"]}
			onDrop={handleDrop}
			onDragOver={(event) => event.preventDefault()}
		>
			{currentFile ? (
				<div className={styles["media-wrapper"]}>
					<CloseButton
						className={styles["close-button"]}
						onClick={removeFile}
					/>
					{showFile()}
					<Text
						tag="span"
						className={styles["file-name"]}
					>
						{currentFile.name}
					</Text>
				</div>
			) : (
				<>
					<FileUpload className={styles["file-upload-icon"]} />
					<Text
						tag="span"
						className={styles["drag-text"]}
					>
						{translate("media_drag_n_drop")}
					</Text>
					<Text
						tag="span"
						className={styles["drag-text-or"]}
					>
						{translate("or")}
					</Text>
					<UploadFileButton
						placeholder={translate("browse_media")}
						accept={accept}
						onChange={onMediaChange}
						className={styles["browse-media-button"]}
						inputClassName={styles["browse-media-button-input"]}
					/>
				</>
			)}
		</div>
	);
}
