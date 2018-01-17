var Db = require('./db');

var ParticipantDb = function () {};

ParticipantDb.prototype.getParticipants = function (req,res) {
    var data = '[';
    var i = 0;
    Db.db.serialize(function () {
        Db.db.each("SELECT id,name,ifnull(address,'') address,primary_phone,ifnull(alt_phone,'') alt_phone,email,gender,ifnull(age,'') age,bike_type,age_group from participants order by name", function (err, row) {
            if (err) console.log(err);
            if (i > 0) { data = data + ","; } 
            i++;
            data = data + '{"id": ' + row.id + ',"name":"' + row.name + '","address":"' + row.address + '","primary_phone":"' + row.primary_phone + '","alt_phone":"' + row.alt_phone + '","email":"' + row.email + '","gender":"' + row.gender + '","age":"' + row.age + '","bike_type":"' + row.bike_type + '","age_group":"' + row.age_group + '"}';
        }, function (err, rows) { data = data + ']'; res.send(data); });
    });
}

ParticipantDb.prototype.getParticipantsOrderById = function (req,res) {
    var data = '[';
    var i = 0;
    Db.db.serialize(function () {
        Db.db.each("SELECT id,name,ifnull(address,'') address,primary_phone,ifnull(alt_phone,'') alt_phone,email,gender,ifnull(age,'') age,bike_type,age_group from participants order by id", function (err, row) {
            if (err) console.log(err);
            if (i > 0) { data = data + ","; } 
            i++;
            data = data + '{"id": ' + row.id + ',"name":"' + row.name + '","address":"' + row.address + '","primary_phone":"' + row.primary_phone + '","alt_phone":"' + row.alt_phone + '","email":"' + row.email + '","gender":"' + row.gender + '","age":"' + row.age + '","bike_type":"' + row.bike_type + '","age_group":"' + row.age_group + '"}';
        }, function (err, rows) { data = data + ']'; res.send(data); });
    });
}

ParticipantDb.prototype.addParticipant = function(req,res) {
     Db.db.serialize(function () {
        var stmt = Db.db.prepare("INSERT INTO Participants(name,address,primary_phone,alt_phone,email,gender,age,bike_type,age_group) VALUES (?,?,?,?,?,?,?,?,?)");
        stmt.run(req.body.name,req.body.address,req.body.primary_phone,req.body.alt_phone,req.body.email,req.body.gender,req.body.age,req.body.bike_type,req.body.age_group);
        stmt.finalize();
        res.send('{"success": true }');
    });
}

ParticipantDb.prototype.deleteParticipant = function(req,res){
     Db.db.serialize(function () {
        var stmt = Db.db.prepare("delete from Participants where id = ?");
        stmt.run(req.params.id);
        stmt.finalize();
        res.send('{"success": true }');
    });
}

ParticipantDb.prototype.updateParticipant = function(req,res) {
 Db.db.serialize(function () {
        //address = ?,primary_phone = ?,alt_phone = ?,email = ?,
        var stmt = Db.db.prepare("update Participants set name = ?,gender = ?,age = ?,bike_type=?,age_group = ? where id = ?");
        stmt.run(req.body.name,req.body.gender,req.body.age,req.body.bike_type,req.body.age_group,req.params.id);
        stmt.finalize();
        res.send('{"success": true }');
    });
}

module.exports = ParticipantDb;