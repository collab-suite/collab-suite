const socket = require('socket.io')

const SocketConnection = (server, app) => {
    const db = app.get('db')
    const io = socket(server)
    io.on('connection', (socket) => {
        console.log('a user has connected')
        socket.on('join room', async (userInfo) => {
            socket.join(userInfo.roomID)
            const data = await db.select_messages({roomID: userInfo.roomID})
            io.to(userInfo.roomID).emit('joined room', data, userInfo)
        })
        socket.on('leave room', (roomID) => {
            socket.leave(roomID)
            socket.disconnect()
        })
        socket.on('message send', async (userInfo) => {
            await db.create_message({message: userInfo.message, first_name: userInfo.firstName, last_name: userInfo.lastName, room_id: userInfo.roomID})
            const data = await db.select_messages({roomID: userInfo.roomID})
            io.to(userInfo.roomID).emit('message recieved', data)
        })
        socket.on('end room', (userInfo) => {
            socket.leave(userInfo.roomID)
            io.to(userInfo.roomID).emit('end room')
        })
        socket.on('disconnect', () => {
            console.log('a user has left')
        })
    })
}

module.exports = SocketConnection