let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');


const {returnUsers, createUser} = require('./servers/controllers/users');
const {selectProducts, insertProducts} = require('./servers/controllers/products');

let app = express();

app.use(cors())

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())

app.get('/users', returnUsers);
app.post('/users', createUser)

//cuando se genera un nuevo usuario tengo que generar un token 
//para cuando un usuario quiera modificar un producto o hacer una orden
//tengo que usar el token para saber si esa persona es admin o no
//si no es admin no puede modificar los productos ni los estados de la orden


app.get('/products', selectProducts);
app.post('/products', insertProducts)



app.listen(3000, function () {
    console.log("El servidor esta corriendo en el puerto 3000")
})


