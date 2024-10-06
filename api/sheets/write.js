// /api/sheets/write.js
module.exports = async (req, res) => {
  try {
    const body = await req.body;
    const { accessToken, sheetId, apiKey, value, range, majorDimension } = body;

    console.log("accessToken", accessToken);
    console.log("sheetId", sheetId);
    console.log("apiKey", apiKey);
    console.log("value", value);
    console.log("range", range);
    console.log("majorDimension", majorDimension);

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

      console.log(data);

      res.status(200).json({ data: data });
      // Handle the response data
    } catch (error) {
      console.error(
        "There was a problem with the write updated operation:",
        error
      );
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error communicating with Google Sheets API");
  }
};
