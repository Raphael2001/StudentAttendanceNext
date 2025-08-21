"use client";

import React from "react";
import dynamic from "next/dynamic";
import styles from "./CustomEditor.module.scss";
import {
	AccessibilityHelp,
	Autosave,
	Bold,
	CloudServices,
	Essentials,
	Indent,
	Italic,
	List,
	Paragraph,
	SelectAll,
	Underline,
	Undo,
	ClassicEditor,
	EditorConfig,
	EventInfo,
	Link,
	AutoLink,
	Heading,
	FontFamily,
	FontColor,
} from "ckeditor5";
const CKEditor = dynamic(() => import("@ckeditor/ckeditor5-react").then((mod) => mod.CKEditor), { ssr: false });

import { clsx } from "utils/functions";
import BasicInputErrorMsg from "components/General/Basic/BasicInputErrorMsg/BasicInputErrorMsg";
import { InputRef } from "utils/types/form";

const normalToolBar = [
	"undo",
	"redo",
	"|",
	"fontFamily",
	"|",
	"fontColor",
	"|",
	"heading",
	"|",
	"bold",
	"italic",
	"underline",
	"|",
	"link",
	"|",
	"bulletedList",
	"numberedList",
];
const basicEditorConfig: EditorConfig = {
	licenseKey: "GPL",
	toolbar: {
		items: normalToolBar,
		shouldNotGroupWhenFull: false,
	},
	plugins: [
		AccessibilityHelp,
		Autosave,
		Bold,
		CloudServices,
		Essentials,
		Indent,
		Italic,
		List,
		Paragraph,
		SelectAll,
		Underline,
		Undo,
		Link,
		AutoLink,
		Heading,
		FontFamily,
		FontColor,
	],
	fontFamily: {
		options: [
			"default",
			"Arial, Helvetica, sans-serif",
			"Verdana, Geneva, sans-serif",
			"Tahoma, Geneva, sans-serif",
			"Trebuchet MS, Helvetica, sans-serif",
			"Helvetica, Arial, sans-serif",
			'"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
			'"Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva, Verdana, sans-serif',
			"Geneva, Tahoma, Verdana, sans-serif",
			'Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif',
			"Optima, Arial, sans-serif",
			'Candara, Calibri, Segoe, "Segoe UI", Arial, sans-serif',
			'Gill Sans, "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
			"Impact, Charcoal, sans-serif",
			'"Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif',
			'"Arial Black", Gadget, sans-serif',
			'"Bookman Old Style", serif',
			'"Book Antiqua", Palatino, serif',
			'Palatino, "Palatino Linotype", "Palatino LT STD", "Book Antiqua", serif',
			'Georgia, "Times New Roman", Times, serif',
			'"Times New Roman", Times, serif',
			'"Times", Times, serif',
			'Century, "Century Schoolbook", serif',
			'"New Century Schoolbook", serif',
			'Palatino, URW Palladio, "Liberation Serif", serif',
			'URW Palladio L, "Lucida Bright", "Lucida Serif", "Times New Roman", Times, serif',
			'"Goudy Old Style", Garamond, "TheNew Font", serif',
			'"Bookman Old Style", "Book Antiqua", "Palatino Linotype", serif',
			'"Courier New", Courier, monospace',
			"Courier, monospace",
			'"Lucida Console", Monaco, monospace',
			'Monaco, "Lucida Console", monospace',
			'Consolas, "Courier New", monospace',
			"Andale Mono, monospace",
			'"Comic Sans MS", "Comic Sans", cursive',
			'"Brush Script MT", cursive',
			'Garamond, "Times New Roman", Times, serif',
			'Perpetua, "Baskerville Old Face", "Times New Roman", serif',
			'Verdana, "Geneva", sans-serif',
			'Candara, Calibri, Segoe, "Segoe UI", Optima, Arial, sans-serif',
			'Futura, "Trebuchet MS", Arial, sans-serif',
			"Lucida Sans, Geneva, sans-serif",
			'"Copperplate Gothic Light", "Trebuchet MS", Arial, sans-serif',
			'"Century Gothic", Century, "AppleGothic", sans-serif',
			'"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", sans-serif',
		],
		supportAllValues: true,
	},
	heading: {
		options: [
			{
				model: "paragraph",
				title: "Paragraph",
				class: "ck-heading_paragraph",
			},
			{
				model: "heading1",
				view: "h1",
				title: "Heading 1",
				class: "ck-heading_heading1",
			},
			{
				model: "heading2",
				view: "h2",
				title: "Heading 2",
				class: "ck-heading_heading2",
			},
			{
				model: "heading3",
				view: "h3",
				title: "Heading 3",
				class: "ck-heading_heading3",
			},
			{
				model: "heading4",
				view: "h4",
				title: "Heading 4",
				class: "ck-heading_heading4",
			},
			{
				model: "heading5",
				view: "h5",
				title: "Heading 5",
				class: "ck-heading_heading5",
			},
			{
				model: "heading6",
				view: "h6",
				title: "Heading 6",
				class: "ck-heading_heading6",
			},
		],
	},
	fontColor: {
		colorPicker: { format: "hex" },
	},
	link: {
		addTargetToExternalLinks: true,
		defaultProtocol: "https://",
	},
};

export interface CkEditorProps {
	value: string;
	name: string;
	onChange: (name: string, html: string) => void;
	className?: string;
	placeholder?: string;
	id?: string;
	disabled?: boolean;
	language?: string;
	showError?: boolean;
	errorMessage?: string;
	onReady?: () => void;
	ref?: InputRef;
}

export default function CkEditor(props: CkEditorProps) {
	const {
		name,
		value,
		onChange,
		placeholder = "",
		id = "",
		disabled = false,
		className = "",
		language = "he",
		showError = false,
		errorMessage = "",
		onReady = () => {},
		ref,
	} = props;

	const editorConfig: EditorConfig = {
		...basicEditorConfig,
		language,
		placeholder,
	};

	function onChangeHandler(_event: EventInfo, editorInstance) {
		onChange(name, editorInstance.getData());
	}

	return (
		<div className={styles["ck-editor"]}>
			<div className={clsx("ck-editor", styles["ck-editor-container"], disabled && styles["disabled"], className)}>
				<CKEditor
					id={id}
					disabled={disabled}
					data={value}
					editor={ClassicEditor}
					config={editorConfig}
					onChange={onChangeHandler}
					onReady={onReady}
				/>
			</div>
			<BasicInputErrorMsg
				showError={showError}
				errorMessage={errorMessage}
			/>
		</div>
	);
}
