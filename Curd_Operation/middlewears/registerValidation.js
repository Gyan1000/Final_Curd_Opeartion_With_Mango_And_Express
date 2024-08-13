import validateEmail_Formate from "email-validator";
const registerValidation=(req,res,next)=>{

    const {name,email,password}=req.body;

    if(req.body!=null && name && email && password)
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
 export default registerValidation;