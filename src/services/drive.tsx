let initialCall = true;
let originsWaiting: Array<(data: any) => void> = [];

export async function listSheets() {
  const access_token = JSON.parse(localStorage.getItem("auth")!).access_token;

  const formData = {
    accessToken: access_token,
    apiKey: process.env.REACT_APP_API_KEY,
    q: "mimeType: 'application/vnd.google-apps.spreadsheet'"
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

export async function getSheets(foo?:(data: any) => void) {
  foo && originsWaiting.push(foo);

  // Get sheets from local storage
  let sheets: any;

  // If the sheets are not found, fetch them from the server
  if (initialCall) {
    initialCall = false;
    sheets = await listSheets();
    localStorage.setItem("files", JSON.stringify(sheets));
  } else {
    let files = localStorage.getItem("files")
    sheets = JSON.parse(files || "{}");
  }

  originsWaiting.forEach(origin => {
    origin(sheets);
  })

  originsWaiting = [];
}

function filterFiles(files: Response, filter: string) {
  return files.data.files
    .filter((sheet) =>
      sheet.mimeType.toLowerCase().includes(filter.toLowerCase())
    )
    .map((file) => ({
      ...file,
      value: file.id,
      label: file.name,
    }));
}

interface Response {
  data: {
    files: any[];
  };
}
