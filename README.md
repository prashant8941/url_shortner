# 🚀 Distributed Full-Stack URL Shortener

A high-performance, scalable URL shortening service engineered as a full-stack monorepo. It implements advanced system design principles including **Base62 encoding**, **cache-aside patterns**, and **distributed rate limiting** to ensure low-latency performance and high reliability under load.

---

## 🌐 Live Demo

* **Frontend UI:** [https://url-shortener-frontend-o770.onrender.com/](https://url-shortener-frontend-o770.onrender.com/)
* **Backend API:** [https://url-shortener-api-05hx.onrender.com](https://url-shortener-api-05hx.onrender.com)

---

## 📌 Overview

Distributed Full-Stack URL Shortener is a web application designed to convert long URLs into concise, secure, and easily shareable short links. It uses atomic counters and Base62 encoding for compact ID mapping, combined with Upstash Redis for serverless cache-aside lookups and sliding-window rate limiting.

The project demonstrates full-stack monorepo architecture, distributed system caching, database modeling, REST API development, and cloud deployment using modern web technologies.

---

## ✨ Features

### ⚡ URL Generation & Encoding
* Compact Base62 String Conversion
* Dynamic Host Evaluation (`req.get('host')`) for production-ready short links
* Atomic Sequence Counter Integration
* Optional Link Expiration (TTL)

### 🚀 High-Performance Caching
* Cache-Aside Pattern via Upstash Redis
* Sub-Millisecond Redirect Latency
* Reduced Database Read Pressure

### 🛡️ Infrastructure Protection
* Distributed Sliding-Window Rate Limiting
* Abuse and Spam Mitigation
* Secure Request Handling

### 📊 Analytics & Tracking
* Asynchronous Click Count Tracking
* Redirection Metrics Management

---

## 🛠️ Tech Stack

### Frontend
* React.js
* Vite
* Axios
* CSS

### Backend
* Node.js
* Express.js
* Mongoose ODM

### Database & Caching
* MongoDB Atlas (Cloud NoSQL)
* Upstash Redis (Serverless In-Memory Store)

### Deployment & Hosting
* Render (Monorepo Architecture: Web Service & Static Site)

---

## 📂 Project Structure

```bash
url_shortner/
│
├── url-shortener-frontend/
│   │
│   ├── public/
│   │   └── favicon.svg
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── url-shortener-backend/
│   │
│   ├── config/
│   │   └── redis.js
│   │
│   ├── controllers/
│   │   └── urlController.js
│   │
│   ├── middlewares/
│   │   └── rateLimiter.js
│   │
│   ├── models/
│   │   ├── Counter.js
│   │   └── Url.js
│   │
│   ├── utils/
│   │   └── base62.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md

⚙️ Environment Variables

Create a .env file inside the url-shortener-backend folder.
Code snippet

PORT=5000
MONGO_URI=your_mongodb_connection_string
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token

🚀 Installation
Clone Repository
Bash

git clone [https://github.com/prashant8941/url_shortner.git](https://github.com/prashant8941/url_shortner.git)
cd url_shortner

Backend Setup
Bash

cd url-shortener-backend
npm install
npm run dev

Frontend Setup
Bash

cd url-shortener-frontend
npm install
npm run dev

📡 API Endpoints
URL Shortening & Redirects
HTTP

POST /api/shorten
GET /:code

🎯 Skills Demonstrated

    Full-Stack Monorepo Development

    System Design & Distributed Caching

    Cache-Aside Implementation

    Sliding-Window Rate Limiting

    Base62 Encoding Algorithms

    REST API Development

    MongoDB Sequence Counter Pattern

    Cloud Deployment & Hosting (Render)

    Error Handling & API Security

🔮 Future Enhancements

    User Authentication & Custom Short Links

    Detailed Analytics Dashboard (Clicks by Region/Browser)

    QR Code Generation for Short Links

    Custom Link Aliases

📚 Learning Outcomes

This project helped me gain hands-on experience with:

    Designing low-latency distributed web systems

    Integrating Redis cache-aside workflows with MongoDB

    Implementing secure server-side sliding-window rate limiters

    Structuring and deploying monorepo applications on Render

    Writing scalable, clean REST APIs in Node.js and Express

👨‍💻 Author

Prashant Sharma

 GitHub: https://github.com/prashant8941
Linkedin : https://www.linkedin.com/in/prashant-sharma-1b26062a6/
 

⭐ If you found this project useful, consider giving it a star.
