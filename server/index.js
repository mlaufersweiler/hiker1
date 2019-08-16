require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');

const authController = require('./controllers/authController');
const alertController = require('./controllers/alertController');


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

//auth endpoints
app.post(`/auth/register`, authController.register)
app.post(`/auth/login`, authController.login)
app.get(`/auth/user-data`, authController.getUserData)
app.get(`/auth/logout`, authController.logout)

//alert endpoints
app.post(`/api/createalert`, alertController.createAlert);
app.get(`/api/alert-data/:id`, alertController.getAlertData);
app.put(`/api/editalert`, alertController.editAlert);
app.delete(`/api/deletealert/:id`, alertController.deleteAlert);

//sms endpoints
app.post('/sms',)

app.listen(SERVER_PORT, () => {
    console.log(`Port ${SERVER_PORT} is open for business.`)
})