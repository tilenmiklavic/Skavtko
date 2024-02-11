// /api/append.js
module.exports = async (req, res) => {
  const axios = require("axios");

  try {
    const body = await req.body;
    const { accessToken, sheetId, apiKey, values } = body;
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
        values: values,
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
