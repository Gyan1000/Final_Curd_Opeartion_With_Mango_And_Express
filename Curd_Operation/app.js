import {config} from "dotenv";
config();

import express from "express";
import morgan from "morgan";
import cors from "cors";
import dbConnection from "./config/db_connection.js";
import userRouter from "./routes/user_route.js";

const  app=express();

// middleware
app.use(express.json())

app.use(cors())
app.use(express.urlencoded({extended:true}))

app.use(morgan('dev'));

//Connect to database
dbConnection();

//register user
app.use('/',userRouter);

export default app;
