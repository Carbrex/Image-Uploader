require('dotenv').config();
require('express-async-errors');

const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/auth.js');
const imageRouter = require('./routes/images.js');
const connectDB = require('./db/connect.js');
const authenticateUser = require('./middleware/authentication');

const app = express();
app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// routes
app.use('/assets', express.static('./public/uploads'));
app.use('/api/auth', authRouter);
app.use('/api/images', authenticateUser, imageRouter);

const port = process.env.PORT || 8080;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
