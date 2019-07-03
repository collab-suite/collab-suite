const bcrypt = require('bcryptjs')

module.exports = {

    register: async (req, res) => {
        const {
            first_name,
            last_name,
            email,
            password
        } = req.body
        console.log(`first_name is ${first_name}`)
        console.log(`last_name is ${last_name}`)
        console.log(`email is ${email}`)
        console.log(`password is ${password}`)
        // const db = req.app.get('db')
        // const {session} = req
        // const userFound = await db.check_user({email})
        // if (userFound[0]) return res.status(409).send('User already exists')
        // const salt = bcrypt.genSaltSync(10)
        // const hash = bcrypt.hashSync(password, salt)
        // const createdUser = await db.register_user({
        //     first_name,
        //     last_name,
        //     email,
        //     password: hash
        // })
        // session.user = {
        //     id: createdUser[0].user_id,
        //     firstName: createdUser[0].first_name,
        //     lastName: createdUser[0].last_name,
        //     email: createdUser[0].email
        // }
        // res.status(200).send(session.user)
        res.status(200).send('registered')
    },

    login: async (req, res) => {
        const db = req.app.get('db')
        const {session} = req
        const {email, password} = req.body
        const userFound = await db.check_user({email})
        if(!userFound[0]) return res.status(404).send(`User does not exist`)
        const authenticated = bcrypt.compareSync(password, userFound[0].password)
        if (authenticated) {
            session.user = {
                id: userFound[0].user_id,
                email: userFound[0].email,
                firstName: userFound[0].first_name,
                lastName: userFound[0].last_name
            }
            res.status(200).send(session.user)
        } else {
            res.status(401).send(`Incorrect email or password`)
        }
    },

    getUser: (req, res) => {
        if(req.session.user) return res.status(200).send(req.session.user)
    },

    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    }
}