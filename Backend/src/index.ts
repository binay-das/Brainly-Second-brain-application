import express from 'express';
const app = express();
import { connect } from './db';
import { Content, Link, User } from './db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userMiddleware } from './middleware';
import { randomString } from './utils';
import cors from 'cors';
import { JWT_SECRET, PORT } from './config';
import dotenv from 'dotenv';
dotenv.config();


connect();

app.use(express.json());
app.use(cors());
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
        const token = jwt.sign({
            id: user._id
        },
            JWT_SECRET as string,
            {
                expiresIn: '1h'
            });

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

app.post('/api/v1/content', userMiddleware, async (req, res) => {
    try {
        const { title, link, type } = req.body;
        await Content.create({
            title,
            link,
            type,
            userId: req.userId,
            tags: []
        });

        res.status(201).json({ message: 'Content created' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/api/v1/content', userMiddleware, async (req, res) => {
    const userId = req.userId;
    try {
        const content = await Content.find({
            userId
        }).populate('userId', 'username');

        res.json(content);
        return;

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
        return;
    }
});

app.delete('/api/v1/content', userMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const contentId = req.body.contentId;

        await Content.deleteMany({
            userId,
            _id: contentId
        });

        res.status(200).json({ message: "Content deleted successfully" });
        return;

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


app.put('/api/v1/content', userMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const contentId = req.body.contentId;
        const tags = req.body.tags;

        await Content.updateOne({
            userId,
            contentId
        }, {
            tags
        });

        res.json({ message: 'Content updated' });
        return;

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
        return;
    }
});

app.post('/api/v1/brain/share', userMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const share = req.body.share;
        if (share) {
            const existingLink = await Link.findOne({
                userId
            });
            if (existingLink) {
                res.status(200).json({
                    message: 'Link already shared',
                    link: existingLink.hash
                });
                return;
            }

            const link = await Link.create({
                userId,
                hash: randomString(10)
            });

            res.status(200).json({
                message: 'Link shared',
                link: link.hash
            });
            return;


        } else {
            await Link.deleteOne({
                userId
            });
        }
        res.status(200).json({ message: 'Link shared' });
        return;

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
        return;
    }
});

app.get('/api/v1/brain/:link', userMiddleware, async (req, res) => {
    try {
        const link = req.params.link;
        const brain = await Link.findOne({
            hash: link
        });

        if (!brain) {
            res.status(411).json({ message: 'Brain not found' });
            return;
        }

        const content = await Content.find({
            userId: brain.userId
        })

        const user = await User.findOne({
            _id: brain.userId
        });

        res.status(200).json({
            username: user?.username,
            content
        });

        return;

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
        return;
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});