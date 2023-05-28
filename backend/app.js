require('dotenv').config();
require('express-async-errors');
const path = require('path');
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


app.use('/assets', express.static('./public/uploads'));
app.use('/api/auth', authRouter);
app.use('/api/images', authenticateUser, imageRouter);
app.use(express.static('../frontend/dist'));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../frontend/dist/', 'index.html'));
});

// routes

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
