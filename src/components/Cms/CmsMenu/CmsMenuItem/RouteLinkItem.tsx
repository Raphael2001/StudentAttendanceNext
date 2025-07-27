"use client";

import { CMSModuleRoute } from "utils/types/init";
import { usePathname } from "next/navigation";
import { clsx } from "utils/functions";
import styles from "./CmsMenuItem.module.scss";
import ActiveLink from "components/General/Navigation/ActiveLink/ActiveLink";
import LinkItemContent from "./LinkItemContent";
import useCmsSideBar from "utils/hooks/useCmsSideBar";

type Props = {
	route: CMSModuleRoute;
	module: string;
	title?: string;
};

export default function RouteLinkItem({ route, module }: Props) {
	const pathname = usePathname();
	const isActive = !!pathname?.includes(route?.href);
	const { isSideBarOpen } = useCmsSideBar();

	const className = clsx(styles["sidebar-menu-link"], isActive && styles["active"], isSideBarOpen && styles["sidebar-open"]);

	return (
		<ActiveLink
			href={route.href}
			className={className}
		>
			<LinkItemContent
				module={module}
				isActive={isActive}
				title={route.title}
			/>
		</ActiveLink>
	);
}
