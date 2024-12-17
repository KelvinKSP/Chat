const express = require('express');
const http = require('http');
const fs = require('fs');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: '*', 
        methods: ['GET', 'POST']
    }
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

let users = {};

app.get('/messages', (req, res) => {
    fs.readFile('messages.json', (err, data) => {
        if (err) {
            return res.status(500).send('Erro ao ler mensagens');
        }
        res.send(JSON.parse(data));
    });
});


io.on('connection', (socket) => {
    console.log('Um usuário se conectou');

    socket.on('register user', (username) => {
        users[socket.id] = username;
        console.log(`${username} se conectou`);
    })

    socket.on('chat message', (msg) => {

        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0'); 
        const minutes = now.getMinutes().toString().padStart(2, '0');

        const messageData = {
            id: socket.id, // ID
            user: users[socket.id],
            message: msg,
            time: `${hours}:${minutes}`
        };

        fs.readFile('messages.json', (err, data) => {
            const messages = err ? [] : JSON.parse(data);
            messages.push(messageData);
            fs.writeFile('message.json', JSON.stringify(messages), (err) => {
                if (err) console.error(err);
            });
        });
        io.emit('chat message', messageData);
    });

    socket.on('typing', () => {
        socket.broadcast.emit('typing', { user: users[socket.id] });
    })

    socket.on('stop typing', () => { 
        socket.broadcast.emit('stop typing', { user: users[socket.id] });
    })

    socket.on('disconnect', () => {
        console.log(`${users[socket.id]} desconectou`)
        delete users[socket.id];
    });
});


const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Servidor rodandno na porta ${PORT}`);
});


