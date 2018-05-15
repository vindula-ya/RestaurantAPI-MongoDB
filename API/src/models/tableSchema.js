"use strict";

// Get all dependencies
const mongoose = require("../database");
const autoIncrement = require("mongoose-sequence")(mongoose);

// Define schema
const schema = {
    occupied: {
        type: mongoose.Schema.Types.Boolean,
        required: true
    }
};

// Collection name
const collectionName = "table";
// Create Schema
const tableSchema = mongoose.Schema(schema);
// Added auto incrementing field
tableSchema.plugin(autoIncrement, {
    inc_field: "tableID"
});
// Create Model
const Table = mongoose.model(collectionName, tableSchema);

// Export Table model
module.exports = Table;