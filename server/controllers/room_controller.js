const uuid = require('uuid/v1')

module.exports = {
    createRoom: async (req, res) => {
        const roomID = uuid()
        const db = req.app.get('db')
        await db.create_room({room_id: roomID})
        res.status(201).send(roomID)
    },
    joinRoom: async (req, res) => {
        const {roomID, userID} = req.body
        const db = req.app.get('db')
        const result = await db.check_room({room_id: roomID})
        if (result[0]) {
            await db.create_au({user_id: userID, room_id: roomID})
            res.sendStatus(200)
        } else {
            res.status(404).send('Room not found')
        }
    },
    getActiveUsers: async (req, res) => {

    }
}