const mongoose = require('mongoose')
var warehouseSchema = new mongoose.Schema({
   id: String,
   wName: String,
   wSize: Number,
   address: String,
   admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin'
   },
   raws: [
      {
         type: String,
         ref: 'Raw'
      }
   ],
   machines: [
      {
         type: String,
         ref: 'Machine'
      }
   ]
});

module.exports = mongoose.model("Warehouse", warehouseSchema);