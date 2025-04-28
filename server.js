require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const Joi = require("joi");
const Costume = require("./models/Costume");

const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected Successfully'))
.catch((err) => console.error('MongoDB Connection Error:', err));

// Middleware
app.use(cors());
app.use("/", express.static("public"));
app.use("/Images", express.static(path.join(__dirname, "public", "Images")));
app.use(express.json());

// Joi Validation Schema
const costumeSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  Size: Joi.string().required(),
  description: Joi.string().required(),
  img_name: Joi.string().required()
});

// Routes

// GET costumes
app.get("/api/costumes", async (req, res) => {
  const costumes = await Costume.find();
  res.json(costumes);
});

// POST costume
app.post("/api/costumes", async (req, res) => {
  const { error, value } = costumeSchema.validate(req.body);
  if (error) return res.status(400).json({ success: false, error: error.details[0].message });

  const newCostume = new Costume(value);
  await newCostume.save();
  res.json({ success: true, newCostume });
});

// PUT costume
app.put("/api/costumes/:id", async (req, res) => {
  const { error, value } = costumeSchema.validate(req.body);
  if (error) return res.status(400).json({ success: false, error: error.details[0].message });

  const updatedCostume = await Costume.findByIdAndUpdate(req.params.id, value, { new: true });
  if (!updatedCostume) return res.status(404).json({ success: false, error: "Costume not found" });

  res.json({ success: true, updatedCostume });
});

// DELETE costume
app.delete("/api/costumes/:id", async (req, res) => {
  const deletedCostume = await Costume.findByIdAndDelete(req.params.id);
  if (!deletedCostume) return res.status(404).json({ success: false, error: "Costume not found" });

  res.json({ success: true, deletedCostume });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});