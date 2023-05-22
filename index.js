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
app.use(express.static(path.join(__dirname, 'public/css')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
    res.render('mfa-qr', { qrURL: "data:image/png;base64,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"})
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