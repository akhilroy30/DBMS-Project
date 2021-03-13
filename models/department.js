const mongoose = require('mongoose');
var departmentSchema = new mongoose.Schema({
   id: String,
   dName: String,
   purpose: String
});

module.exports = mongoose.model("Department", departmentSchema);