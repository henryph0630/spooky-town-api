const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

const costumes = [
  {
    id: 1,
    name: "Zombie Cheerleader",
    image: "https://yourrenderurl.com/images/zombie.jpg",
    price: "29.99",
    size: "M",
    description: "Perfect for undead pep rallies."
  },
  {
    id: 2,
    name: "Vampire Knight",
    image: "https://yourrenderurl.com/images/vampire.jpg",
    price: "39.99",
    size: "L",
    description: "Sink your teeth into this classy costume."
  }
];

app.get("/api/costumes", (req, res) => {
  res.json(costumes);
});

// Optional: serve a static HTML page to document the API
app.use("/", express.static("public"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});