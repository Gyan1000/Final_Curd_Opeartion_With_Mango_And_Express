import validateEmail_Formate from "email-validator"
const loginValidation=(req,res,next)=>{
   const {email,password}=req.body;
   if(req.body!=null && email && password)
   {
     // validate Email Formate
      const validEmailFormate=validateEmail_Formate.validate(email)
    if(!validEmailFormate)
    {
        res.status(404).send("PLEASE ENTER VALID EMAIL ADDRESS")
    } 
      
      else
        next()
   }      
   else
   {
    res.status(501).send({msg:"ALL INPUT FIELDS ARE REQUIRED"})
   }
}
export default loginValidation;