require('dotenv').config();
const mongoose = require('mongoose');
const Costume = require('./models/Costume');
const fs = require('fs');
const path = require('path');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected for Seeding'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// Load costumes.json data
const costumesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'costumes.json')));

// Transform the data (remove "id" and "category", and fix price to number)
const transformedCostumes = costumesData.map(c => ({
  name: c.name,
  price: parseFloat(c.price),
  Size: c.Size,
  description: c.description,
  img_name: c.img_name
}));

// Seed function
async function seedDB() {
  try {
    // Optional: Clear existing costumes first
    await Costume.deleteMany({});
    console.log('Old costumes cleared.');

    // Insert new costumes
    await Costume.insertMany(transformedCostumes);
    console.log('Costumes seeded successfully!');

    mongoose.connection.close();
  } catch (err) {
    console.error('Seeding error:', err);
  }
}

seedDB();