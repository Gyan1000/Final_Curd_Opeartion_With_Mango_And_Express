import mongoose from "mongoose";
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name Is required'],
        trim:true,
        minLength:[5,"name must be atleast 5 character"],
        maxLength:[50,"name must be atleast  50 character"]
    },
    email:{
        type:String,
        required:[true,'Email Is required'],
        unique:true,
        lowercase:true,
        unique:[true,"already registered"]
    },
    password:{
        type:String,
        required:[true,'Password Is required']
    }
})
userSchema.pre('save',async function(next){
    if(!this.isModified("password"))
         return next();
     this.password=await bcrypt.hash(this.password,10)
        return next();   
})
userSchema.methods={
   jwtToken(){
    return JWT.sign({
        id:this._id, email:this.email
    },
    process.env.SECRET,
    
    {expiresIn:"24h"}
    
    );
   }
}



const userModel=mongoose.model("user_validation",userSchema)



export default userModel;