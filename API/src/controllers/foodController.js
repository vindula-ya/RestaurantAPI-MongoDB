"use strict";
const Food = require("../models/foodSchema");

//routes/foods
module.exports = {
    createFood: (req, res) => {
        const name = req.body.name;
        const price = req.body.price;

        Food.create({
                name: name,
                price: price
            })
            .then((result) => {
                return res.json({
                    message: "Successfully saved food",
                    result: result
                });
            })
            .catch((error) => {
                return res.json({
                    message: "Save unsuccessful",
                    error: error
                });
            });
    },

    getAllFood: (req, res) => {
        Food.find()
            .then((result) => {
                return res.json({
                    message: "Retrieved all food",
                    result: result
                });
            })
            .catch((error) => {
                return res.json({
                    message: "Unable to retrieve all foods",
                    error: error
                });
            });
    },
    getOneFood: (req, res) => {
        const foodID = req.params.foodID;

        Food.findOne({
                foodID: foodID
            })
            .then((result) => {
                if (!result) {
                    return res.json({
                        message: "Food does not exist",
                        result: result
                    });
                } else {
                    return res.json({
                        message: "Successfully retieved food",
                        result: result
                    });
                }
            })
            .catch((error) => {
                return res.json({
                    message: "Unable to retrieve food",
                    error: error
                });
            });
    },
    updateFood: (req, res) => {
        const foodID = req.params.foodID;
        let food = null;

        Food.findOne({
                foodID: foodID
            })
            .then((result) => {
                if (!result) {
                    return res.json({
                        message: "Food does not exist",
                        result: result
                    });
                } else {
                    food = result;
                    food.name = req.body.name;
                    food.price = req.body.price;
                }
            })
            .then(() => food.save())
            .then((result) => {
                return res.json({
                    message: "Successfully updated food",
                    result: result
                });
            })
            .catch((error) => {
                return res.json({
                    message: "Unable to update food",
                    error: error
                });
            });
    }
}