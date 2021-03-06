require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
var cron = require('node-cron');
var twilio = require('twilio');
const bodyParser = require('body-parser')
var moment = require('moment-timezone');
const nodemailer = require('nodemailer')

const authController = require('./controllers/authController');
const alertController = require('./controllers/alertController');
const smsController = require('./controllers/smsController')

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, ACCOUNT_SID, AUTH_TOKEN, TWILIO_NUMBER, GMAIL_USER, GMAIL_PASS } = process.env;

var client = new twilio(ACCOUNT_SID, AUTH_TOKEN);


const app = express();

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))



app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

//connect server to build folder 
massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('database connected [:')
})



app.use( express.static( `${__dirname}/../build` ) );


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
app.post('/sms', smsController.recieveSMS)

cron.schedule(`* * * * *`, async () => {
    let db = app.get('db');
    let expiredAlerts = await db.select_expired_alerts();
    expiredAlerts.forEach(alert => {
        let { first_name, user_phone_number, alert_contact_name, alert_id } = alert
        client.messages.create({
            body: `Hey, ${first_name}! Have you returned from your trip? If you have please respond with to this text with "BACK".  If we do not hear from you after 30 minutes, we'll send all your trip information over to your designated contact, ${alert_contact_name}. --Hiker Alert App`,
            to: `+${user_phone_number}`,
            from: TWILIO_NUMBER
        })
            .then(() => {
                db.update_alert_text_running(['false', alert_id]);
                db.start_hour_countdown([alert_id]);
            })
            .catch(error => {
                console.error('Something went wrong with the promise code:');
                console.error(error.message);
            });
    })
    let noResponseAlerts = await db.select_no_response_alerts()
    noResponseAlerts.forEach(alert => {
        let {alert_id,
            trail_name,
            trail_type,
            trail_group,
            vehicle,
            starting_trailhead,
            ending_trailhead,
            roundtrip_distance,
            nearest_town,
            state,
            country,
            trip_description,
            trip_start,
            trip_end,
            first_name,
            last_name,
            age,
            user_phone_number,
            gender,
            height,
            weight,
            hair_color,
            clothing_description,
            medications,
            medical_issues,
            alert_contact_name,
            user_contact_relationship,
            alert_contact_number,
            alert_contact_email} = alert
        //send message to designated contact
        client.messages.create({
            body: `Hello, ${alert_contact_name}! Your ${user_contact_relationship}, ${first_name} ${last_name} went on a hiking/backpacking trip and listed you as their emergency contact. ${first_name} was supposed to return by today, ${moment(trip_end, "YYYY-MM-DDTHH:mm:ss.SS").format("MMM Do")} at ${moment(trip_end, "YYYY-MM-DDTHH:mm:ss.SS").format("h:mma")}. We've emailed their trip itinerary and personal information to you at ${alert_contact_email}. If you can't get ahold of them yourself and are concerned for their safety, we recommend passing on this information to the ${state} state police to initiate a search and rescue effort. --Hiker Alert App`,
            to: `+${alert_contact_number}`,
            from: TWILIO_NUMBER
        })
            .then(() => {
                //initialize and run nodemailer, send email to designated contact
                nodemailer.createTestAccount(() => {
                    // create reusable transporter object using the default SMTP transport
                    let transporter = nodemailer.createTransport({
                        service: 'Gmail',
                        auth: {
                            user: GMAIL_USER,
                            pass: GMAIL_PASS
                        }
                    });
                    // setup email data with unicode symbols
                    let mailOptions = {
                        from: '"Hiker Alerts" <alertshiker@gmail.com>',
                        to: `${alert_contact_email}`,
                        subject: `Alert for hiker ${first_name} ${last_name}`,
                        html: `<header><p>Hello ${alert_contact_name},<p>
                                <p>Your ${user_contact_relationship}, ${first_name} ${last_name} went on a hiking/backpacking trip and listed you as their emergency contact. ${first_name} was supposed to return today, ${moment(trip_end, "YYYY-MM-DDTHH:mm:ss.SS").format("MMM Do")} at ${moment(trip_end, "YYYY-MM-DDTHH:mm:ss.SS").format("h:mma")}. Their detailed trip itinerary and personal information is below. If you can't get ahold of them yourself and are concerned for their safety, we recommend passing on this information to the ${state} state police to initiate a search and rescue effort.
                                <br></br>
                                </header>
                                <h4>${first_name}'s Trip Itinerary:</h4>
                                <body>
                                <div>
                                <p>Trail Name: ${trail_name}</p>
                                <p>Trail Type: ${trail_type}</p>
                                <p>Trail Group: ${trail_group}</p>
                                <p>Vehicle at Trailhead: ${vehicle}</p>
                                <p>Starting Trailhead: ${starting_trailhead}</p>
                                <p>Ending Trailhead: ${ending_trailhead}</p>
                                <p>Roundtrip Distance: ${roundtrip_distance}</p>
                                <p>Nearest town (to starting trailhead): ${nearest_town}</p>
                                <p>State: ${state}</p>
                                <p>Country: ${country}</p>
                                <p>Trip Description: ${trip_description}</p>
                                <p>Trip Start: ${moment(trip_start, "YYYY-MM-DDTHH:mm:ss.SS").format("dddd, MMMM Do YYYY, h:mma")}</p>
                                <p>Anticipated Trip End: ${moment(trip_end, "YYYY-MM-DDTHH:mm:ss.SS").format("dddd, MMMM Do YYYY, h:mma")}</p>
                                </div>
                                <br></br>
                                <h4>${first_name}'s Personal Information:</h4>
                                <div>
                                <p>First Name: ${first_name}</p>
                                <p>Last Name: ${last_name}</p>
                                <p>Age: ${age}</p>
                                <p>Phone Number: ${user_phone_number}</p>
                                <p>Gender: ${gender}</p>
                                <p>Height: ${height}</p>
                                <p>Weight: ${weight}</p>
                                <p>Hair Color: ${hair_color}</p>
                                <p>Clothing Description: ${clothing_description}</p>
                                <p>Current Medications: ${medications}</p>
                                <p>Medical Issues: ${medical_issues}</p>
                                </div>
                                <br></br>
                                <div>
                                <h3>Sent from Backpact Trail Alert App</h3>
                                <p>Please do not respond to this email.</p>
                                </div>
                                </body>`
                    };

                    // send mail with defined transport object
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        } else {
                        console.log('Message sent: %s', info.messageId);
                        //once alert text and email have been sent successfully, delete alert from db
                        db.delete_alert_by_id([alert_id]);
                    }});
                });
            })
            .catch(error => {
                console.error('Something went wrong with the promise code:');
                console.error(error.message);
            });
    })
    let sosAlerts = await db.select_sos_alerts();
    sosAlerts.forEach(alert => {
        let {alert_id,
            trail_name,
            trail_type,
            trail_group,
            vehicle,
            starting_trailhead,
            ending_trailhead,
            roundtrip_distance,
            nearest_town,
            state,
            country,
            trip_description,
            trip_start,
            trip_end,
            first_name,
            last_name,
            age,
            user_phone_number,
            gender,
            height,
            weight,
            hair_color,
            clothing_description,
            medications,
            medical_issues,
            alert_contact_name,
            user_contact_relationship,
            alert_contact_number,
            alert_contact_email} = alert
        //send message to designated contact
        client.messages.create({
            body: `Hello, ${alert_contact_name}. Your ${user_contact_relationship}, ${first_name} ${last_name} went on a hiking/backpacking trip and listed you as their emergency contact. ${first_name} sent a SOS call for help through our app - something has gone wrong and they're in trouble. We've emailed their trip itinerary and personal information to you at ${alert_contact_email}. Please pass this information on to the ${state} state police ASAP to initiate a search and rescue effort. --Hiker Alert App`,
            to: `+${alert_contact_number}`,
            from: TWILIO_NUMBER
        })
            .then(() => {
                //initialize and run nodemailer, send email to designated contact
                nodemailer.createTestAccount(() => {
                    // create reusable transporter object using the default SMTP transport
                    let transporter = nodemailer.createTransport({
                        service: 'Gmail',
                        auth: {
                            user: GMAIL_USER,
                            pass: GMAIL_PASS
                        }
                    });
                    // setup email data with unicode symbols
                    let mailOptions = {
                        from: '"Hiker Alerts" <alertshiker@gmail.com>',
                        to: alert_contact_email,
                        subject: `URGENT: SOS alert for hiker ${first_name} ${last_name}`,
                        html: `<header><p>Hello ${alert_contact_name},<p>
                                <p>Your ${user_contact_relationship}, ${first_name} ${last_name} went on a hiking/backpacking trip and listed you as their emergency contact. ${first_name} sent a SOS call for help through our app - something has gone wrong and they're in trouble. Their detailed trip itinerary and personal information is below. Please pass this information on to the ${state} state police ASAP to initiate a search and rescue effort.
                                <br></br>
                                </header>
                                <h4>${first_name}'s Trip Itinerary:</h4>
                                <body>
                                <div>
                                <p>Trail Name: ${trail_name}</p>
                                <p>Trail Type: ${trail_type}</p>
                                <p>Trail Group: ${trail_group}</p>
                                <p>Vehicle at Trailhead: ${vehicle}</p>
                                <p>Starting Trailhead: ${starting_trailhead}</p>
                                <p>Ending Trailhead: ${ending_trailhead}</p>
                                <p>Roundtrip Distance: ${roundtrip_distance}</p>
                                <p>Nearest town (to starting trailhead): ${nearest_town}</p>
                                <p>State: ${state}</p>
                                <p>Country: ${country}</p>
                                <p>Trip Description: ${trip_description}</p>
                                <p>Trip Start: ${moment(trip_start, "YYYY-MM-DDTHH:mm:ss.SS").format("dddd, MMMM Do YYYY, h:mma Z")}</p>
                                <p>Anticipated Trip End: ${moment(trip_end, "YYYY-MM-DDTHH:mm:ss.SS").format("dddd, MMMM Do YYYY, h:mma Z")}</p>
                                </div>
                                <br></br>
                                <h4>${first_name}'s Personal Information:</h4>
                                <div>
                                <p>First Name: ${first_name}</p>
                                <p>Last Name: ${last_name}</p>
                                <p>Age: ${age}</p>
                                <p>Phone Number: ${user_phone_number}</p>
                                <p>Gender: ${gender}</p>
                                <p>Height: ${height}</p>
                                <p>Weight: ${weight}</p>
                                <p>Hair Color: ${hair_color}</p>
                                <p>Clothing Description: ${clothing_description}</p>
                                <p>Current Medications: ${medications}</p>
                                <p>Medical Issues: ${medical_issues}</p>
                                </div>
                                <br></br>
                                <div>
                                <h3>Sent from Backpact Trail Alert App</h3>
                                <p>Please do not respond to this email.</p>
                                </div>
                                </body>`
                    };

                    // send mail with defined transport object
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        } else {
                        console.log('Message sent: %s', info.messageId);
                        //once alert text and email have been sent successfully, delete alert from db
                        db.delete_alert_by_id([alert_id]);
                    }});
                });
            })
            .catch(error => {
                console.error('Something went wrong with the promise code:');
                console.error(error.message);
            });
    })
})


app.listen(SERVER_PORT, () => {
    console.log(`Port ${SERVER_PORT} is open for business.`)
})
// http.createServer(app).listen(SERVER_PORT, () => {
//     console.log(`Express server listening on port: 4000`);
//   });