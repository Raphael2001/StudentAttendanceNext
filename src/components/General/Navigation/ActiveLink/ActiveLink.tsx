import Link from "next/link";

import { clsx } from "utils/functions";

type Props = {
  includes?: boolean;
  children?: React.ReactNode;
  className?: string;
  href?: string;
};

export default function ActiveLink(props: Props) {
  const {
    includes = false,
    children,
    className = "",
    href = "",
    ...rest
  } = props;

  return (
    <Link href={href} className={clsx(className)} {...rest}>
      {children && children}
    </Link>
  );
}
