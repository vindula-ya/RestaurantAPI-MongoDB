"use strict";

// Get all dependencies
const mongoose = require("../database");
const autoIncrement = require("mongoose-sequence")(mongoose);
const deepPopulate = require("mongoose-deep-populate")(mongoose);

// Define schema
const schema = {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    table: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "table",
        required: true
    },
    expectedTime: {
        type: mongoose.Schema.Types.Date,
        required: true
    }
};

// Collection name
const collectionName = "reservation";
// Create Schema
const reservationSchema = mongoose.Schema(schema);
// Added auto incrementing field
reservationSchema.plugin(autoIncrement, {
    inc_field: "reservationID"
});
// Add deep populate plugin
reservationSchema.plugin(deepPopulate, {
    whitelist: [
        "user",
        "table"
    ]
});
// Create Model
const Reservation = mongoose.model(collectionName, reservationSchema);

// Export Reservation model
module.exports = Reservation;