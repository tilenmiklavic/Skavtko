// /api/sheets/info.js
module.exports = async (req, res) => {
  const axios = require("axios");

  try {
    const body = await req.body;
    const { accessToken, apiKey, sheetId } = body;
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}?key=${apiKey}`;

    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
        Accept: "application/json",
        "Content-Type": "application/json",
        valueInputOption: "RAW",
      },
      compress: true,
    };

    try {
      // Fetch data from external API
      const response = await fetch(url, options);
      const data = await response.json();

      res.status(200).json({ data: data });
      // Handle the response data
    } catch (error) {
      console.error("There was a problem with the info operation:", error);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error communicating with Google Sheets API");
  }
};
