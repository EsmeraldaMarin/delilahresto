# notas
Authorization: Bearer <token>
libreria bcrypt encripta pero no desencripta



# Ultimas cosas hechas

* correcciones de login, borrado de carpetas

# Hacer

* Pasar los middlewares a todas las rutas

## TABLA PRODUCTS

* price (aumentar el numero de caracteres)
* cambiar todo de imgUrl a img_url

# DUDAS

/pedido/:id
localhost:3000/pedido/1
app.get(‘/pedido/:id’, ...
function(req, res) {
req.params.id

http://expressjs.com/en/guide/routing.html
Route parameters

## User Object

* sign in

{
    "username":"Elisa123",
    "fullname":"Elisa Rosales",
    "email":"eli@gmail.com",
    "phone":"353121615",
    "address":"sarmiento 123",
    "password":"token",
    "is_admin": true
}

* login

{
    "username": "Alan",
    "password": "alan123"
}

token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFsYW4iLCJwYXNzd29yZCI6ImFsYW4xMjMiLCJpYXQiOjE2MDQ4OTQ5ODB9.N33mv9NYVwOaNAILp81YeLZx3jg6Vg0TfI5VdFiDeRA"
    
{
    "username": "Mari123",
    "password": "123"
}
token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1hcmkxMjMiLCJwYXNzd29yZCI6IjEyMyIsImlhdCI6MTYwNTU4NDU2M30.OjLVKjrsqmfCgZs3_wq3nFrC-NL9oxYUoQBvfjyhMB4"

## Product Object

* create and update a  product

{
    "product_name" : "bistec",
    "price" : 50.00,
    "stock" : false,
    "imgUrl" : "https://otrourl.com",
    "category" : "meats"
}


## Order Object

* create an order

{
    "details": [
        {
            "product_id": 1,
            "quantity": 1
        },{
                "product_id": 2,
            "quantity": 3 
        }
    ],
    "paymentMethod": "tarjeta",
}

* update order

{
    "status": "cancelled"
}






