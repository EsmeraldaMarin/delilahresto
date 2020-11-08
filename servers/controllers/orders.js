const { query } = require('../connection');
var connection = require('../connection');

function getAllOrders(req, res) {
    let sql = `SELECT * FROM orders_details
    INNER JOIN orders ON orders_details.order_id = orders.id
    INNER JOIN products ON orders_details.product_id = products.id
    INNER JOIN users ON orders.user_id = users.id
    `
    console.log(sql)
    //SELECT * FROM tabla1 INNER JOIN tabla2 WHERE tabla1.columna1 = tabla2.columna1

    connection.query(sql, (err, orders) => {
        if (err) {
            console.log(err)
            res.status(500).json({ message: 'Internal Error' })
        } else {
            res.send(orders)
        }
    })
}
module.exports = {
    getAllOrders
}