import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";

// express application creation
const app = express();

// configure to app to use "env" variables
config();

// configuring app to serve static files 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// variables
const APP_PORT = 5000 || process.env.PORT;

// home route
app.get('/', (req, res) => {
    res.send('Hello World!!');
});

// Listening at defined port
app.listen(APP_PORT, () => {
    console.log(`Listening at port: ${APP_PORT}`)
})