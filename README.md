# Krewesic
## purpose
A social media app that allows you to find like-minded music lovers to attend concerts with as well as discover new artists.  The application also allows local artists to post upcoming events, and host  live streams on the platform in order to expand their artistic reach.
## features
-a profile setup allowing users to interact with the platform as either a listener or artist
-a home page displaying artist of the day to bring attention to a variety of artists
-a map to display events in a local area for a range of dates
-a way to find other users who are interested in attending those events and easily provide a networking environment to connect
-a messaging service to communicate with other users
-a personal profile component in which users can post music related info relating to their personality for other users to discover
## tech stack
-NodeJS and Express for server side
-React for front end
-MaterialUI for styling and component structure
-Postgres for the database
-Sequelize for ORM
-axios for making api requests
-SeatGeek API for concert information
-AudioDB API for artist information
-Google OAuth2 and passport for authentication
-Google Maps and Places API for google maps and places
# setup
This app was developed using node v14.17.5 and postgres 12.7
1. Clone down repo , change into the root directory for the project, and run npm install
2. Make sure postgres is installed on your computer.  Open postgres shell and create a database 'krewesic',  (CREATE DATABASE krewesic)
3. To use the database use \dt krewesic (on windows: \c krewesic)
4. Set up db.config -- see db.config below
5. Run npm run dev or npm run build to compile the webpack, depending if you are working in production or development mode
6. Set up environmental variables.  see the env section below for format
7. The Google_CLIENT_ID and GOOGLE_CLIENT_SECRET are the keys from OAuth 2 (https://console.cloud.google.com/apis/dashboard
).  SEATGEEK_CLIENT_ID and SEATGEEK_SECRET come from the seatgeek platform. (https://seatgeek.com/account/develop)
8. For the google maps api key, see instructions below in google maps api key
9. after all this set up, run npm start from the root directory and the app should be running from the designated PORT.
## env
  root directory, create .env  file
   here put google clientID and clientSecret that you get for oauth2
 also you need session secret
 should be in this format:
  NODE_ENV=<development or production>
  PORT=<choose your port>
  GOOGLE_CLIENT_SECRET=yourgoogleclientsecrethere
  GOOGLE_CLIENT_ID=yourgoogleclientid
  SESSION_SECRET='whateversecretwordyouwantforsessions'
  SEATGEEK_CLIENT_ID='your seat geek client id here'
  SEATGEEK_SECRET='your seatgeek secret here"
## db config
this app is designed to work with postgres
in db folder create a file called db.config.js.  you want your db configuration here:
module.exports = {
  HOST: "localhost",
  USER: {your postgres username here},
  PASSWORD: {your password here},
  DB: "krewesic",
  dialect: "postgres",
};
you will need to create your krewesic db in the postgres shell.
## google maps api key
in the client/components/events create a file called keys.js. the contents of it should follow this format:
const keys = {
  GOOGLE_MAPS_KEY: 'yourgooglemapsapikeyhere'
};

GOOGLE MAPS API:

https://console.cloud.google.com/apis/dashboard

SEATGEEK API:

https://seatgeek.com/?next=%2Faccount%2Fdevelop#login

AUDIO DB API:

https://www.theaudiodb.com/api_guide.php


## peerjs
Peerjs runs on a separate server, set to port 3002 if running on your local machine. Make sure you are not running your application on port 3002 or there will be a conflict.  In client/src/components/LiveStream/peerObject.js: to run on local machine, make sure that deployed is equal to false.  To deploy, you will need to adjust the deployedPeerObj to match your own DNS.  


## frontend
In the frontend we used react routing in order to navigate between the components we utilized.
The login component is the first component you encounter. After the login component, krewesic has the form component in which
the user is redirected to the user type selection page. The user selection component allows new users to sign up as either an artist or a listener depending on what their purpose of using the app is. Musicians would want to sign up as an artist in order to be able to have access to artist based features and vice versa for strict music fans who would want to sign up as a listener. If you click listener you are redirected to the listenerForm component where you will fill out listener user information necessary to setting up your user profile. If you click artist you are redirected to the artistForm component where you will fill out artist user information necessary to setting up your user profile.

Upon clicking the create profile button you are redirected to the home page dubbed the Discover Artists page in which the application displays our database of artists who use the platform. On this page you can access these artists profiles and follow them if you so choose as well as see their posts.

Krewesic has a Navbar displayed on every page that indicates where you can navigate in the application. Krewesic has profile component which displays user information filled out during profile creation. This component will conditionally render the profile based on the user type. Krewesic also contains an events component that allows you to interact with google maps on our application and search for concerts in a designated time frame you fill out as well as invite other listeners to concert venues. Additionally, krewesic has a live chat features in which listeners on the platform can interact with other listeners via websocket integration. Krewesic maintains both live chat via messaging and video. Krewesic contains an audio visualizer component in which users can record custom audio as well as see their vocal input displayed via the audio visualizer which actively responds to vocal feedback. Another component is our live video component in which artists can perform on directly on the app to other users. They can also schedule these performances via the Create Event component and view them in the Event Hub as well as comment on the events and indicate participation. For accessibility purposes, krewesic has a toggle feature that allows for users who experience a certain colorblindness to be able to use the application easily.


## styling
For styling, we implemented material-ui into our application in order to design our components. In addition to using material-ui for base component design we also implemented this library's use of icons. Krewesic also implemented global styles as well as styled components to design our frontend.

