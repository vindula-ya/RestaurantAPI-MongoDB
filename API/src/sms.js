"use strict";

const config = require("config");
const Nexmo = require("nexmo");

module.exports = new Nexmo(config.get("sms"));