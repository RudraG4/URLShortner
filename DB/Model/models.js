const mongoose = require('mongoose');

const URLSchema = new mongoose.Schema({
  original_url : { type: String, required: true },
  short_url: String,
  date_created: {type: Date, default: Date.now }
});

module.exports.ShortURL  = mongoose.model("ShortURL", URLSchema);