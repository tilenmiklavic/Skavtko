export async function listSheets() {
  const access_token = JSON.parse(localStorage.getItem("auth")!).access_token;

  const formData = {
    accessToken: access_token,
    apiKey: process.env.REACT_APP_API_KEY,
  };

  try {
    const response = await fetch("/api/drive/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const result = await response.json();
      return filterFiles(result, "spreadsheet");
    } else {
      console.error("Error from server", response);
      // Handle server errors or non-OK responses
    }
  } catch (error) {
    console.error("Network error:", error);
    // Handle network errors
  }
}

export async function getSheets(): Promise<any[]> {
  // Get sheets from local storage
  let sheets = localStorage.getItem("files") || "[]";

  // If the sheets are not found, fetch them from the server
  if (!sheets) {
    const newSheets = await listSheets();
    localStorage.setItem("files", JSON.stringify(newSheets));
    return newSheets || [];
  }

  // Parse the sheets
  sheets = JSON.parse(sheets);

  if (!Array.isArray(sheets)) {
    return [];
  }

  return sheets;
}

function filterFiles(files: Response, filter: string) {
  return files.data.files.filter((sheet) =>
    sheet.mimeType.toLowerCase().includes(filter.toLowerCase())
  );
}

interface Response {
  data: {
    files: any[];
  };
}

export interface DriveFile {
  kind: string;
  mimeType: string;
  id: string;
  name: string;
}
