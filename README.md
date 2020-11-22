# DELILAH RESTO
Backend Proyect

### Technologies used in this project

- nodeJS
- Express
- Cors
- JWT (JSON Web Tokens)
- Nodemon
- mySQL
- Swagger (for API documentation)
- Git (for version control)
- Postman

## Getting Started 🚀

In this README.md you will find the specifications to install, initialize and use this API

### API Documentation 📋

To see the API documentation, import the following file into [OpenApi](https://swagger.io/): 

swagger/spec.yaml

***

### Installation ⚙️

- Clone this repository:
    https://github.com/EsmeraldaMarin/delilahresto.git
- Install the dependencies

    _Use_
    ```
    npm install
    ```
     _or_
    ```
    npm i
    ```

    Dependencies:
    ```
    {
        "cors": "^2.8.5",
        "express": "^4.17.1",
        "jsonwebtoken": "^8.5.1",
        "mysql2": "^2.2.5",
        "nodemon": "^2.0.6"
    }
    ```
- Create and structure the databases

    - To create the database open a new query in MySql and run the code in the file: database/sql/create_database.sql

    - To create the tables open a new query in MySql and run the code in the file: database/sql/create_tables.sql

---

### Initialization ⚙️
- Initialize the server

    _Using nodemon:_
    ```
    nodemon index.js
    ```
- If everything is OK you will receive this message: 

    _"El servidor está corriendo en el puerto 3000"_

---

### Use the API 🚀

_Use Postman (recommended) or similar to perform CRUD operations (get, post, put, delete) on the API._

#### >> Endpoints

- USERS (http://localhost:3000/users)

    - POST 

    To create a new user you have to follow this example and fill it with the information you want.

    ```
    {
        "username":"Alan",
        "fullname":"Alan Caseros",
        "email":"alann@gmail.com",
        "phone":"3531258745",
        "address":"Saavedra 123",
        "password":"alan123",
        "is_admin": true
    }
    ```
    - GET
    
    Note: before performing this operation you must be logged in

    Description: If you have an administrator role, you can access all the data of all users, but if you have a regular user role, you can only access your data. 
    
- LOGIN (http://localhost:3000/login)

    - POST

    To login you have to enter your username and password, as in the following example

    ```
    {
        "username": "Alan",
        "password": "alan123"
    }
    ```

    If everything goes well, you will receive a token that will be necessary to carry out all operations with users, orders and products. Example: 

    ```
    {
        "mensaje": "Usuario autenticado correctamente",
        "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFsYW4iLCJwYXNzd29yZCI6ImFsYW4xMjMiLCJpYXQiOjE2MDU5ODU0NTR9.LvSYpuUwl8t7qMSw1nly1TiauJEvY5hgcyrIKpRBydc"
    }
    ```

    After logging in, you must place the token provided in the authorization section in Postman to continue and have access (or not) to manipulate the API data.

- ORDERS (http://localhost:3000/orders)

    - GET 

    Note: If you are an administrator, you will receive the details of all the orders, if you are a regular user, you will receive the information of your orders

    - POST

    To place an order, you must follow the following example, completing it with the data you want

    ```
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
        "payment_method": "tarjeta"
    }
    ```
    
    - PUT (http://localhost:3000/orders/:id)

    To update the status of an order, you must have the administrator role

    ```
    {
        "status": "cancelled"
    }
    ```

    - DELETE (http://localhost:3000/orders/:id)

    To delete an order, you must have the administrator role


- PRODUCTS (http://localhost:3000/products)

    - GET 

    Any user can see all available products

    - POST
    
    To POST a product, you must have the administrator role

    ```
    {
        "product_name" : "bistec",
        "price" : 50.00,
        "stock" : false,
        "img_url" : "https://otrourl.com",
        "category" : "meats"
    }
    ```

    - PUT (http://localhost:3000/products/:id)
    
    To update a product, you must have the administrator role

    ```
    {
        "product_name" : "bistec",
        "price" : 50.00,
        "stock" : false,
        "img_url" : "https://otrourl.com",
        "category" : "meats"
    }
    ```

    - DELETE (http://localhost:3000/products/:id)
    
    To delete a product, you must have the administrator role
