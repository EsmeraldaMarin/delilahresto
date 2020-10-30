let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');


var returnUsers = require('./servers/controllers/users')

let app = express();

app.use(cors())

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())

//generamos una ruta que acepta un mensaje de tipo Get

app.get('/users', returnUsers)

//Corremos nuestro servidor en el puerto 3000

app.listen(3000, function () {
    console.log("El servidor esta corriendo en el puerto 3000")
})


