// /api/append.js
module.exports = async (req, res) => {
  const axios = require("axios");

  try {
    // const response = await axios({
    //   method: "post",
    //   url: "https://sheets.googleapis.com/v4/spreadsheets/YOUR_SHEET_ID/values/A:A:append?valueInputOption=RAW",
    //   headers: {
    //     Authorization: `Bearer YOUR_ACCESS_TOKEN`, // Ensure this is securely managed
    //     "Content-Type": "application/json",
    //   },
    //   data: req.body,
    // });

    res.status(200).json({ message: "Data appended to Google Sheets" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error communicating with Google Sheets API");
  }
};
