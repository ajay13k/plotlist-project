const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var contact = mongoose.Schema({
    name:{type:String , required:[true ,"please enter your name"]},
    surName:{type:String , required:[true ,"please enter your surname"]},
    email:{type:String , required:[true ,"please enter your email"]},
    message:{type:String , required:[true ,"please enter message"]},
    category:[{type:Schema.Types.ObjectId , ref:'category'}],
    isDeleted :{type:Boolean , default: 0},
    deletedBy:{type:Schema.Types.ObjectId , ref : "user"},
    deletedDate:{type:Date}
 
},{timestamps: true});

var Contact = mongoose.models.contact || mongoose.model("contact", contact);
module.exports = Contact
