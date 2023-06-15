import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";
import cors from 'cors';

// import pgConnection() to connect to pg
import pgConnection from "./models/db.js";

// express application creation
const app = express();

// configure to app to use "env" variables
config();

// auth routes
import createUser from "./routes/auth/create-account.js";
import userLogin from "./routes/auth/login.js";
import generateQRCode from "./routes/auth/generate-2fa-code.js";
import enableMFA from "./routes/auth/enable-2fa.js";
import verifyTotp from "./routes/auth/verify-totp.js"

// app routes
import addFriend from "./routes/app/add-friend.js";
import getFriends from "./routes/app/get-friends.js";
import deleteFriend from "./routes/app/remove-friend.js";
import searchFriend from "./routes/app/search-friend.js";

import getUsers from "./routes/general/get-user.js";
import deleteAllUsers from "./routes/general/delete-all.js";

// configuring app to serve static files 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, 'public/css')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors()); // setting cors

// specifying the template engine
app.set('view engine', 'ejs');

// environment variables
const APP_PORT = 5000 || process.env.PORT;
const PG_USERNAME = process.env.PG_USERNAME;
const PG_PASSWORD = process.env.PG_PASSWORD;

// establishing the connection
const pgConnect = await pgConnection(PG_USERNAME, PG_PASSWORD);

pgConnect.authenticate()
    .then(() => {
        console.log("Connected to PG Database");
    }).catch((err) => {
        console.log("Error Occurred while connecting:", err);
})

// home page route
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
});

// setting up auth routes
app.use('/auth/register', createUser);
app.use('/auth/login', userLogin);
app.use('/auth/generate-qr', generateQRCode);
app.use('/auth/enable-mfa', enableMFA);
app.use('/auth/verify-totp', verifyTotp);

// setting up app routes
app.use('/add-friend', addFriend);
app.use('/get-friends', getFriends);
app.use('/delete-friend', deleteFriend);
app.use('/search-friend', searchFriend);

// verification purposes routes
app.use('/get-users', getUsers);
app.use('/delete-users', deleteAllUsers);

// Listening at port defined by "APP_PORT"
app.listen(APP_PORT, () => {
    console.log(`Listening at port: ${APP_PORT}`)
});