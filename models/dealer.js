const mongoose = require('mongoose');
var dealerSchema = new mongoose.Schema({
   id: String,
   dName: String,
   phone: Number,
   location: String
});

module.exports = mongoose.model("Dealer", dealerSchema);