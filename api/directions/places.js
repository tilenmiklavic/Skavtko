// /api/directions/get.js
module.exports = async (req, res) => {
  try {
    const body = await req.body;
    const { accessToken, lat, lng, query } = body;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?routing=true&proximity=${lat}%2C${lng}&language=en-US&access_token=${accessToken}`;

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
