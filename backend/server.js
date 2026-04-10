import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app=express();

connectDB();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Backend Running");
});

const PORT=3000;
app.listen(PORT, ()=>{
    console.log("Server running on port 3000");
})