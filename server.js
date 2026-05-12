 import express from "express";
import fs from "fs";
import path from "path";
import cron from "node-cron";
import { fileURLToPath } from "url";
import { fetchPublications } from "./scraper.js";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Azure-persistent folder
const DATA_DIR = process.env.DATA_DIR || "/home/data";
const PUBLICATIONS_FILE = path.join(DATA_DIR, "publications.json");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

// API
app.get("/api/publications", async (req, res) => {
  try {
    let data;

    if (fs.existsSync(PUBLICATIONS_FILE)) {
      data = JSON.parse(fs.readFileSync(PUBLICATIONS_FILE, "utf-8"));
    } else {
      data = await fetchPublications();
      fs.writeFileSync(PUBLICATIONS_FILE, JSON.stringify(data, null, 2), "utf-8");
    }

    res.json(data);
  } catch (err) {
    console.error("API error:", err.message);
    res.status(500).json({ error: "Failed to load publications" });
  }
});

// Pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/publication", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "publication.html"));
});

app.get("/events", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "NavBar-Pages", "events.html"));
});

app.get("/team", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "NavBar-Pages", "team.html"));
});

app.get("/joinUs", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "NavBar-Pages", "joinUs.html"));
});

app.get("/collabrations", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "NavBar-Pages", "collabrations.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "NavBar-Pages", "contact.html"));
});

app.get("/funding", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "NavBar-Pages", "funding.html"));
});

app.get("/lab", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "NavBar-Pages", "lab.html"));
});

app.get("/overview", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "NavBar-Pages", "overview.html"));
});

app.get("/research-category", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "NavBar-Pages", "research-category.html"));
});

app.get("/research-detail", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "NavBar-Pages", "research-detail.html"));
});

app.get("/profile", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "Person-Pages", "profile.html"));
});

// Cron: every day at 12:00
cron.schedule("0 12 * * *", async () => {
  try {
    console.log("🔄 Running cron at:", new Date().toISOString());

    const publications = await fetchPublications(false);

    fs.writeFileSync(
      PUBLICATIONS_FILE,
      JSON.stringify(publications, null, 2),
      "utf-8"
    );

    console.log(`✅ Saved ${publications.length} publications.`);
  } catch (err) {
    console.error("❌ Cron job failed:", err.message);
  }
}, {
  timezone: "Europe/Brussels"
});

console.log("⏰ Cron job scheduled (daily at 12:00)");

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
app.listen(PORT, () => {
  console.log(`Server running → http://localhost:${PORT}`);
});