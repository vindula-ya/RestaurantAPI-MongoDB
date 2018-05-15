"use strict";

// Get dependencies
const config = require("config");
const nodemailer = require("nodemailer");

// Configure transporter
const transporter = nodemailer.createTransport(config.get("email"));

module.exports = transporter;