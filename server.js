const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const Joi = require("joi");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use("/", express.static("public"));
app.use("/Images", express.static(path.join(__dirname, "public", "Images")));
app.use(express.json());

const costumes = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "costumes.json")));

app.get("/api/costumes", (req, res) => {
  res.json(costumes);
});

const costumeSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  price: Joi.string().required(),
  category: Joi.string().required(),
  description: Joi.string().required(),
  Size: Joi.string().required(),
  img_name: Joi.string().required()
});

app.post("/api/costumes", (req, res) => {
  const { error, value } = costumeSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, error: error.details[0].message });
  }

  costumes.push(value);

  res.json({ success: true, newCostume: value });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});