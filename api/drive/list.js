// /api/drive/list.js
module.exports = async (req, res) => {
  try {
    const body = await req.body;
    const { accessToken, apiKey, q } = body;
    const url = `https://www.googleapis.com/drive/v3/files?key=${apiKey}&q=${q}`;

    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
        Accept: "application/json",
        "Content-Type": "application/json",
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
      console.error("There was a problem with the list operation:", error);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error communicating with Google Drive API");
  }
};
