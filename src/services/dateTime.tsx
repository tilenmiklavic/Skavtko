import moment from "moment";

export default function formatTime(timeString: string) {
  // Split the time string into hours, minutes, and seconds

  if (timeString) {
    let [hours, minutes, seconds] = timeString.split(":");

    // Pad minutes and seconds with leading zeros if necessary
    minutes = minutes.padStart(2, "0");
    seconds = seconds.padStart(2, "0");

    // Return the formatted time string
    return `${hours}:${minutes}:${seconds}`;
  }

  return "";
}

export function isDateString(dateString: string) {
  return moment(dateString, "D.M.YYYY", true).isValid();
}

export function includesDate(headers: string[], today: string) {
  return headers.some(header => {
    return moment(header, "DD.MM.YYYY").isSame(moment(today, "DD.MM.YYYY"));
  })
}