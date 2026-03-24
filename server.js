const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
app.use(express.static('public'));

const redis = require('redis');
const client = redis.createClient({
    url: 'redis://localhost:6379'
});

client.connect().then(() => {
    console.log('Connected to Redis');
})

app.get('/', (req, res) => {
    res.send('Server is running');
});

//Websocket connection

io.on('connection', async (socket) => {
    console.log('User connected');

    const keys = await  client.keys('msg:*');
    for (const key of keys) {
        const msg = await client.get(key);
        socket.emit('message', msg);
    }

    socket.on('message', async(msg) => {
        // Store message in Redis with an expiration of 1 day
        const key = `msg:${Date.now()}`;
        await client.set(key, msg, { EX: 86400 });
        io.emit('message', msg);
    });
});

// File upload handling
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
  res.send({ file: req.file.filename });
});

http.listen(3000, () => console.log('Server is running on port 3000'));

