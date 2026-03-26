const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
app.use(express.static('public'));
const xss = require('xss');

const redis = require('redis');
const client = redis.createClient({
    url: 'redis://localhost:6379'
});

// Socket Error event handling
client.on('error', (err) => {
    console.error('Redis Client Error:', err.message);
    io.emit('ConnectionError', 'Redis connection error');
});

client.connect()
    .then(() => console.log('Connected to Redis'))
    .catch(err => {
        console.error('Redis connection failed:',err.message);
    });

// Room code Generation
function generateRoomCode(length = 4) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code ="";
    for (let i = 0; i < length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

//Websocket connection

io.on('connection', async (socket) => {
    console.log('User connected');
    try {
        const keys = await client.keys('msg:*');
        for (const key of keys) {
            const msg = await client.get(key);
            socket.emit('message',msg);
        }
    } catch (err) {
        console.error('Redis read failed:', err.message);
        socket.emit('ConnectionError', 'Failed to load messages');
    }

    socket.on('message', async(msg) => {
        // Store message in Redis with an expiration of 1 day
        const safeMsg = xss(msg);

        try {
            const key = `msg:${Date.now()}`;
            await client.set(key, safeMsg, { EX: 86400 });
            io.emit('message', safeMsg);
        } catch (err) {
            console.error("Redis set failed:", err.message);
            socket.emit('ConnectionError', 'Failed to send message');
        }
    });
});

// File upload handling
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
  res.send({ file: req.file.filename });
});

http.listen(3000, () => console.log('Server is running on port 3000'));

