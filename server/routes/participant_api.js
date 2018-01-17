var ParticipantDb = require('../db/ParticipantDb');
var participantDb = new ParticipantDb();

"use strict";
function api_participants_get(req, res) {
    console.log('Getting all participants');
    participantDb.getParticipants(req, res);
}
exports.api_participants_get = api_participants_get;

function api_participants_orderbyid_get(req, res) {
    console.log('Getting all participants ordered by id');
    participantDb.getParticipantsOrderById(req, res);
}
exports.api_participants_orderbyid_get = api_participants_orderbyid_get;


function api_participants_add(req, res) {
    console.log('Adding a participant');
    participantDb.addParticipant(req, res);
}
exports.api_participants_add = api_participants_add;

function api_participants_update(req, res) {
    console.log('Updating a participant');
    participantDb.updateParticipant(req, res);
}
exports.api_participants_update = api_participants_update;

function api_participants_delete(req, res) {
    console.log('Deleting a participant');
    participantDb.deleteParticipant(req, res);
}
exports.api_participants_delete = api_participants_delete;