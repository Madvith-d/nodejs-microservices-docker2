import express from "express";
import bodyParser from "body-parser";
import connectDb from "./db/connectDb.js";
import UserModel from "./models/UserModel.js";
const PORT = 3000;
const app  = express();

connectDb();

app.use(bodyParser.json());

app.post('/users', async (req, res) => {
    const {name,email}= req.body;
    if(!name || !email){
        return res.status(400).json({message:"Name and email are required"});
    }
    try {
        const user = new UserModel({name,email});
        await user.save();
        return res.status(201).json({message:"User created successfully",user});
    
    } catch (error) {
        return res.status(500).json({message:"Internal server error" , error:error.message});
    }
   
    
});

app.get('/users', async (req, res) => {
    try {
        const users = await UserModel.find();
        return res.status(200).json({message:"Users fetched successfully",users});
    } catch (error) {
        return res.status(500).json({message:"Internal server error" , error:error.message});
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
