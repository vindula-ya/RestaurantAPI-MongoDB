"use strict";

const mongoose = require("../database");
const autoIncrement = require("mongoose-sequence")(mongoose);

const schema = {
    name: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    price: {
        type: mongoose.Schema.Types.Number,
        required: true
    }
};

const collectionName = "food";
const foodSchema = mongoose.Schema(schema);
foodSchema.plugin(autoIncrement, {
    inc_field: "foodID"
});
//Model for foods
const Food = mongoose.model(collectionName, foodSchema);
module.exports = Food;
