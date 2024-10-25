import { jwtDecode } from "jwt-decode";
import ApiValidationService from "services/ApiValidationService";

// generate unique IDs
export function generateUniqueId(length = 16) {
  const result = [];
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join("");
}

export function getBase64(file, cb) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result);
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
}
export function getHoursByStartEnd(startHour, endHour) {
  const hours = [];
  for (let i = startHour; i <= endHour; i++) {
    const hour = formatTime(i);
    hours.push(hour);
  }
  return hours;
}
export function getMinutesByInterval(interval = 1) {
  const minutes = [];
  for (let i = 0; i < 60; i += interval) {
    const minute = formatTime(i);
    minutes.push(minute);
  }
  return minutes;
}

export function formatTime(time) {
  if (typeof time === "string") {
    return time;
  }

  return time < 10 ? `0${time}` : time.toString();
}

export function parseJWT(token) {
  const decoded = jwtDecode(token);
  return decoded;
}

export function checkForJWTexp(token) {
  const currentTime = Math.floor(Date.now() / 1000);
  const decodedToken = parseJWT(token);
  const exp = decodedToken.exp;

  if (exp - 1 <= currentTime) {
    return true;
  }
  return false;
}

export function copy(item) {
  if (typeof item === "object") {
    return JSON.parse(JSON.stringify(item));
  }
  return item;
}

export function clsx() {
  const argsArray = Array.from(arguments);

  const filteredArgs = argsArray.filter((arg) => arg);

  return filteredArgs.join(" ");
}

export function createSortObject(objectsList) {
  const result = objectsList.reduce((acc, obj, index) => {
    acc[index + 1] = obj._id;
    return acc;
  }, {});
  return result;
}

export function formatDate(date) {
  if (date) {
    return (
      date.getDate() +
      "/" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "/" +
      getYear(date)
    );
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
