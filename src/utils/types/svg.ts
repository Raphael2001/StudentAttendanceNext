import React from "react";

export type SVGProps = {
	className?: string;
};

export type SVGIcon = React.FC<React.SVGProps<SVGSVGElement>>;

export type IconType = SVGIcon | string;
