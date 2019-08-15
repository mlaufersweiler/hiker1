require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');

const authController = require('./controllers/authController');

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

const app = express();

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(express.json());

//connect server to build folder 
massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('database connected [:')
})

app.post(`/auth/register`, authController.register)
app.post(`/auth/login`, authController.login)
app.get(`/auth/user-data`, authController.getUserData)
app.get(`/auth/logout`, authController.logout)

app.listen(SERVER_PORT, () => {
    console.log(`Port ${SERVER_PORT} is open for business.`)
})