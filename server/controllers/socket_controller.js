const socket = require('socket.io')

const SocketConnection = (server, app) => {
    const io = socket(server)
    io.on('connection', (socket) => {
        const db = app.get('db')
        console.log('a user has connected')
        socket.on('join room', async (userInfo) => {
            socket.join(userInfo.roomID)
            console.log(userInfo)
            const room = await db.check_room({room_id: userInfo.roomID})
            console.log(room)
            await db.create_au({user_id: userInfo.id, room_id: room[0].ar_id})
            const users = await db.get_au({room_id: room[0].ar_id})
            const data = await db.select_messages({room_id: userInfo.roomID})
            io.to(userInfo.roomID).emit('joined room', data, users)
        })
        socket.on('drawObj', (newObj, roomID) => {
            socket.to(roomID).emit('drawObj', newObj)
        })
        socket.on('deleteObj', (i, roomID) => {
            console.log('delete hit')
            socket.to(roomID).emit('deleteObj', i)
        })
        socket.on('moveToBack', (i, element, roomID) => {
            console.log('move hit')
            socket.to(roomID).emit('moveToBack',i, element)
        })
        socket.on('leave room', async (userInfo) => {
            socket.leave(userInfo.roomID)
        })
        socket.on('message send', async (userInfo) => {
            await db.create_message({message: userInfo.message, first_name: userInfo.firstName, last_name: userInfo.lastName, room_id: userInfo.roomID})
            const data = await db.select_messages({room_id: userInfo.roomID})
            io.to(userInfo.roomID).emit('message recieved', data)
        })
        socket.on('end room', async (userInfo) => {
            io.to(userInfo.roomID).emit('end room')
        })
        socket.on('disconnect', () => {
            console.log('a user has left')
        })
    })
}

module.exports = SocketConnection