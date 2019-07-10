const uuid = require('uuid/v1')

module.exports = {
    createRoom: async (req, res) => {
        const roomID = uuid()
        const db = req.app.get('db')
        const room = await db.create_room({room_id: roomID})
        res.status(201).send(roomID)
    },
    joinRoom: async (req, res) => {
        const {roomID, userID} = req.body
        const db = req.app.get('db')
        const result = await db.check_room({room_id: roomID})
        console.log(result)
        if (result[0]) {
            await db.create_au({user_id: userID, room_id: result[0].ar_id})
            res.sendStatus(200)
        } else {
            res.status(404).send('Room not found')
        }
    },
    endRoom: async (req, res) => {
        const db = req.app.get('db')
        const {roomID} = req.query
        const room = await db.check_room({room_id: roomID})
        await db.remove_ar({ar_id: room[0].ar_id, room_id: roomID})
        res.sendStatus(200)
    },
    leaveRoom: async (req, res) => {
        const db = req.app.get('db')
        const {email} = req.query
        const user = await db.check_user({email})
        await db.remove_au({user_id: user[0].user_id})
        res.sendStatus(200)
    }
}