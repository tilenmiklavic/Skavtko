// /api/sheets/clear.js
module.exports = async (req, res) => {
    try {
        const body = await req.body;
        const { accessToken, sheetId, apiKey, position, method } = body;
        let url, options;

        if (method === "clear") {
            url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${position}:clear?key=${apiKey}`;

            options = {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + accessToken,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    valueInputOption: "RAW"
                },
                compress: true
            };
        } else if (method === "remove_row") {
            url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values:batchClear?key=${apiKey}`;
            options = {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + accessToken,
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ranges: [position]
                }),
                compress: true
            };
        }

        try {
            // Fetch data from external API
            const response = await fetch(url, options);
            const data = await response.json();

            res.status(200).json({ data: data });
            // Handle the response data
        } catch (error) {
            console.error(
                "There was a problem with the clear operation:",
                error
            );
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error communicating with Google Sheets API");
    }
};
