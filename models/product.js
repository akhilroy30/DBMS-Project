const mongoose = require('mongoose')
var productSchema = new mongoose.Schema({
   id: String,
   pName: String,
   quantity: Number,
   price: Number,
   mfDate: Date,
   warehouse: String,
   admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin"
   },
   machines: [
      {
         type: String
      }
   ]
});

module.exports = mongoose.model("Product", productSchema);