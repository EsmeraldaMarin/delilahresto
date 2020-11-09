let connection = require('../connection');

function createUser(req, res) {

    let user = req.body;
    let validator = 'SELECT email, username FROM delilah_resto.users'

    connection.query(validator, function (err, info) {

        let resultEmail = info.find(elem => elem.email === user.email)
        let resultUsername = info.find(elem => elem.username === user.username)

        if (resultEmail || resultUsername) {
            
            res.status(409).json({ message: 'This user already exists' })
            return
        }

        let sql = `INSERT INTO delilah_resto.users(username, fullname, email, phone, address, password, is_admin)
        VALUES ('${user.username}', '${user.fullname}', '${user.email}', '${user.phone}', '${user.address}', '${user.password}', ${user.is_admin});`;

        connection.query(sql, function (err, user) {
            if (err) {
                console.log(err)
                res.status(500).json({ error: 'Asegurese de ingresar todos los datos del usuario' });

            } else {
                res.status(201).json({ message: 'user created' })
            }
        })


    })



}
function returnUsers(req, res) {
    let sql = 'SELECT * FROM delilah_resto.users';

    connection.query(sql, function (err, users) {
        if (err) {
            res.send(err)
        } else {
            res.send(users)
        }
    })
}

module.exports = {
    createUser,
    returnUsers
};

