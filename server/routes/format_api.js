var FormatDb = require('../db/FormatDb');
var formatDb = new FormatDb();

"use strict";
function api_formats_get(req, res) {
    console.log('Getting all formats');
    formatDb.getFormats(req, res);
}
exports.api_formats_get = api_formats_get;

function api_formats_update(req, res) {
    //update format
    console.log('Updating a format');
    formatDb.updateFormat(req, res);
}
exports.api_formats_update = api_formats_update;

function api_formats_add(req, res) {
    //add format
    console.log('adding a format');
    formatDb.addFormat(req, res);
}
exports.api_formats_add = api_formats_add;

function api_formats_delete(req, res) {
    //add format
    console.log('removing a format');
    formatDb.removeFormat(req, res);
}
exports.api_formats_delete = api_formats_delete;