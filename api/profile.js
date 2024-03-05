// /api/append.js
module.exports = async (req, res) => {
  console.log("Here");
  try {
    const body = await req.body;
    const { apiKey, accessToken } = body;

    const response = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch user info");
    }
    const data = await response.json();

    console.log("User info:", data);

    res.status(200).json({ data: data });
  } catch (error) {
    console.error("Error fetching user info:", error);
  }
};
