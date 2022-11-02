const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const listing = new Schema({
title : {type:String, require:[true,'listing title is required']},
description:{type:String, require:[true,'listing description is required']},
categroyid :{type:Schema.Types.ObjectId , ref:"category" ,require:[true,'listing category is required']},
PostedUserid :{type:Schema.Types.ObjectId , ref:"User"},
image:[{type:String, require:[true,'listing image is required']}],
isActive:{type:Boolean, default:1},
status : {type:String, default:'pending'},
reviews:[
  {
      userid:{type:Schema.Types.ObjectId , ref:"User"},
     reviewPoint:{type:Number, require:[true,' review point is required']}
  }
],
postedDate:{type:Date},
 metadata: {
    type: Map,
    of: String
  },
  isDeleted : {type:Boolean,default:0},
  deletedBy: {type:Schema.Types.ObjectId, ref:"User" },
  deletedDate:{type:Date}
},{timestamps:true});

const Listing = mongoose.models.listing || mongoose.model('listing',listing);
module.exports = Listing ;