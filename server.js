const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use("/", express.static("public"));

// Load costumes data from JSON
const costumes = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "costumes.json")));

app.get("/api/costumes", (req, res) => {
  res.json(costumes);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});