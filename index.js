let express = require('express');
let bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let cors = require('cors');


const {returnUsers, createUser, logIn} = require('./servers/controllers/users');
const {selectProducts, insertProduct, updateProduct, deleteProduct} = require('./servers/controllers/products');
const {getAllOrders,newOrder, updateOrder, deleteOrder}= require('./servers/controllers/orders')
const {defineRol, validateRol} = require('./servers/middlewares/autorizacion')

let app = express();

app.use(cors())

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())

//Login

app.post('/login', logIn)

//Users Routes

app.get('/users', defineRol, returnUsers);
app.post('/users', createUser)


//Orders Routes

app.get('/orders',defineRol, validateRol, getAllOrders)
app.post('/orders', defineRol, newOrder)
app.put('/orders/:id', defineRol, updateOrder)
app.delete('/orders/:id', defineRol, deleteOrder)

//Products Rutes

app.get('/products', selectProducts);
app.post('/products', defineRol, insertProduct);
app.put('/products/:id', defineRol, updateProduct);
app.delete('/products/:id', defineRol, deleteProduct);

app.listen(3000, function () {
    console.log("El servidor esta corriendo en el puerto 3000")
})


