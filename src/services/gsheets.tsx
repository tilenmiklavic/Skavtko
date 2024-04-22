import { get } from "http";

export async function appendToSheet(values: string[][], sheet_id: string) {
  // Assuming `formData` is the data you want to append, structured as needed for your Google Sheet

  const access_token = JSON.parse(localStorage.getItem("auth")!).access_token;
  // const sheet_id = JSON.parse(localStorage.getItem("sheetLink")!).id;

  const formData = {
    accessToken: access_token,
    sheetId: sheet_id,
    apiKey: process.env.REACT_APP_API_KEY,
    values: values,
  };

  try {
    const response = await fetch("/api/append", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      console.error("Error from server", response);
      // Handle server errors or non-OK responses
    }
  } catch (error) {
    console.error("Network error:", error);
    // Handle network errors
  }
}

export async function writeToSheet(
  value: string,
  position: string,
  sheet_id: string
) {
  const access_token = JSON.parse(localStorage.getItem("auth")!).access_token;
  // const sheet_id = JSON.parse(localStorage.getItem("sheetLink")!).id;

  const formData = {
    accessToken: access_token,
    sheetId: sheet_id,
    apiKey: process.env.REACT_APP_API_KEY,
    value: value,
    position: position,
  };

  try {
    const response = await fetch("/api/sheets/write", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const result = await response.json();
      const updatedSheet = await getSheet(sheet_id);
      return updatedSheet;
    } else {
      console.error("Error from server", response);
      // Handle server errors or non-OK responses
    }
  } catch (error) {
    console.error("Network error:", error);
    // Handle network errors
  }
}

export async function writeToSheet2(
  sheet_id: string,
  value: string,
  range: string,
  majorDimension: string
) {
  const access_token = JSON.parse(localStorage.getItem("auth")!).access_token;

  const formData = {
    accessToken: access_token,
    sheetId: sheet_id,
    apiKey: process.env.REACT_APP_API_KEY,
    value: value,
    range: range,
    majorDimension: majorDimension,
  };

  try {
    const response = await fetch("/api/sheets/writeUpdated", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const result = await response.json();
      const updatedSheet = await getSheet(sheet_id);
      return updatedSheet;
    } else {
      console.error("Error from server", response);
      // Handle server errors or non-OK responses
    }
  } catch (error) {
    console.error("Network error:", error);
    // Handle network errors
  }
}

export async function getSheet(sheet_id: string) {
  // Assuming `formData` is the data you want to append, structured as needed for your Google Sheet

  const access_token = JSON.parse(localStorage.getItem("auth")!).access_token;
  // const sheet_id = JSON.parse(localStorage.getItem("sheetLink")!).id;

  const formData = {
    accessToken: access_token,
    apiKey: process.env.REACT_APP_API_KEY,
    sheetId: sheet_id,
  };

  try {
    const response = await fetch("/api/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      console.error("Error from server", response);
      // Handle server errors or non-OK responses
    }
  } catch (error) {
    console.error("Network error:", error);
    // Handle network errors
  }
}

export async function getSheetInfo(sheet_id: string) {
  // Assuming `formData` is the data you want to append, structured as needed for your Google Sheet

  const access_token = JSON.parse(localStorage.getItem("auth")!).access_token;
  // const sheet_id = JSON.parse(localStorage.getItem("sheetLink")!).id;

  const formData = {
    accessToken: access_token,
    apiKey: process.env.REACT_APP_API_KEY,
    sheetId: sheet_id,
  };

  try {
    const response = await fetch("/api/sheets/info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      console.error("Error from server", response);
      // Handle server errors or non-OK responses
    }
  } catch (error) {
    console.error("Network error:", error);
    // Handle network errors
  }
}

export async function appendHeaderItem(
  sheet_id: string,
  data: string[][],
  value: string
) {
  const access_token = JSON.parse(localStorage.getItem("auth")!).access_token;

  const formData = {
    accessToken: access_token,
    sheetId: sheet_id,
    apiKey: process.env.REACT_APP_API_KEY,
    values: [[value]],
    range: `${colNumber2ColLetter(data[0].length)}:${colNumber2ColLetter(
      data[0].length
    )}`,
  };

  try {
    const response = await fetch("/api/sheets/appendHeader", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      console.error("Error from server", response);
      // Handle server errors or non-OK responses
    }
  } catch (error) {
    console.error("Network error:", error);
    // Handle network errors
  }
}

export async function clearSheet(sheet_id: string) {
  const access_token = JSON.parse(localStorage.getItem("auth")!).access_token;
  // const sheet_id = JSON.parse(localStorage.getItem("sheetLink")!).id;

  let position = "A:Z";

  const formData = {
    accessToken: access_token,
    sheetId: sheet_id,
    apiKey: process.env.REACT_APP_API_KEY,
    position: position,
  };

  try {
    const response = await fetch("/api/sheets/clear", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      console.error("Error from server", response);
      // Handle server errors or non-OK responses
    }
  } catch (error) {
    console.error("Network error:", error);
    // Handle network errors
  }
}

export async function formatSheet(sheet_id: string) {
  clearSheet(sheet_id).then(() => {
    // read json from local file
    const body = require("../lib/format_sheets/prisotnost.json");

    writeToSheet2(sheet_id, body.values, body.range, body.majorDimension).then(
      () => {
        console.log("Wrote formatted values");
      }
    );
  });
}

export function sheet2Object(sheet: string[][]): any[] {
  if (sheet.length === 0) {
    return [];
  }

  const headers = sheet[0];
  const data = sheet.slice(1);

  const result = data.map((row) => {
    const obj = {} as any;
    row.forEach((cell, i) => {
      obj[headers[i]] = cell;
    });
    return obj;
  });

  return result;
}

export function colNumber2ColLetter(colNumber: number) {
  let dividend = colNumber + 1;
  let columnName = "";
  let modulo;

  while (dividend > 0) {
    modulo = (dividend - 1) % 26;
    columnName = String.fromCharCode(65 + modulo) + columnName;
    dividend = Math.floor((dividend - modulo) / 26);
  }

  return columnName;
}

export function name2RowNumber(data: string[][], name: string) {
  const col = 0;
  const row = data.findIndex((row) => row[col] === name);
  return row + 1;
}

export function date2Col(data: string[][], date: string) {
  const row = 0;
  const col = data[row].findIndex((cell) => cell === date);
  return colNumber2ColLetter(col);
}

export function name2ColIndex(data: string[][]): number {
  const possibleValues = ["ime", "name"];
  let foundIndex = -1;

  data[0]?.forEach((value, index) => {
    if (possibleValues.includes(value.toLowerCase())) {
      foundIndex = index;
    }
  });

  return foundIndex;
}

export function group2ColIndex(data: string[][]): number {
  const possibleValues = ["vod", "skupina", "group", "gruča"];
  let foundIndex = -1;

  data[0]?.forEach((value, index) => {
    if (possibleValues.includes(value.toLowerCase())) {
      foundIndex = index;
    }
  });

  return foundIndex;
}
