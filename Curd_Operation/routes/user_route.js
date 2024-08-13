import express from "express";

import {registerUser,loginUser} from "../controller/user_controller.js";

const userRouter=express.Router();

//custom middlewears
import loginValidation from "../middlewears/loginValidation.js"

import registerValidation from "../middlewears/registerValidation.js"



userRouter.post("/register",registerValidation,registerUser);
userRouter.post("/login",loginValidation,loginUser);

export default userRouter;