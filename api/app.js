const express = require('express');
const socket = require('socket.io');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 3000

app.use(cors({ origin: '*' }));

app.get('/test', (req, res) => {
    res.json({
        message: 'Hello'
    })
})

const server = app.listen(port, () => {
    console.log(`server is running on : ${port}`)
})

let io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

io.on('connection', (socket) => {

    socket.on('join_room', (data) => {
        socket.join(data)
    })

    // { room:'', name:'', message:''}

    socket.on('send_message', (data) => {
        socket.to(data.room).emit('receave_message', data)
    })

    socket.on('disconnet', () => {
        console.log('user Disconnect')
    })
})