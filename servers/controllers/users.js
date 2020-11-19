let connection = require('../connection');
let jwt = require('jsonwebtoken');

let firma = "Acamica 2020";

function createUser(req, res) {

    let user = req.body;
    let token = jwt.sign(user.password, firma);
    let validator = 'SELECT email, username FROM delilah_resto.users'

    connection.query(validator, function (err, info) {

        let resultEmail = info.find(elem => elem.email === user.email)
        let resultUsername = info.find(elem => elem.username === user.username)

        if (resultEmail || resultUsername) {

            res.status(409).json({ message: 'This user already exists' })
            return
        }

        let sql = `INSERT INTO delilah_resto.users(username, fullname, email, phone, address, password, is_admin)
        VALUES ('${user.username}', '${user.fullname}', '${user.email}', '${user.phone}', '${user.address}', '${token}', ${user.is_admin});`;

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

function logIn(req, res) {

    let user = req.body
    let token = jwt.sign(user.password, firma);
    let sql = `SELECT password FROM delilah_resto.users WHERE users.password = '${token}' AND users.username = '${user.username}'`
   
    connection.query(sql, function (err, passwords) {

        if (err || passwords.length == 0) {
            res.status(500).json({message: "This user doesn't exist or the password is wrong"})
            return
        } else {

            let userLogged = jwt.sign(user, firma)
            
            res.json({
                'mensaje': 'Usuario autenticado correctamente',
                'jwt': userLogged
            })
        }
    })

}

function returnUsers(req, res) {
    let sql;
    let userRol = req.params.rol.is_admin
    let userId = req.params.rol.id

    if (userRol == 1) {

        console.log(`You are an admin`)
        sql = 'SELECT * FROM delilah_resto.users'
    } else {
        console.log(`You are a regular user`)
        sql = `SELECT * FROM delilah_resto.users WHERE id = ${userId}`
    }


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
    returnUsers,
    logIn
};



