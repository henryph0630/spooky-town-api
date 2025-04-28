const mongoose = require('mongoose');

const costumeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  Size: { type: String, required: true },
  description: { type: String, required: true },
  img_name: { type: String, required: true }
});

const Costume = mongoose.model('Costume', costumeSchema);

module.exports = Costume;