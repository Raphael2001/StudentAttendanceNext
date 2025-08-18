import React from "react";
import { setRequestLocale } from "next-intl/server";
import ISR from "utils/ISR";
import DP_Page from "components/App/DynamicPages/DynamicPage/Page/DP_Page";
import { notFound } from "next/navigation";

type Props = {
	params: Promise<Params>;
};

type Params = {
	route: Array<string>;
	locale: string;
};

export async function generateStaticParams() {
	// const pages = await ISR.getDynamicPagesRoutes();
	// if (pages) {
	// 	return pages.map((page) => ({
	// 		route: page.route.split("/"),
	// 		locale: page.language,
	// 	}));
	// }
	return [];
}

export default async function DynamicPage(props: Props) {
	const { params } = props;
	const { route, locale } = await params;

	setRequestLocale(locale);

	const fullRoute = route.join("/");

	const payload = {
		route: fullRoute,
		language: locale,
	};

	const body = await ISR.getDynamicPage(payload);

	if (!body) {
		notFound();
	}
	const sections = body.sections;

	return <DP_Page sections={sections} />;
}
