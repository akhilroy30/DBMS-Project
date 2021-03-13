const mongoose = require('mongoose')
var customerSchema = new mongoose.Schema({
   id: String,
   fName: String,
   mName: String,
   lName: String,
   dob: Date,
   address: String,
   phone: Number,
   email: String,
   password: String,
   products: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'product'
      }
   ]
});

module.exports = mongoose.model("Customer", customerSchema);