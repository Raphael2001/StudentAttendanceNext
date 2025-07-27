import { jwtDecode, JwtPayload } from "jwt-decode";

// generate unique IDs
export function generateUniqueId(length: number = 16): string {
	const result: string[] = [];
	const characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const charactersLength: number = characters.length;
	for (let i = 0; i < length; i++) {
		result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
	}
	return result.join("");
}

// getBase64 function
export function getBase64(file: File, cb: (result: string | ArrayBuffer | null) => void): void {
	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function () {
		cb(reader.result);
	};
	reader.onerror = function (error) {
		console.log("Error: ", error);
	};
}

// getHoursByStartEnd function
export function getHoursByStartEnd(startHour: number, endHour: number): string[] {
	const hours: string[] = [];
	for (let i = startHour; i <= endHour; i++) {
		const hour: string = formatTime(i);
		hours.push(hour);
	}
	return hours;
}

// getMinutesByInterval function
export function getMinutesByInterval(interval: number = 1): string[] {
	const minutes: string[] = [];
	for (let i = 0; i < 60; i += interval) {
		const minute: string = formatTime(i);
		minutes.push(minute);
	}
	return minutes;
}

// formatTime function
export function formatTime(time: number | string): string {
	if (typeof time === "string") {
		return time;
	}
	return time < 10 ? `0${time}` : time.toString();
}

// parseJWT function
interface DecodedToken extends JwtPayload {
	[key: string]: any;
}

export function parseJWT(token: string): DecodedToken {
	return jwtDecode<DecodedToken>(token);
}

// checkForJWTexp function
export function checkForJWTexp(token: string): boolean {
	const currentTime: number = Math.floor(Date.now() / 1000);
	const decodedToken: DecodedToken = parseJWT(token);
	const exp = decodedToken.exp;

	if (!exp) {
		throw new Error("Token does not have an 'exp' field");
	}

	return exp - 1 <= currentTime;
}

// copy function
export function copy<T>(item: T) {
	if (typeof item === "object" && item !== null) {
		return JSON.parse(JSON.stringify(item));
	}
	return item;
}

// clsx function
export function clsx(...args: (string | boolean | null | undefined)[]): string {
	return args.filter(Boolean).join(" ");
}

// createSortObject function
interface ObjectWithId {
	_id: string;
}

export function createSortObject(objectsList: ObjectWithId[]): Record<number, string> {
	return objectsList.reduce((acc: Record<number, string>, obj: ObjectWithId, index: number) => {
		acc[index + 1] = obj._id;
		return acc;
	}, {});
}

export function fileToBase64(file: File) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			resolve(reader.result);
		};
		reader.onerror = (err) => reject(err);
		reader.readAsDataURL(file);
	});
}

export function isValidArray(value: any): boolean {
	return Array.isArray(value) && value.length > 0;
}

export function formatDate(date) {
	if (date) {
		return date.getDate() + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + getYear(date);
	}

	return null;
}

function getYear(date) {
	return date?.getFullYear()?.toString();
}

export function convertStringToDate(dateString) {
	// Split the string by '/' to get day, month, and year
	const [day, month, year] = dateString.split("/");

	// Create a new Date object (note: months are 0-indexed, so subtract 1 from month)
	const date = new Date(year, month - 1, day);

	return date;
}
