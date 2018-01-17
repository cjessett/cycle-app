var Db = require('./db');
var UserDb = function () { };

UserDb.prototype.getUser = function(req,res) {
  var params = [];
   var query = 'select id,firstName,lastName,userName,password,createdOn  from Users where id = ?';
   var retVal = '{}';

    //search by username if id is not a number ...
   if (isNaN(req.params.id))
   {
       query = 'select id,firstName,lastName,userName,password,createdOn from Users where userName = ?';
   }
    
    params.push(req.params.id);

    Db.db.each(query,params,function(err,row) { 
	      
	    retVal= '{"id":' + row.id + ',"firstName":"' + row.firstName + '","lastName":"' + row.lastName + '","userName":"' + row.userName + '"}';
             
   }, function(err,rows) { 
    //console.log('Returning ' + retVal); 
    res.send(retVal);
    });	
}

UserDb.prototype.getUsers =  function(req,res) {
    var retVal = '[]';
    res.end(retVal);
}

UserDb.prototype.authenticate = function(req,res) {
     //console.log('Authenticating user ' + req.body.username );

    Db.db.serialize(function () {
        var found = false;

        var params = [];
        var query = 'select * from Users where upper(userName) = upper(?) and upper(password) = upper(?)';
        var retVal = '{}';

        params.push(req.body.username);
        params.push(req.body.password);

       Db.db.each(query,
            params,
            function (err, row) {
                //console.log(row.userName);
                found = true;
            },
            function (err, rows) {
                if (found) {
                   // console.log("Found user");
                    res.send('{"success": true }');
                }
                else {
                    //console.log("user not found");
                    res.send('{"success": false,"message":"Username or password is incorrect" }');
                }
            });
    });
}

UserDb.prototype.addUser = function(req,res){
   console.log('Adding user ' + req.body.username);

    Db.db.serialize(function () {
        var found = false;

        var params = [];
        var query = 'select * from Users where upper(userName) = upper(?)';
        var retVal = '{}';

        params.push(req.body.username);

        Db.db.each(query, params, function (err, row) {
            found = true;
        }, function (err, rows) {
            //
        });

        if (!found)
        {
            var stmt = Db.db.prepare("INSERT INTO users(firstName,lastName,userName,password,createdOn) VALUES (?,?,?,?,datetime('now','localtime'))");
            stmt.run(req.body.firstName,req.body.lastName,req.body.username,req.body.password);
            stmt.finalize();
            res.send('{"success": true }');
        }
        else
        {
            res.send('{"success": false,"message":"User name is already taken." }');
        }
       
       
    });
}


module.exports = UserDb;