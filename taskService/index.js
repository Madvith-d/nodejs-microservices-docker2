import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import TaskModel from "./models/taskModel.js";
dotenv.config();


const app = express();

app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

app.post('/tasks', async (req,res)=>{
    const {title,description,status,userId} = req.body;
    if(!title || !description || !status || !userId){
        return res.status(400).json({message:"All fields are required"})
    }
    const task = new TaskModel({title,description,status,userId})
    try {
        await task.save()
        return res.status(201).json({message:"Task created successfully",task})
    } catch (error) {
        return res.status(500).json({message:"Internal server error" , error:error.message})
    }
})

app.get('/tasks', async (req,res)=>{
    try {
        const tasks = await TaskModel.find()
        return res.status(200).json({message:"Tasks fetched successfully",tasks})
    } catch (error) {
        return res.status(500).json({message:"Internal server error" , error:error.message})
    }
})




app.listen(PORT,()=>{
    console.log("Task Service running on port", PORT)
})