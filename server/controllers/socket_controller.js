const socket = require('socket.io')

const SocketConnection = (server, app) => {
    const db = app.get('db')
    const io = socket(server)
    io.on('connection', (socket) => {
        console.log('a user has connected')
        socket.on('join room', async (userInfo) => {
            socket.join(userInfo.roomID)
            const users = await db.get_au({room_id: userInfo.roomID})
            const data = await db.select_messages({roomID: userInfo.roomID})
            io.to(userInfo.roomID).emit('joined room', data, users)
        })
        socket.on('leave room', async (userInfo) => {
            socket.leave(userInfo.roomID)
            await db.remove({user_id: userInfo.id})
            socket.disconnect()
        })
        socket.on('message send', async (userInfo) => {
            await db.create_message({message: userInfo.message, first_name: userInfo.firstName, last_name: userInfo.lastName, room_id: userInfo.roomID})
            const data = await db.select_messages({roomID: userInfo.roomID})
            io.to(userInfo.roomID).emit('message recieved', data)
        })
        socket.on('end room', async (userInfo) => {
            socket.leave(userInfo.roomID)
            await db.delete_room('userInfo')
            io.to(userInfo.roomID).emit('end room')
        })
        socket.on('disconnect', () => {
            console.log('a user has left')
        })
    })
}

module.exports = SocketConnection