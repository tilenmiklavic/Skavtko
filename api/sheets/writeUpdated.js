// /api/sheets/writeUpdated.js
module.exports = async (req, res) => {
  try {
    const body = await req.body;
    const { accessToken, sheetId, apiKey, value, range, majorDimension } = body;

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?includeValuesInResponse=true&valueInputOption=RAW&key=${apiKey}`;

    const options = {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + accessToken,
        Accept: "application/json",
        "Content-Type": "application/json",
        valueInputOption: "RAW",
      },
      body: JSON.stringify({
        majorDimension: majorDimension,
        range: range,
        values: value,
      }),
      compress: true,
    };

    try {
      // Fetch data from external API
      const response = await fetch(url, options);
      const data = await response.json();

      res.status(200).json({ data: data });
      // Handle the response data
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error communicating with Google Sheets API");
  }
};
