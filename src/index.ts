import express from 'express';
import mongoose from 'mongoose';
import { User } from './db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

const db_url = process.env.DB_URL;
const connect = async (): Promise<void> => {
    if (db_url) {
        await mongoose.connect(db_url);
        console.log("Connected to MongoDB");
    } else {
        console.error("No database URL found");
    }
}
connect();

app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/api/v1/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({
            username
        });

        if (existingUser) {
            res.status(409).json({ message: 'Username already exists' });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            username,
            password: hashedPassword
        });
        res.status(201).json({ message: 'User created' });
        return;

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
        return;
    }
});

app.post('/api/v1/signin', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({
            username
        });

        if (!user) {
            res.status(409).json({ message: 'User not found' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        const token = jwt.sign({ username }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

        res.json({
            message: 'Logged in successfully',
            token
        });
        return;

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
        return;
    }
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});