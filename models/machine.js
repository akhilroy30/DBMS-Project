const mongoose = require('mongoose')
var machineSchema = new mongoose.Schema({
   id: String,
   mName: String,
   usage: String,
   warehouse: String,
   raws: [
      {
         type: String
      }
   ]
});

module.exports = mongoose.model("Machine", machineSchema);