const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Users = mongoose.Schema({
  profile:{type : String ,required: [true,"please enter profile "] , set: a => a === '' ? undefined : a},
  first_name: { type: String, required: [true,"please enter first name"],set: b => b === '' ? undefined : b },
  last_name: { type: String, required: [true,"please enter last name"] ,set: c => c === '' ? undefined : c},
  state: { type: String, required: [true,"please enter state "] ,set: d => d === '' ? undefined : d},
  zip_code: { type: String, required: [true,"please enter zip code "] ,set: e => e === '' ? undefined : e},
  country: { type: String, required: [true,"please enter country "],set: f => f === '' ? undefined : f },
  city: { type: String, required: [true,"please enter city "] , set: g => g === '' ? undefined : g },
  street: { type: String, required: [true,"please enter street "], set: h => h === '' ? undefined : h },
  contact: { type: String,  required: [true,"please enter contact "], validate: {
    validator: function(v) {
        var re = /^\d{10}$/;
        return (!v || !v.trim().length) || re.test(v)
    },
    message: 'Provided phone number is invalid.'
} },
  email: { type: String, required: [true,"please enter email"], unique: [true,"please enter valid email"],set: i => i === '' ? undefined : i },
  password: { type: String, required: [true,"please enter password"] ,set: j => j === '' ? undefined : j},
  user_type:{type:Schema.Types.ObjectId ,ref:"Usertype", required:true , set: k => k === '' ? undefined : k},
  isDeleted :{type:Boolean , default: 0},
  deletedBy:{type:Schema.Types.ObjectId , ref : "user"},
  deletedDate:{type:Date}
  
},
{
 timestamps:true 
});

var user = mongoose.models.User || mongoose.model("User", Users);
module.exports = user;
