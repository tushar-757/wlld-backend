const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema({
     username:{
         type:String,
         required:true,
         trim:true,
         unique:true
     },
     email:{
         type:String,
         required:true,
         trim:true,
         unique:true
     },
     password:{
         type:String,
         required:true,
         trim:true
     },
     token:{
         type:String,
     },
     about:{
         type:String
     },
     signUp:{
        type:String,
        enum:['GOOGLE','FACEBOOK','CUSTOM'],
        default:'CUSTOM'
    }
},{ timestamps: true })


adminSchema.methods.GenerateAuthToken = async function(){
    const user=this;
    const token = jwt.sign({
        _id: user._id,
        username: user.username,
        email: user.email,
    },process.env.SECRET,{ expiresIn: '45 days'});
    user.token=token
    await user.save()
}

module.exports  = mongoose.model("adminModel",adminSchema);