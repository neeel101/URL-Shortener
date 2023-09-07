
const mongoose = require("mongoose");
const urlSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  redirectUrl: {
    type: String,
    unique: true,
  },
  visitHistory: [
    {
      timestamp: {
        type: Number,
      },
    },
  ],
}); 
const urlModel = mongoose.model("url", urlSchema);

module.exports = {urlModel}


