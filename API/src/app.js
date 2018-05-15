"use strict";

// Get dependencies
const bluebird = require("bluebird");
const bodyParser = require("body-parser");
const config = require("config");
const express = require("express");
const morgan = require("morgan")
const routes = require("./controllers/index");

// Get instance of express server
const app = express();

// Setup middleware
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({
    type: "application/json"
}));
app.use(morgan("dev"));

// Define port number
const portNo = config.get("portNo");

// Use bluebird to handle promises
global.Promise = bluebird;

// Set secret for JSON Web Token
app.set("superSecret", config.get("tokenSecret"));

// Routes
routes(app);

// Start server
app.listen(portNo, () => {
    console.log("Restaurant API running on port " + portNo);
});

// Export server instance
module.exports = app;