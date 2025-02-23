import mongoose from "mongoose";
import { DB_URL } from "./config";

const db_url = DB_URL;

export const connect = async (): Promise<void> => {
    if (!db_url) {
        console.error("No database URL found");
        process.exit(1);
    }
    try {
        await mongoose.connect(db_url);
        console.log("Connected to MongoDB from db.ts");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1);
    }
};



const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    firstName: {
        type: String,
        maxLength: 30,
        required: true
    },
    lastName: {
        type: String,
        maxLength: 30
    }
});

const ContentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    type: {
        type: String,
        enum: ["youtube", "twitter", "document", "link", "others"],
        required: true
    },
    link: {
        type: String
    },
    tags: [{
        type: mongoose.Types.ObjectId,
        ref: 'Tag'
    }],
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const LinkSchema = new mongoose.Schema({
    hash: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    }
});

export const User = mongoose.model("User", UserSchema);
export const Content = mongoose.model("Content", ContentSchema);
export const Link = mongoose.model("Link", LinkSchema);