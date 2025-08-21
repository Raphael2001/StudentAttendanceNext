"use client";

import React from "react";

import parse from "html-react-parser";

type Props = { html: string };

export default function HtmlViewer(props: Props) {
  const { html } = props;

  return parse(html);
}
