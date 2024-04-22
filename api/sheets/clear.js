// /api/sheets/clear.js
module.exports = async (req, res) => {
  try {
    const body = await req.body;
    const { accessToken, sheetId, apiKey, position } = body;

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${position}:clear?key=${apiKey}`;
    console.log(url);

    const options = {
      method: "POST",
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

      console.log(data);

      res.status(200).json({ data: data });
      // Handle the response data
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      return res.status(500).send("Error communicating with Google Sheets API");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error communicating with Google Sheets API");
  }
};
