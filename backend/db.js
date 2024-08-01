import mongoose from 'mongoose'
const dotenv = require("dotenv").config();

export const connectDB = async() =>{
    await mongoose.connect(process.env.MONGO_URI)
}
