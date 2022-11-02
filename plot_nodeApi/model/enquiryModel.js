
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const enquiry = new Schema({
    listing:{type:Schema.Types.ObjectId,ref:'listing'},
    name:{type:String,require:[true,'name is required']},
    email:{type:String,require:[true,'email is required']},
    message:{type:String,require:[true,'message is required']}
});

const Enquiry = mongoose.model.enquiry || mongoose.model('enquiry',enquiry);

module.exports = Enquiry;