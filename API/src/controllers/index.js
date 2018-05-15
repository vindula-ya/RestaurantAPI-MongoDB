"use strict";

//All dependencies
const authentication = require("../authenticationMiddleware");
const express = require("express");
const router = express.Router();
const food = require("./foodController");
const order = require("./orderController");
const payment = require("./paymentController");
const reservation = require("./reservationController");
const table = require("./tableController");
const user = require("./userController");

module.exports = (app) => {
    app.post('/login', user.loginUser);
    router.use(authentication);

    // Food routes
    router.route('/food')
        .post(food.createFood)
        .get(food.getAllFood);
    router.route('/food/:foodID')
        // Get one Food giving by foodID
        .get(food.getOneFood)
        // Update one Food giving by foodID
        .put(food.updateFood);

    // Order routes
    router.route('/order')
        // Create a Order
        .post(order.createOrder)
        // Get all Orders
        .get(order.getAllOrders);
    router.route('/order/:orderID')
        // Get one Order giving by orderID
        .get(order.getOneOrder)
        // Update one Order giving by orderID
        .put(order.updateOrder);

    // Payment routes
    router.route('/payment')
        // Create a Payment
        .post(payment.createPayment)
        // Get all Payments
        .get(payment.getAllPayments);
    router.route('/payment/:paymentID')
        // Get one Payment giving by paymentID
        .get(payment.getOnePayment)
        // Update one Payment giving by paymentID
        .put(payment.updatePayment);

    // Reservation routes
    router.route('/reservation')
        // Create a Reservation
        .post(reservation.createReservation)
        // Get all Reservations
        .get(reservation.getAllReservations);
    router.route('/reservation/:reservationID')
        // Get one Reservation giving by reservationID
        .get(reservation.getOneReservation)
        // Update one Reservation giving by reservationID
        .put(reservation.updatePayment);

    // Table 
    router.route('/table')
        // Create a Table
        .post(table.createTable)
        // Get all Tables
        .get(table.getAllTables);
    router.route('/table/:tableID')
        // Get one Table giving by tableID
        .get(table.getOneTable)
        // Update one Table giving by  tableID
        .put(table.updateTable);

    // User routes
    router.route('/user')
        // Create a User
        .post(user.createUser)
        // Get all Users
        .get(user.getAllUsers);
    router.route('/user/:userID')
        // Get one user giving by userID
        .get(user.getOneUser)
        // Update one user giving by userID
        .put(user.updateUser);

    // Link to server
    app.use('/restaurant', router);
};