const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const category = new Schema({
    icon:{type:String,require:[true,"icon is required"], set: a => a === '' ? undefined : a},
    icon_name:{type:String,require:[true,"icon name is required"], set: b => b === '' ? undefined : b},
    category_name:{type:String,require:[true,"category name is required"], set: c => c === '' ? undefined : c},
    long_description:{type:String,require:[true,"long description is required"], set: d => d === '' ? undefined : d},
    sort_descripiton:{type:String,require:[true,"sort description is required"], set: e => e === '' ? undefined : e},
    general_info:{type:String,require:[true,"general info is required"], set: f => f === '' ? undefined : f},
    image:{type:String,require:[true,"image is required"], set: g => g === '' ? undefined : g},
    title:{type:String,require:[true,'title is required '], set: h => h === '' ? undefined : h},
    isDeleted :{type:Boolean , default: 0},
    deletedBy:{type:Schema.Types.ObjectId , ref:"user"},
    deletedDate:{type:Date}
},{timestamps:true});

const Category = mongoose.models.category || mongoose.model('category' ,category);
module.exports = Category;