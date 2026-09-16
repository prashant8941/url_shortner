const Url = require('../models/Url');
const Counter = require('../models/Counter');
const { encode } = require('../utils/base62');
const redisClient = require('../config/redis');

const shortenUrl = async (req, res) => {
    const { originalUrl, ttlInHours } = req.body;
    if (!originalUrl) return res.status(400).json({ error: 'URL is required' });

    try {
        const counter = await Counter.findByIdAndUpdate(
            { _id: 'url_id' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );

        const shortCode = encode(counter.seq);
        const expiresAt = ttlInHours ? new Date(Date.now() + ttlInHours * 60 * 60 * 1000) : null;

        const url = new Url({ originalUrl, shortCode, expiresAt });
        await url.save();

        res.status(201).json({ shortUrl: `http://localhost:5000/${shortCode}`, shortCode });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

const redirectUrl = async (req, res) => {
    const { code } = req.params;

    try {
        const cachedUrl = await redisClient.get(`url:${code}`);
        if (cachedUrl) {
            Url.updateOne({ shortCode: code }, { $inc: { clicks: 1 } }).exec();
            return res.redirect(cachedUrl);
        }

        const url = await Url.findOne({ shortCode: code });
        if (!url) return res.status(404).json({ error: 'URL not found' });

        if (url.expiresAt && url.expiresAt < new Date()) {
            return res.status(410).json({ error: 'URL expired' });
        }

        await redisClient.set(`url:${code}`, url.originalUrl, { ex: 3600 }); 

        url.clicks++;
        await url.save();

        res.redirect(url.originalUrl);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { shortenUrl, redirectUrl };