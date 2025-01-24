import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const db_url = process.env.DB_URL;
const connect = async (): Promise<void> => {
    if (db_url) { 
        await mongoose.connect(db_url);
        console.log("Connected to MongoDB"); 
    } else {
        console.error("No database URL found");
    }
}


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

export const User = mongoose.model("User", UserSchema);