// /api/directions/get.js
module.exports = async (req, res) => {
  const axios = require("axios");

  try {
    const body = await req.body;
    const { accessToken, lat1, lng1, lat2, lng2 } = body;
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${lat1}%2C${lng1}%3B${lat2}%2C${lng2}?alternatives=true&annotations=distance%2Cduration&geometries=geojson&language=en&overview=full&steps=true&access_token=${accessToken}`;

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
      console.error("There was a problem with the fetch operation:", error);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error communicating with Google Sheets API");
  }
};
