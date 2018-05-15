"use strict";

const mongoose = require("../database");
const deepPopulate = require("mongoose-deep-populate")(mongoose);
const Order = require("../models/orderSchema");

module.exports = {
    createOrder: (req, res) => {
        const reservation = req.body.reservation;
        const food = req.body.food;
        const quantity = req.body.quantity;

        Order.create({
                reservation: reservation,
                food: food,
                quantity: quantity
            })
            .then((result) => {
                return res.json({
                    message: "Successfully saved order",
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

    // Get all Orders
    getAllOrders: (req, res) => {
        // Get all Orders
        Order.find()
            .deepPopulate([
                "reservation",
                "reservation.user",
                "reservation.table"
            ])
            .exec()
            .then((result) => {
                return res.json({
                    message: "Retrieved all orders",
                    result: result
                });
            })
            .catch((error) => {
                return res.json({
                    message: "Unable to retrieve all orders",
                    error: error
                });
            });
    },

    // Get one Order
    getOneOrder: (req, res) => {
        // Get orderID giving by parameter
        const orderID = req.params.orderID;

        Order.findOne({
                orderID: orderID
            })
            .deepPopulate([
                "reservation",
                "reservation.user",
                "reservation.table"
            ])
            .exec()
            .then((result) => {
                if (!result) {
                    return res.json({
                        message: "Order does not exist",
                        result: result
                    });
                } else {
                    return res.json({
                        message: "Successfully retieved order",
                        result: result
                    });
                }
            })
            .catch((error) => {
                return res.json({
                    message: "Unable to retrieve order",
                    error: error
                });
            });
    },

    updateOrder: (req, res) => {
        const orderID = req.params.orderID;

        let order = null;
        Order.findOne({
                orderID: orderID
            })
            .then((result) => {
                if (!result) {
                    return res.json({
                        message: "Order does not exist",
                        result: result
                    });
                } else {
                    order = result;
                    order.reservation = req.body.reservation;
                    order.food = req.body.food;
                    order.quantity = req.body.quantity;
                }
            })
            .then(() => order.save())
            .then((result) => {
                return res.json({
                    message: "Successfully updated order",
                    result: result
                });
            })
            .catch((error) => {
                return res.json({
                    message: "Unable to update order",
                    error: error
                });
            });
    }
}