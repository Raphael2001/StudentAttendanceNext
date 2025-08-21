"use client";

import { useEffect } from "react";

import SideBarMenu from "components/Cms/CmsMenu/SideBarMenuCms/SideBarMenu";
import CMSHeader from "components/Cms/CmsMenu/CmsHeader/header";
import Api from "api";

import styles from "./MenuWrapper.module.scss";
import BurgerMenu from "../CmsHeader/BurgerMenu/BurgerMenu";
import { useRouter } from "next/navigation";
import { Routes } from "constants/routes";
import { useAppSelector } from "utils/hooks/useRedux";

function MenuWrapper(props) {
	const { children } = props;
	const deviceState = useAppSelector((store) => store.deviceState);
	const isBurgerOpen = useAppSelector((store) => store.burgerState);
	const userData = useAppSelector((store) => store.userData);
	const router = useRouter();
	const tokens = useAppSelector((store) => store.tokens);
	useEffect(() => {
		if (userData && Object.keys(userData).length) {
			Api.cms.initCms.GET();
		}
	}, [userData]);

	useEffect(() => {
		if (!tokens?.accessToken) {
			router.replace(Routes.cmsLogin);
		}
	}, [tokens?.accessToken]);

	return (
		<>
			{!deviceState.isDesktop && <BurgerMenu />}

			<div className={`${styles["menu-wrapper"]} ${isBurgerOpen ? styles["burger-open"] : ""}`}>
				{deviceState.notDesktop && <CMSHeader />}
				<div className={`${styles["sidebar-cms"]}`}>
					{deviceState.isDesktop && <SideBarMenu />}
					<div className={styles["cms"]}>
						<div className={styles["content"]}>{children}</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default MenuWrapper;
