var Db = require('./db');
var RaceDb = function () {};

RaceDb.prototype.getRaces = function (req,res) {
    var data = '[';
    var i = 0;
    Db.db.serialize(function () {
        Db.db.each("SELECT id,description,scheduled_date,ifnull(start_time,'') start_time,ifnull(end_time,'') end_time from races order by description", function (err, row) {
            if (err) console.log(err);
            if (i > 0) { data = data + ","; } 
            i++;
            data = data + '{"id": ' + row.id + ',"description":"' + row.description + '","scheduled_date":"' + row.scheduled_date + '","start_time":"' + row.start_time + '","end_time":"' + row.end_time + '"}';
        }, function (err, rows) { data = data + ']'; res.send(data); });
    });
}

RaceDb.prototype.addRace = function(req,res) {
     Db.db.serialize(function () {
        var stmt = Db.db.prepare("INSERT INTO Races(description,scheduled_date) VALUES (?,?)");
        stmt.run(req.body.description,req.body.scheduled_date);
        stmt.finalize();
        res.send('{"success": true }');
    });
}


RaceDb.prototype.deleteRace = function(req,res){
     Db.db.serialize(function () {
        var stmt = Db.db.prepare("DELETE from Races Where id = ?");
        stmt.run(req.params.id);
        stmt.finalize();
        res.send('{"success": true }');
    });
}


RaceDb.prototype.updateRace = function(req,res) {
  Db.db.serialize(function () {
        var stmt = Db.db.prepare("Update Races set description = ?,scheduled_date=? Where id = ?");
        stmt.run(req.body.description,req.body.scheduled_date,req.params.id);
        stmt.finalize();
        res.send('{"success": true }');
    });
}

RaceDb.prototype.startRace = function(req,res){
    Db.db.serialize(function () {
        var stmt = Db.db.prepare("insert into laps(lap_number,race_participant_id,start_time,miles) select 1,id,datetime('now','localtime'),0 from race_participants where race_id = ?");
        stmt.run(req.params.id);
        stmt.finalize();

        stmt = Db.db.prepare("Update Races set start_time = datetime('now','localtime') Where id = ?");
        stmt.run(req.params.id);
        stmt.finalize();

        res.send('{"success": true }');
    });
}

RaceDb.prototype.endRace = function(req,res){
      Db.db.serialize(function () {
        var stmt = Db.db.prepare("Update Races set end_time = datetime('now','localtime') Where id = ?");
        stmt.run(req.params.id);
        stmt.finalize();
        res.send('{"success": true }');
    });
}

RaceDb.prototype.endLap = function(req,res){
      Db.db.serialize(function () {
        var stmt = Db.db.prepare("update laps set end_time = datetime('now','localtime'),miles = 21.3 where race_participant_id = ? and end_time is null");
        stmt.run(req.params.id);
        stmt.finalize();

        stmt = Db.db.prepare("update race_participants set current_lap = (select count(*) from laps where laps.race_participant_id = race_participants.id and laps.end_time is not null) where id =?");
        stmt.run(req.params.id);
        stmt.finalize();

        stmt = Db.db.prepare("insert into laps (lap_number,race_participant_id,start_time,miles) select current_lap+1,id, datetime('now','localtime'),0 from race_participants  where id = ?");
        stmt.run(req.params.id);
        stmt.finalize();

        res.send('{"success": true }');
    });
}

RaceDb.prototype.addParticipant = function(req,res) {
    //race_id,participant_id,team_id,format_id,tag
    Db.db.serialize(function () {

        //delete participant from other races if he/she is registered for a new race...
        var stmt = Db.db.prepare("DELETE FROM laps where race_participant_id in (select id from race_participants where participant_id = ?)");
        stmt.run(req.body.participant_id);
        stmt.finalize();
        
        var stmt1 = Db.db.prepare("DELETE FROM race_participants where participant_id = ?");
        stmt1.run(req.body.participant_id);
        stmt1.finalize();
        

        var stmt2 = Db.db.prepare("INSERT INTO race_participants(race_id,participant_id,current_lap,tag,bike_type) VALUES (?,?,?,?,?)");
        stmt2.run(req.body.race_id,req.body.participant_id,0,req.body.tag,req.body.bike_type);
        stmt2.finalize();
        res.send('{"success": true }');
    });
}

RaceDb.prototype.deleteParticipant = function(req,res) {
    //id
    Db.db.serialize(function () {
        var stmt = Db.db.prepare("delete from laps where race_participant_id = ?");
        stmt.run(req.params.id);
        stmt.finalize();

        var stmt2 = Db.db.prepare("delete from race_participants where id = ?");
        stmt2.run(req.params.id);
        stmt2.finalize();
        res.send('{"success": true }');
    });
}


RaceDb.prototype.getParticipants = function (req,res) {
    var data = '[';
    var params = [];
    var i = 0;
    Db.db.serialize(function () {
        params.push(req.params.id);
        Db.db.each("SELECT rp.id,rp.race_id,rp.team_id,rp.participant_id,rp.current_lap,ifnull(rp.tag,'') tag ,ifnull(p.name,'') participant_name,ifnull(t.name,'') team_name,ifnull(rp.bike_type,p.bike_type) bike_type ,l.miles from race_participants rp left join teams t on rp.team_id = t.id left join participants p on rp.participant_id = p.id left join (select sum(miles) miles,race_participant_id from laps group by race_participant_id) l on l.race_participant_id = rp.id where rp.race_id = ?", params, function (err, row) {
            if (err) console.log(err);
            if (i > 0) { data = data + ","; } 
            i++;
            data = data + '{"id": ' + row.id + ',"race_id":' + row.race_id + ',"team_id":"' + row.team_id + '","participant_id":"' + row.participant_id + '","participant_name":"' + row.participant_name + '","team_name":"' + row.team_name + '","current_lap":' + row.current_lap + ',"tag":"' + row.tag + '","bike_type":"' + row.bike_type + '","miles":' + row.miles + '}';
        }, function (err, rows) { data = data + ']'; res.send(data); });
    });
}

RaceDb.prototype.getParticipantsOrderByTag = function (req,res)
{
    var data = '[';
    var params = [];
    var i = 0;
    Db.db.serialize(function () {
        params.push(req.params.id);
        Db.db.each("SELECT rp.id,rp.race_id,rp.team_id,rp.participant_id,rp.current_lap,ifnull(rp.tag,'') tag ,ifnull(p.name,'') participant_name,ifnull(t.name,'') team_name,ifnull(rp.bike_type,p.bike_type) bike_type ,l.miles from race_participants rp left join teams t on rp.team_id = t.id left join participants p on rp.participant_id = p.id left join (select sum(miles) miles,race_participant_id from laps group by race_participant_id) l on l.race_participant_id = rp.id where rp.race_id = ? order by rp.tag", params, function (err, row) {
            if (err) console.log(err);
            if (i > 0) { data = data + ","; } 
            i++;
            data = data + '{"id": ' + row.id + ',"race_id":' + row.race_id + ',"team_id":"' + row.team_id + '","participant_id":"' + row.participant_id + '","participant_name":"' + row.participant_name + '","team_name":"' + row.team_name + '","current_lap":' + row.current_lap + ',"tag":"' + row.tag + '","bike_type":"' + row.bike_type + '","miles":' + row.miles + '}';
        }, function (err, rows) { data = data + ']'; res.send(data); });
    });
}

RaceDb.prototype.getResults = function (req,res) {
    var data = '[';
    var params = [];
    var i = 0;
    Db.db.serialize(function () {
        //params.push(req.params.id);
        Db.db.each("SELECT id,race_name,participant,gender,age,bike_type,tag,total_time,current_lap,ifnull(start_time,'') start_time,ifnull(end_time,'') end_time,distance_race,gender_bike_type,age_group,miles from vwStandings where race_finished = 'Y' or start_time is not null order by race_name,gender_bike_type,current_lap desc,julianday(end_time) - julianday(start_time)", params, function (err, row) {
            if (err) console.log(err);
            if (i > 0) { data = data + ","; } 
            i++;
            data = data + '{"id":' + row.id + ',"race_name":"' + row.race_name + '","participant":"' + row.participant + '","gender":"' + row.gender + '","age":"' + row.age + '","bike_type":"' + row.bike_type + '","tag":"' + row.tag + '","total_time":"' + row.total_time + '","laps_completed":"' + row.current_lap + '","start_time":"' + row.start_time + '","end_time":"' + row.end_time + '","distance_race":"' + row.distance_race + '","gender_bike_type":"' + row.gender_bike_type + '","age_group":"' + row.age_group + '","miles":' + row.miles + '}';
        }, function (err, rows) { data = data + ']'; res.send(data); });
    });
}

module.exports = RaceDb;
