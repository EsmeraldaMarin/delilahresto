var connection = require('../connection');

function selectProducts(req, res){
    var sql = 'SELECT * FROM delilah_resto.products';

    connection.query(sql, function (err, products) {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal error' });      

        } else {
            console.log(products)
            res.send(products)

        }
    })
}

function insertProducts(req, res){
    let newProduct = req.body
    console.log(newProduct)
    let sql = `INSERT INTO delilah_resto.products(product_name, price, stock, imgUrl, category)
    VALUES ('${newProduct.product_name}', ${newProduct.price}, ${newProduct.stock}, '${newProduct.imgUrl}', '${newProduct.category}');`;
    console.log(sql)
    
    connection.query(sql, function (err, products){
        if(err){
            console.log(err)
            res.status(500).json({ error: 'Asegurese de ingresar todos los datos del producto' });      
        
        }else{
            res.status(201).json({message: 'product created'})
        }
    })
}
module.exports = {
    selectProducts,
    insertProducts
}; 
