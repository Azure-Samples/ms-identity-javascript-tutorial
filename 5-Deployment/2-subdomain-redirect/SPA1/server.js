const express = require('express');
const morgan = require('morgan');
const path = require('path');

const https = require("https");
const fs = require("fs");

const DEFAULT_PORT = process.env.PORT || 3000;

// initialize express.
const app = express();

// Initialize variables.
let port = DEFAULT_PORT;

// Configure morgan module to log all requests.
app.use(morgan('dev'));

// Setup app folders.
app.use(express.static('App'));

// Set up a route for signout.html
app.get('/signout', (req, res) => {
    res.sendFile(path.join(__dirname + '/App/signout.html'));
});

// Set up a route for signout.html
app.get('/redirect', (req, res) => {
    res.sendFile(path.join(__dirname + '/App/redirect.html'));
});

// Set up a route for index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

const options = {
    key: fs.readFileSync(path.join(__dirname + "/example.com.key")),
    cert: fs.readFileSync(path.join(__dirname + "/example.com.crt"))
};

const server = https.createServer(options, app);

server.listen(port, () => {
    console.log("server starting on port : " + port)
});
