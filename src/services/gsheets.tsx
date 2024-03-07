export async function writeToSheets(values: string[][]) {
  // Assuming `formData` is the data you want to append, structured as needed for your Google Sheet

  const access_token = JSON.parse(localStorage.getItem("auth")!).access_token;
  const sheet_id = JSON.parse(localStorage.getItem("sheetLink")!).id;

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

export async function getSheet() {
  // Assuming `formData` is the data you want to append, structured as needed for your Google Sheet

  const access_token = JSON.parse(localStorage.getItem("auth")!).access_token;
  const sheet_id = JSON.parse(localStorage.getItem("sheetLink")!).id;

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
