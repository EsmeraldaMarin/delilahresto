let connection = require('../connection');

function createUser(req, res){

}
function returnUsers(req, res){
    let sql = 'SELECT * FROM delilah_resto.users';

    connection.query(sql, function (err, users){
        if(err){
            res.send(err)
        }else{
            res.send(users)
        }
    })
}

module.exports = {
    createUser,
    returnUsers
}; 

