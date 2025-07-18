import { useEffect } from "react";

export function useOutsideClick(ref, onClickOutside) {
	useEffect(() => {
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				typeof onClickOutside === "function" && onClickOutside();
			}
		}
		// Bind the event listener
		document.addEventListener("click", handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("click", handleClickOutside);
		};
	}, [ref]);
}

/* --------------

usage:
const wrapperRef = useRef(null);
useOutsideClick(wrapperRef, function(){});



-------- */
