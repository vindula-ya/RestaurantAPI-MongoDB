"use strict";

// Get dependencies
const mongoose = require("mongoose");
const config = require("config");

// Use bluebird from global promise
mongoose.Promise = global.Promise;

// Connect to database
mongoose.connect(config.get("database"), {
    useMongoClient: true
});

// Export database connection
module.exports = mongoose;

// Test database connection
const db = mongoose.connection;

db.on("error", () => {
    console.log("Error occured from the database");
});

db.once("open", () => {
    console.log("Successfully opened the database");
});