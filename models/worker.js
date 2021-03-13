const mongoose = require('mongoose')
var workerSchema = new mongoose.Schema({
   id: String,
   ssnNumber: Number,
   fName: String,
   mName: String,
   lName: String,
   dob: Date,
   address: String,
   phone: Number,
   email: String,
   position: String,
   salary: Number,
   admin: {
      type: mongoose.Schema.Types.String,
      ref: 'Admin'
   },
   department: {
      type: mongoose.Schema.Types.String,
      ref: 'Department'
   }
});

module.exports = mongoose.model("Worker", workerSchema);