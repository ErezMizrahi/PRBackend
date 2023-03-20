import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const createConnection = async () => {
    const MONGODB_URI = process.env.MONGODB_URI!;
    console.log(MONGODB_URI);

    try {
        const db = await mongoose.connect(MONGODB_URI);
        console.log('connecting tomongodb ', MONGODB_URI);
        return db;
    } catch (e) {
        console.error(e);
    }
}


export default createConnection;