import { SVGProps } from "utils/types/svg";

export default function CheckBox(props: SVGProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" {...props}>
      <rect
        width={17.5}
        height={17.5}
        fill="none"
        stroke="black"
        strokeWidth={0.5}
        rx={2}
        transform="translate(.5 .5)"
      />
    </svg>
  );
}
