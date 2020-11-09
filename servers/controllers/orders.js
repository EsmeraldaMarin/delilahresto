let connection = require('../connection');

function getAllOrders(req, res) {
    let sql = `SELECT * FROM orders_details
    INNER JOIN orders ON orders_details.order_id = orders.id
    INNER JOIN products ON orders_details.product_id = products.id
    INNER JOIN users ON orders.user_id = users.id
    `
    connection.query(sql, (err, orders) => {
        if (err) {
            console.log(err)
            res.status(500).json({ message: 'Internal Error' })
        } else {
            console.log("hola")
            res.send(orders)
        }
    })
}

function newOrder(req, res) {

    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
    let d = new Date();
    let h = addZero(d.getHours());
    let m = addZero(d.getMinutes());
    let orderTime = h + ":" + m;

    let order = req.body;

    let sql = `INSERT INTO delilah_resto.orders(user_id, status, paymentMethod, updateTime)
    VALUES (${order.user_id}, 'new', '${order.paymentMethod}', '${orderTime}')`;

    connection.query(sql, (err, orders) => {
        if (err) {
            console.log(err)
            res.status(500).json({ message: 'Internal Error' })
        } else {
            order.details.forEach(element => {

                let orderDetail = `INSERT INTO delilah_resto.orders_details(order_id, product_id, quantity)
                VALUES (${orders.insertId}, ${element.product_id}, '${element.quantity}')`;

                connection.query(orderDetail, (err, order)=>{
                    if(err){
                        res.status(500).json({ message: 'Internal Error' })
                    }
                })
            });
            res.send(orders)
        }
    })
}

function updateOrder(req, res) {
    let update = req.body;
    let orderId = req.params.id;

    let sql = `UPDATE delilah_resto.orders
    SET status = '${update.status}'
    WHERE id = ${orderId}`

    connection.query(sql, (err, order) => {
        if (err) {
            console.log(err)
            res.status(500).json({ message: 'Internal Error' })
        } else {
            res.status(200).json({ message: 'Order status updated', order })
        }
    })

}

function deleteOrder(req, res) {
    let orderId = req.params.id;

    //borrar una orden general
    let sql = `DELETE FROM orders WHERE id = ${orderId}`

    connection.query(sql, function (err, order) {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal Error' });

        } else {

            //borrar todo el detalle de la orden
            let sqlOrderDetails = `DELETE FROM orders_details WHERE orders_details.order_id = ${orderId}`
            connection.query(sqlOrderDetails, function (err, newOrder) {
                if (err) {
                    console.log(err)
                }
            })

            res.status(200).json({ message: 'order deleted', order })
        }
    })
}

module.exports = {
    getAllOrders,
    newOrder,
    updateOrder,
    deleteOrder
}