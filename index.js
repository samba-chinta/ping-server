import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";

// import pgConnection() to connect to pg
import pgConnection from "./models/db.js";

// express application creation
const app = express();

// configure to app to use "env" variables
config();

// routes
import createUser from "./routes/auth/create-account.js";
import userLogin from "./routes/auth/login.js";
import generateQRCode from "./routes/auth/generate-2fa-code.js";
import getUsers from "./routes/general/get-user.js";

// configuring app to serve static files 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
    res.send('Hello World!!');
});

// defining auth routes
app.use('/auth/register', createUser);
app.use('/auth/login', userLogin);
app.use('/auth/generate-qr', generateQRCode);

// verification purposes routes
app.use('/get-users', getUsers);

// Listening at port defined by "APP_PORT"
app.listen(APP_PORT, () => {
    console.log(`Listening at port: ${APP_PORT}`)
});