
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    location: 
    {
        type:String, 
        required:true, 
    },
    date: 
    {
        type:Date, 
        default:Date.now 
    },
    
    password: 
        {
            type:String, 
            required:true, 
        },

});


const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;