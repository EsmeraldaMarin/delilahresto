let connection = require('../connection');

function selectProducts(req, res) {
    let sql = 'SELECT * FROM delilah_resto.products';

    connection.query(sql, function (err, products) {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal error' });

        } else {
            res.send(products)
        }
    })
}

function insertProduct(req, res) {
    let newProduct = req.body
    let sql;
    let userRol = req.params.rol.is_admin

    if (userRol == 1) {

        sql = `INSERT INTO delilah_resto.products(product_name, price, stock, imgUrl, category)
        VALUES ('${newProduct.product_name}', ${newProduct.price}, ${newProduct.stock}, '${newProduct.imgUrl}', '${newProduct.category}');`;
        
    }else{
        res.status(403).json({message: "The user is not authorized to perform this operation"})
    }


    connection.query(sql, function (err, products) {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Asegurese de ingresar todos los datos del producto' });

        } else {
            res.status(201).json({ message: 'product created' })
        }
    })
}

function updateProduct(req, res) {

    let update = req.body;
    let productId = req.params.id;
    let sql;
    let userRol = req.params.rol.is_admin

    if (userRol == 1) {

        sql = `UPDATE delilah_Resto.products
        SET price = ${update.price},
        product_name = '${update.product_name}',
        stock = ${update.stock},
        imgUrl= '${update.imgUrl}',
        category = '${update.category}'
        WHERE id = ${productId}`
            
    }else{
        res.status(403).json({message: "The user is not authorized to perform this operation"})
    }

    connection.query(sql, function (err, product) {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Asegurese de ingresar todos los datos para actualizar' });

        } else {
            res.status(200).json({ message: 'product updated', product })
        }
    })

}

function deleteProduct(req, res) {

    let productId = req.params.id;
    let sql;
    let userRol = req.params.rol.is_admin

    if (userRol == 1) {

        sql = `DELETE FROM products WHERE id = ${productId}`        
    }else{
        res.status(403).json({message: "The user is not authorized to perform this operation"})
    }

    connection.query(sql, function (err, product) {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal Error' });

        } else {
            res.status(200).json({ message: 'product deleted', product })
        }
    })
}

module.exports = {
    selectProducts,
    insertProduct,
    updateProduct,
    deleteProduct
};
