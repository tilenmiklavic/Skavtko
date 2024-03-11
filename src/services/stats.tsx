import moment from "moment";
import { isDateString } from "./dateTime";

export function calculateMeetingAttendanceSum(values: string[][]) {
  let sums: number[] = [];

  values[0]?.forEach((value, index) => {
    if (isDateString(value)) {
      let tempSum = 0;

      for (let i = 1; i < values.length; i++) {
        tempSum += values[i][index] === "x" ? 1 : 0;
      }

      sums.push(tempSum);
    }
  });
  return sums;
}

export function meetingLabels(values: string[][]) {
  let dates: string[] = [];

  values[0]?.forEach((value) => {
    if (isDateString(value)) {
      dates.push(moment(value, "D.M.YYYY").format("D.M."));
    }
  });

  return dates;
}
