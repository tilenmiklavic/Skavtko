export const POST = async (req: any, res: any) => {
  const body = await req.json();
  const { accessToken, sheetId, apiKey, data } = body;

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/A:A:append?valueInputOption=RAW&key=${apiKey}`;

  const options = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      Accept: "application/json",
      "Content-Type": "application/json",
      valueInputOption: "RAW",
    },
    body: JSON.stringify({
      majorDimension: "ROWS",
      range: "A:A",
      values: [data],
    }),
    compress: true,
  };

  try {
    // Fetch data from external API
    const response = await fetch(url, options);
    const data = await response.json();

    return data.json();
    // Handle the response data
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export const GET = async (req: any) => {
  // Get JSON payload
  const data = await req.json();

  // Return Response
  return data.json();
};
