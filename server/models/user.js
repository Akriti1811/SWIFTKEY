const mongoose = require("mongoose");
const {ObjectId} =mongoose.Schema;

const userSchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        require:true,
        index:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
    }},
    {timestamps:true}
);

module.exports = mongoose.model('User',userSchema);