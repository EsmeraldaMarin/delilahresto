var connection = require('../connection');

function returnUsers(req, res){
    var sql = 'SELECT * FROM delilah_resto.users';

    connection.query(sql, function (err, users){
        if(err){
            res.send(err)
        }else{
            res.send(JSON.stringify(users))
        }
    })
}
module.exports = returnUsers; 