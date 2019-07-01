const socket = require('socket.io')

const SocketConnection = (server) => {
    const io = socket(server)
    io.on('connection', (socket) => {
        console.log('a user has connected')
        socket.on('join room', (roomID) => {
            socket.join(roomID)
        })
        socket.on('disconnect', () => {
            console.log('a user has left')
        })
    })
}