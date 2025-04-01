import mongoose from "mongoose";
import colors from 'colors'

const connectDB = async()=>{
    try {
       const conn = await mongoose.connect(process.env.MONGODB_URL,{connectTimeoutMS: 30000 });
       console.log(`Connected to Mongodb ${conn.connection.host}`.bgMagenta.white);
    } catch (error) {
        console.log(`Error in Mongodb ${error}`.bgRed)
    }
};

export default connectDB;