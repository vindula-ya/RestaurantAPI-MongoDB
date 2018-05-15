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
    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "food",
        required: true
    },
    quantity: {
        type: mongoose.Schema.Types.Number,
        required: true
    }
};

// Collection name
const collectionName = "order";
// Create Schema
const orderSchema = mongoose.Schema(schema);
// Add auto incrementing field
orderSchema.plugin(autoIncrement, {
    inc_field: "orderID"
});
// Add deep populate plugin
orderSchema.plugin(deepPopulate, {
    whitelist: [
        "reservation",
        "reservation.user",
        "reservation.table"
    ]
});
// Create Model
const Order = mongoose.model(collectionName, orderSchema);

// Export Order model
module.exports = Order;