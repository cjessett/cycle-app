
var UserDb = require('../db/UserDb');
var userDb = new UserDb();

"use strict";
function api_user_get(req, res) {
    userDb.getUser(req,res);
}
exports.api_user_get = api_user_get;

function api_users_get(req, res) {
    userDb.getUsers(req,res);
}
exports.api_users_get = api_users_get;

function api_user_authenticate(req, res) {
    userDb.authenticate(req,res);
}
exports.api_user_authenticate = api_user_authenticate;

function api_user_post(req, res) {
    userDb.addUser(req,res);
}
exports.api_user_post = api_user_post;