"use strict";

// Get all dependencies
const mongoose = require("../database");
const autoIncrement = require("mongoose-sequence")(mongoose);
const deepPopulate = require("mongoose-deep-populate")(mongoose);

// Define schema
const schema = {
    reservation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "reservation",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    type: {
        type: mongoose.Schema.Types.String,
        enum: [
            "credit",
            "cash"
        ],
        required: true
    },
    value: {
        type: mongoose.Schema.Types.Number,
        required: true
    }
};

// Collection name
const collectionName = "payment";
// Create Schema
const paymentSchema = mongoose.Schema(schema);
// Added auto incrementing field
paymentSchema.plugin(autoIncrement, {
    inc_field: "paymentID"
});
// Add deep populate plugin
paymentSchema.plugin(deepPopulate, {
    whitelist: [
        "reservation",
        "reservation.user",
        "reservation.table",
        "user"
    ]
});
// Create Model
const Payment = mongoose.model(collectionName, paymentSchema);

// Export Payment model
module.exports = Payment;