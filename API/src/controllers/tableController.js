"use strict";

const Table = require("../models/tableSchema");

module.exports = {
    createTable: (req, res) => {
        // Get details from body details
        const occupied = req.body.occupied;

        Table.create({
                occupied: occupied
            })
            .then((result) => {
                return res.json({
                    message: "Successfully saved table",
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

    getAllTables: (req, res) => {
        Table.find()
            .then((result) => {
                return res.json({
                    message: "Retrieved all tables",
                    result: result
                });
            })
            .catch((error) => {
                return res.json({
                    message: "Unable to retrieve all tables",
                    error: error
                });
            });
    },

    getOneTable: (req, res) => {
        // Get tableID giving by parameter
        const tableID = req.params.tableID;

        // Get Table from database
        Table.findOne({
                tableID: tableID
            })
            .then((result) => {
                if (!result) {
                    return res.json({
                        message: "Table does not exist",
                        result: result
                    });
                } else {
                    return res.json({
                        message: "Successfully retieved table",
                        result: result
                    });
                }
            })
            .catch((error) => {
                return res.json({
                    message: "Unable to retrieve table",
                    error: error
                });
            });
    },

    updateTable: (req, res) => {
        // Get tableID giving by parameter
        const tableID = req.params.tableID;

        let table = null;
        Table.findOne({
                tableID: tableID
            })
            .then((result) => {
                if (!result) {
                    return res.json({
                        message: "Table does not exist",
                        result: result
                    });
                } else {
                    table = result;
                    food.occupied = req.body.occupied;
                }
            })
            .then(() => table.save())
            .then((result) => {
                return res.json({
                    message: "Successfully updated table",
                    result: result
                });
            })
            .catch((error) => {
                return res.json({
                    message: "Unable to update table",
                    error: error
                });
            });
    }
}