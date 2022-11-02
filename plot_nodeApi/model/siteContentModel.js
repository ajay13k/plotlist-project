const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var siteContent = mongoose.Schema({
  type:Map,
  of:String,
  image:{type : String},
},{ timestamps: true , strict: false});

var site = mongoose.models.siteContent || mongoose.model("siteContent", siteContent);
module.exports = site
