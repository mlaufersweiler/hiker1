
<h1>Hiker</h1>

React | Redux | Node | Express | Massive | PostgreSQL | Axios | Bcrypt | Node-Cron | Twilio | TwiML | Nodemailer | Moment.js
<br />

Hiker is a responsive trip planning tool & alert system to keep hikers safe in the backcountry. It allows hikers to browse resources, review a trip checklist, set up an alert that will check on them via text to see if they've returned on their expected end date. If the hiker doesn't respond within the hour, Hiker will text and email the hiker's designated contact with the full trip itinerary, along with directions on how to report a missing hiker.


- Frontend built in React with Redux
- Backend running on Node.js, using Express as a server and Massive to connect to PostgreSQL database
- Full CRUD / HTTP requests made with Axios
- User authentication using bcrypt
- Moment.js used to parse dates, times, and timezones on frontend and backend
- Styled with material-ui and Styled Components
- Node-cron queries the database every minute, comparing the current timestamp against each hiker's expected end date/time. When an end times expires, functions are fired off to check on the hiker, set an hour countdown, and if no action is taken within the hour, text and email the designated contact
- Twilio used to send texts from the server to hikers and designated contacts
- TwiML used to receive SMS texts from hikers to cancel their alert, extend it, or send an SOS alert to their designated contact immediately
- Email alerts sent to designated contacts via nodemailer

Website: http://hiker.world/#/

- Landing page:
![landing](https://user-images.githubusercontent.com/29295716/64964061-4bb71980-d868-11e9-9b29-34a872d51b49.png)

- Login/register modal:
![login](https://user-images.githubusercontent.com/29295716/64964108-6db09c00-d868-11e9-87e3-db54725082f6.png)

- Side menu toggle:
![Screen Shot 2019-09-16 at 9 09 48 AM](https://user-images.githubusercontent.com/29295716/64964157-81f49900-d868-11e9-972e-9b92f2bd4511.png)

- Setting an alert, trial information:
![Screen Shot 2019-09-16 at 9 11 03 AM](https://user-images.githubusercontent.com/29295716/64964282-b9634580-d868-11e9-9409-59f182df73eb.png)

- Setting an alert, trip/personal information:
![Screen Shot 2019-09-16 at 9 13 34 AM](https://user-images.githubusercontent.com/29295716/64964295-c2541700-d868-11e9-9d94-aedf31ef9f90.png)

- Setting an alert, designated contact information:
![Screen Shot 2019-09-16 at 10 03 01 AM](https://user-images.githubusercontent.com/29295716/64964504-31ca0680-d869-11e9-9aa0-386f4e8a3ed2.png)

- Alert overview:
![Screen Shot 2019-09-16 at 9 14 08 AM](https://user-images.githubusercontent.com/29295716/64964841-e6642800-d869-11e9-9b81-27c6a6783018.png)

- Initial message from Twilio at the time the hiker said they would be back by:
![IMG_1450](https://user-images.githubusercontent.com/29295716/64964857-f24fea00-d869-11e9-9705-df95e92b1823.PNG)

- Message to designated contact 1 hour after there is no response from the hiker:
![IMG_1451](https://user-images.githubusercontent.com/29295716/64965712-7fe00980-d86b-11e9-9f2a-4d411c2618da.PNG)

- Landing page with an active alert set, easy access to edit and delete alert:
![Screen Shot 2019-09-16 at 9 15 35 AM](https://user-images.githubusercontent.com/29295716/64964879-fbd95200-d869-11e9-8897-93cfdab30cf9.png)

- Resource section with information about being a designated contact, along with navigation and clothing sections with helpful videos:
![Screen Shot 2019-09-16 at 9 22 16 AM](https://user-images.githubusercontent.com/29295716/64964907-0562ba00-d86a-11e9-9577-7593ef24a89e.png)

- Trip checklist and gear list:
![Screen Shot 2019-09-16 at 9 21 59 AM](https://user-images.githubusercontent.com/29295716/64964927-0ac00480-d86a-11e9-8539-7c7a390d972f.png)




