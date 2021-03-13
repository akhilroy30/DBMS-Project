const mongoose = require('mongoose')
var adminSchema = new mongoose.Schema({
   id: String,
   username: String,
   password: String,
   products: [
      {
         type: String
      }
   ],
   workers: [
      {
         type: String
      }
   ],
   warehouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Warehouse'
   }
});


module.exports = mongoose.model("Admin", adminSchema);