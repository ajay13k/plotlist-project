const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var User_type = mongoose.Schema({
  user_type: { type: String, required: [true,'user type is required'] , unique:[true,'duplicate not allowed '], set: h => h === '' ? undefined : h},
 
});

var userType = mongoose.models.Usertype || mongoose.model("Usertype", User_type);
module.exports = userType;
