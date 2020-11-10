let connection = require('../connection');
let jwt = require('jsonwebtoken');
let firma = "Acamica 2020";


let validateToken = (token) => {

    try {
        const decoded = jwt.verify(token, firma)
        return decoded
    } catch {
        return false
    }
}

let defineRol = (req, res, next) => {

    //pasar el token por headers, crear uno con nombre 'token' y pasarle el token en values
    const token = req.headers['token']
    let decodedUser = validateToken(token)

    if (decodedUser) {
        req.params.user = decodedUser
        next()
    } else {
        res.json({ mensaje: 'Invalid or not provided Token' });
    }

}

let validateRol = (req, res, next) => {

    let info = req.params.user
    let sql = `SELECT is_admin, id FROM delilah_Resto.users WHERE users.username = '${info.username}'`

    connection.query(sql, (err, rol) => {

        if (err) {
            console.log(err)
        } else {
            req.params.rol = rol[0]
            next()
        }
    })
}

module.exports = {
    defineRol,
    validateRol
}