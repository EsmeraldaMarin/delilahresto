# notas
Authorization: Bearer <token>
 libreria bcrypt encripta pero no desencripta

# Ultimas cosas hechas

* create user, validate email and username

# REESTABLECER

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

    
{
    "username":"Elisa123",
    "fullname":"Elisa Rosales",
    "email":"eli@gmail.com",
    "phone":"353121615",
    "address":"sarmiento 123",
    "password":"token",
    "is_admin": true
}

## Product Object

{
    product_name = bistec,
    price = 50.00,
    stock = false,
    imgUrl = https://otrourl.com,
    category = meats
}

## Order Object

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
    "user_id": 1
}






