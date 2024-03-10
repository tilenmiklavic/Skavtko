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

export function sheet2Object(sheet: string[][]) {
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
