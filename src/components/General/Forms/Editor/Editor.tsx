"use client";

import dynamic from "next/dynamic";

const Editor = dynamic(() => import("components/General/Forms/Editor/CustomEditor/CustomEditor"), {
  ssr: false,
});

export default Editor;
