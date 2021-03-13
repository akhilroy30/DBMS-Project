const mongoose = require('mongoose');
var shipmentSchema = new mongoose.Schema({
   id: String,
   sName: String,
   date: Date,
   location: String,
   admin: {
      type: mongoose.Schema.Types.String,
      ref: 'Admin'
   },
   products: [
      {
         type: mongoose.Schema.Types.String,
         ref: 'Product'
      }
   ]
});

module.exports = mongoose.model("Shipment", shipmentSchema);