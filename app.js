const express = require('express');
const app     = express();
const http    = require('http').createServer(app);
const socket  = require('socket.io')(http);

app.use(express.static('node_modules/jquery/dist'));
app.use('/fa', express.static('node_modules/@fortawesome/fontawesome-free'));
app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

socket.on('connection', (conn) => {
    let rand  = Math.random();
    let name  = rand.toString(36).substring(8);
    let color = 'hsl(' + (rand * 360) + ', 50%, 50%)';

    console.log(name + ' connected');

    conn.on('message', (msg) => socket.emit('message', {
        color: color,
        text: msg
    }));

    conn.on('disconnect', () => console.log(name + ' disconnected'));
});

http.listen(3000, () => console.log('listening on *:3000'));
