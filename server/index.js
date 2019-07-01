// Requirements

require('dotenv').config()
const express = require('express'),
        session = require('express-session'),
        massive = require('massive'),
        authCtrl = require('./controllers/auth_controller'),
        socketCtrl = require('./controllers/socket_controller')

const app = express()
const {CONNECTION_STRING, SERVER_PORT, SESSION_SECRET} = process.env

// Top Level Middleware

app.use(express.json())
app.use(
    session({
        secret: SESSION_SECRET,
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 1000 * 60 * 60
        }
    })
)

// Database Connection

massive(CONNECTION_STRING).then((database) => {
    app.set('db', database)
    console.log('database set!', database.listTables())
    app.listen(SERVER_PORT, () => console.log(`Port ${SERVER_PORT} is not screwed up`))
})

// Endpoints

