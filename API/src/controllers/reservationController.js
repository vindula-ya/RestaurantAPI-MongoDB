"use strict";

const config = require("config");
const mongoose = require("../database");
const deepPopulate = require("mongoose-deep-populate")(mongoose);
const nexmo = require("../sms");
const tranporter = require("../email");
const Reservation = require("../models/reservationSchema");
const User = require("../models/userSchema");

module.exports = {
    createReservation: (req, res) => {
        const user = req.body.user;
        const table = req.body.table;
        const expectedTime = req.body.expectedTime;

        let reservation = null;
        let mailOptions = null;
        let userDetails = null;

        Promise.all([
                Reservation.create({
                    user: user,
                    table: table,
                    expectedTime: expectedTime
                }),
                User.findById(user)
            ])
            .then((result) => {
                reservation = result[0];
                userDetails = result[1];

                mailOptions = {
                    from: config.get("email.auth.user"),
                    to: userDetails.email,
                    subject: "Reservation Confirmation",
                    text: ("Reservation " + reservation.reservationID +
                        " has been made by " + userDetails.name + " at " + expectedTime)
                };
            })
            // Send email
            .then(() => tranporter.sendMail(mailOptions))
            // Display result of sending email in console
            .then((info) => {
                console.log("Email sent: " + info.response);
            })
            // Send SMS
            .then(() => {
                nexmo.message.sendSms(
                    config.get("senderNumber"),
                    userDetails.userID,
                    ("Reservation " + reservation.reservationID + " has been made by " + userDetails.name + " at " + expectedTime), {
                        type: "unicode"
                    },
                    (err, responseData) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.dir(responseData);
                        }
                    }
                );
            })
            // Send response
            .then(() => {
                return res.json({
                    message: "Successfully saved reservation",
                    result: reservation
                });
            })
            .catch((error) => {
                return res.json({
                    message: "Save unsuccessful",
                    error: error
                });
            });
    },

    // Get all Reservations
    getAllReservations: (req, res) => {
        // Get all Reservations
        Reservation.find()
            .deepPopulate([
                "user",
                "table"
            ])
            .exec()
            .then((result) => {
                return res.json({
                    message: "Retrieved all reservations",
                    result: result
                });
            })
            .catch((error) => {
                return res.json({
                    message: "Unable to retrieve all reservations",
                    error: error
                });
            });
    },

    getOneReservation: (req, res) => {
        // Get reservationID giving by parameter
        const reservationID = req.params.reservationID;

        // Get Reservation giving ID from database
        Reservation.findOne({
                reservationID: reservationID
            })
            .deepPopulate([
                "user",
                "table"
            ])
            .exec()
            .then((result) => {
                if (!result) {
                    return res.json({
                        message: "Reservation does not exist",
                        result: result
                    });
                } else {
                    return res.json({
                        message: "Successfully retieved reservation",
                        result: result
                    });
                }
            })
            .catch((error) => {
                return res.json({
                    message: "Unable to retrieve reservation",
                    error: error
                });
            });
    },

    updatePayment: (req, res) => {
        const reservationID = req.params.reservationID;

        let reservation = null;

        Reservation.findOne({
                reservationID: reservationID
            })
            .then((result) => {
                if (!result) {
                    return res.json({
                        message: "Reservation does not exist",
                        result: result
                    });
                } else {
                    reservation = result;
                    reservation.user = req.body.user;
                    reservation.table = req.body.table;
                    reservation.expectedTime = req.body.expectedTime;
                }
            })
            .then(() => reservation.save())
            .then((result) => {
                return res.json({
                    message: "Successfully updated reservation",
                    result: result
                });
            })
            .catch((error) => {
                return res.json({
                    message: "Unable to update reservation",
                    error: error
                });
            });
    }
}