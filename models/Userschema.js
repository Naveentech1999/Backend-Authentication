const mongoose = require("mongoose");

const createUser = new mongoose.Schema({

     Username:{
        type:String,
        required:true
        
    },
    Email:{
        type:String,
        required:true,
        unique:true,
    },
    Password:{
        type:String,
        required:true
    },
    ConfrimPassword:{
        type:String,
        required:true
        
    }
});
    


module.exports = mongoose.model("userSchema",createUser)