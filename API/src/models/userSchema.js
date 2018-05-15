"use strict";

// Get all dependencies
const mongoose = require("../database");

// Define schema
const schema = {
    userID: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    name: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true
    }
};

// Collection name
const collectionName = "user";
// Create Schema
const userSchema = mongoose.Schema(schema);
// Create Model
const User = mongoose.model(collectionName, userSchema);

// Export User model
module.exports = User;