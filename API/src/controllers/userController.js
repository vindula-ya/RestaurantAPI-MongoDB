"use strict";

const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

module.exports = {
    createUser: (req, res) => {
        const userID = req.body.userID;
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        // Hash password
        bcrypt.hash(password, config.get("saltRounds"))
            .then((hashResult) => User.create({
                userID: userID,
                name: name,
                email: email,
                password: hashResult
            }))
            .then((result) => {
                return res.json({
                    message: "Successfully saved user",
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

    getAllUsers: (req, res) => {
        User.find()
            .then((result) => {
                return res.json({
                    message: "Retrieved all users",
                    result: result
                });
            })
            .catch((error) => {
                return res.json({
                    message: "Unable to retrieve all users",
                    error: error
                });
            });
    },

    getOneUser: (req, res) => {
        // Get userID giving by parameter
        const userID = req.params.userID;

        User.findOne({
                userID: userID
            })
            .then((result) => {
                if (!result) {
                    return res.json({
                        message: "User does not exist",
                        result: result
                    });
                } else {
                    return res.json({
                        message: "Successfully retieved user",
                        result: result
                    });
                }
            })
            .catch((error) => {
                return res.json({
                    message: "Unable to retrieve user",
                    error: error
                });
            });
    },

    updateUser: (req, res) => {
        // Get userID giving by parameter
        const userID = req.params.userID;

        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        let user = null;

        User.findOne({
                userID: userID
            })
            .then((result) => {
                if (!result) {
                    return res.json({
                        message: "User does not exist",
                        result: result
                    });
                } else {
                    user = result;
                    user.name = req.body.name;
                    user.email = req.body.email;
                }
            })
            .then(() => bcrypt.hash(req.body.password, config.get("saltRounds")))
            .then((result) => {
                user.password = result;
            })
            .then(() => user.save())
            .then((result) => {
                return res.json({
                    message: "Successfully updated user",
                    result: result
                });
            })
            .catch((error) => {
                return res.json({
                    message: "Unable to update user",
                    error: error
                });
            });
    },

    loginUser: (req, res) => {
        const app = require("../app");
        const userID = req.body.userID;
        const password = req.body.password;

        User.findOne({
                userID: userID
            })
            .then((user) => {
                if (!user) {
                    return res.json({
                        message: "User does not exist",
                        result: result
                    });
                }

                // If user has been found
                // Check password
                bcrypt.compare(password, user.password)
                    .then((result) => {
                        // Wrong password
                        if (!result) {
                            res.status(401).json({
                                success: false,
                                error: "Authentication failed. Wrong password"
                            });
                        }
                        // Correct Password
                        else {
                            const userDetails = {
                                userID: user.userID,
                                name: user.name,
                                email: user.email
                            };

                            // Create token
                            const token = jwt.sign(userDetails, app.get("superSecret"), {
                                expiresIn: config.get("tokenExpireTime")
                            });

                            return res.json({
                                success: true,
                                message: "Successfully logged in",
                                token: token
                            });
                        }
                    })
                    .catch((err) => {
                        return res.json({
                            success: false,
                            message: "Authentication failed. No password given",
                            error: err
                        });
                    })
            })
            .catch((err) => {
                return res.json({
                    error: err
                });
            });
    }
}