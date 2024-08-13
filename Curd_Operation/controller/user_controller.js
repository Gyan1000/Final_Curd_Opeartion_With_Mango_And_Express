import userModel from "../models/user_model.js";
import bcrypt from "bcrypt";

//REGISTER USER

export const registerUser=async(req,res)=>{
    const {name,email,password}=req.body;
    // TO CREATE COLLECTION IN DB 
    try{
        await userModel.create({...req.body});
        res.status(200).send({msg:"user registered successfully"});
    }
    catch(error)
    {
      if(error.code===11000)
      {
         res.status(504).send({msg:"Email Id already Exist"});
      }  
      else
         res.status(501).send({msg:error.message});
        
    }
   
  
}

export const loginUser=async(req,res)=>{
   const {email,password}=req.body;
   try{
      const userData=await userModel.findOne({email}).select("+password");
      if(userData)
      {
         if(await bcrypt.compare(password,userData.password))
         {
            const token=userData.jwtToken();

            const cookies_option={
               maxAge:24*60*60*1000,
               httpOnly:true
            }
            res.cookie("token",token,cookies_option)

            res.status(200).send({msg:"USER LOGIN SUCCESSFULLY ,ENJOY!"});
         }
         else
         {
            res.status(401).send({msg:"YOU HAVE ENTERED WRONG PASSWORD"});
         }
      }
      else{
        res.status(404).send({msg:"YOU HAVE ENTERED INVALID EMAIL ID"})
      }
   }
   catch(error)
   {
       res.status(501).send({msg:error.message})
   }    
}

