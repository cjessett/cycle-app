
var LapDb = require('../db/LapDb');
var lapDb = new LapDb();

"use strict";
function api_laps_get(req, res) {
    console.log('Getting all laps');
    lapDb.getLaps(req, res);
}
exports.api_laps_get = api_laps_get;

function api_laps_get_report(req, res) {
    console.log('Getting Laps report');
    lapDb.getLapReport(req, res);
}
exports.api_laps_get_report = api_laps_get_report;

function api_lap_getDetails(req, res) {
    console.log('Getting lap details');
    lapDb.getLapDetails(req, res);
}
exports.api_lap_getDetails = api_lap_getDetails;

function api_laps_updateLap(req, res) {
    console.log('Updating a lap');
    lapDb.updateLap(req, res);
}
exports.api_laps_updateLap = api_laps_updateLap;

function api_laps_deleteLap(req, res) {
    console.log('Deleting a lap');
    lapDb.deleteLap(req, res);
}
exports.api_laps_deleteLap = api_laps_deleteLap;

function api_laps_addLap(req, res) {
    console.log('Adding a Lap');
    lapDb.addLap(req, res);
}
exports.api_laps_addLap = api_laps_addLap;