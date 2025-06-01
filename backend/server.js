const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = 4000;

const RAPIDAPI_KEY = "c9c4da4dc3msh8353a570ddb93bfp183a1bjsn01ee26b1fe4c"; // Replace this
const RAPIDAPI_HOST = "google-news13.p.rapidapi.com";

app.use(cors());

app.get("/news", async (req, res) => {
  const url = "https://google-news13.p.rapidapi.com/business?lr=en-US";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": RAPIDAPI_KEY,
      "x-rapidapi-host": RAPIDAPI_HOST,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`API error: ${response.status}, ${response.statusText}, ${errorBody}`);
      return res.status(response.status).json({ error: "API error" });
    }

    const result = await response.json();
    res.json(result.articles || result);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
