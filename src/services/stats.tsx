import moment from "moment";
import { isDateString } from "./dateTime";
import Attendance from "../classes/Attendance";
import { group2ColIndex, name2ColIndex } from "./gsheets";

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

export function numberOfMeetings(values: string[][]) {
  return values[0]?.filter((value) => isDateString(value)).length;
}

export function calculateMeetingAttendanceByUser(values: string[][]) {
  let attendance: Attendance[] = [];
  let meetings = numberOfMeetings(values);
  let nameIndex = name2ColIndex(values);
  let groupIndex = group2ColIndex(values);

  // loop through the first column of a 2D array
  for (let i = 1; i < values.length; i++) {
    let tempAttendance = {} as Attendance;
    let tempSum = 0;

    for (let j = 1; j < values[i].length; j++) {
      tempSum += values[i][j] === "x" ? 1 : 0;
    }

    tempAttendance.attendance = tempSum;
    tempAttendance.name = values[i][nameIndex];
    values[i][groupIndex] && (tempAttendance.group = values[i][groupIndex]);
    tempAttendance.percentage = (tempSum / meetings) * 100;

    attendance.push(tempAttendance);
  }

  return attendance;
}
