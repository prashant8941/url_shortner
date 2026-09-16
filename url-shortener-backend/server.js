const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const rateLimiter = require('./middlewares/rateLimiter');
const { shortenUrl, redirectUrl } = require('./controllers/urlController');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/shorten', rateLimiter, shortenUrl);
app.get('/:code', redirectUrl);

const startServer = async () => {
    await connectDB();
    // Redis over HTTP connects automatically per request
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();