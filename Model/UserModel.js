const mongoose = require("mongoose");   

const userSchema = new mongoose.Schema({
    name : { type : String , required : true  },
    email : { type : String , required : true , unique : true },
    password : { type : String , required : true },
    otp: Number,
    isVerified: { type: Boolean, default: false },
    otpExpires: { type: Date }
})

    const User = mongoose.model("RegisterUser" , userSchema);
    module.exports = User;