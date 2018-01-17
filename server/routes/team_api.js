var TeamDb = require('../db/TeamDb');
var teamDb = new TeamDb();

"use strict";
function api_teams_get(req, res) {
    console.log('Getting all teams');
    teamDb.getTeams(req, res);
}
exports.api_teams_get = api_teams_get;

function api_teams_getByRace(req, res) {
    console.log('Getting teams by Race Id ' + req.params.id);
    teamDb.getTeamsByRace(req, res);
}
exports.api_teams_getByRace = api_teams_getByRace;

function api_teams_add(req, res) {
    console.log('Adding a team');
    teamDb.addTeam(req, res);
}
exports.api_teams_add = api_teams_add;

function api_teams_update(req, res) {
    console.log('Updating a team');
    teamDb.updateTeam(req, res);
}
exports.api_teams_update = api_teams_update;

function api_teams_delete(req, res) {
    console.log('Deleting a team');
    teamDb.deleteTeam(req, res);
}
exports.api_teams_delete = api_teams_delete;

function api_teams_getMembers(req, res) {
    console.log('Getting team members');
    teamDb.getTeamMembers(req, res);
}
exports.api_teams_getMembers = api_teams_getMembers;

function api_teams_addMember(req, res) {
    console.log('Adding a team member');
    teamDb.addMember(req, res);
}
exports.api_teams_addMember = api_teams_addMember;

function api_teams_removeMember(req, res) {
    console.log('Deleting a team member');
    teamDb.removeMember(req, res);
}
exports.api_teams_removeMember = api_teams_removeMember;