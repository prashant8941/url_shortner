const redisClient = require('../config/redis');

const rateLimiter = async (req, res, next) => {
    const ip = req.ip;
    const windowSizeInSeconds = 60;
    const maxRequests = 10; 
    const now = Date.now();
    const windowStart = now - windowSizeInSeconds * 1000;

    try {
        const key = `rate_limit:${ip}`;
        
        const pipeline = redisClient.pipeline();
        pipeline.zremrangebyscore(key, 0, windowStart);
        pipeline.zcard(key);
        pipeline.zadd(key, { score: now, member: `${now}-${Math.random()}` });
        pipeline.expire(key, windowSizeInSeconds);

        const results = await pipeline.exec();
        const requestCount = results[1]; // The result of zcard

        if (requestCount >= maxRequests) {
            return res.status(429).json({ error: "Too many requests. Please try again later." });
        }
        next();
    } catch (err) {
        console.error('Rate Limiter Error:', err);
        next(); 
    }
};

module.exports = rateLimiter;