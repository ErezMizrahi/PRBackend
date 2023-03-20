import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const createConnectionPool = async () => {
    const MONGODB_URI = process.env.MONGODB_URI;
    try {
        return await mongoose.connect(MONGODB_URI);
    }
    catch (e) {
        console.error(e);
    }
};
const connection = createConnectionPool();
export default connection;
//# sourceMappingURL=connection.js.map