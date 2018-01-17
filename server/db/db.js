var Db = function () { };
var fs = require("fs");
var file = "./cacycleapp.db";
var exists = fs.existsSync(file);
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

Db.db = db;
module.exports = Db;
