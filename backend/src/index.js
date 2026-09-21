import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./routes/userRoutes.js";
import { propertyRouter } from "./routes/propertyRouter.js";
import { bookingRouter } from "./routes/bookingRouter.js";
import { tripRouter } from "./routes/tripRouter.js";

import connectDB from "./utlis/db.js";

import dns from "dns";
//changedns
dns.setServers(['1.1.1.1','8.8.8.8']);


dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.ORIGIN_ACCESS_URL,
  credentials: true
}))

//express.json
app.use(express.json({limit:"100mb"}))

//urlencoded
app.use(express.urlencoded({limit:"100mb",extended:true}))

//cookieParser
app.use(cookieParser())


const port = process.env.PORT;

//one test route
app.get("/",(req,res)=>{
    res.send("server is running")
})

app.use("/api/v1/user",router)
app.use("/api/v1/listing",propertyRouter)
app.use("/api/v1/user/booking",bookingRouter)
app.use("/api/v1/trip",tripRouter)

connectDB();

app.listen(port,()=>{
    console.log(`App is running on PORT number: ${port}`);

})

