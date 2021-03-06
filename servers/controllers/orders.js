let connection = require('../connection');

function getAllOrders(req, res) {


    let sql;
    let userRol = req.params.rol.is_admin
    let userId = req.params.rol.id

    if (userRol == 1) {

        sql = `SELECT * FROM orders_details
        INNER JOIN orders ON orders_details.order_id = orders.id
        INNER JOIN products ON orders_details.product_id = products.id
        INNER JOIN users ON orders.user_id = users.id`
    } else {
        sql = `SELECT * FROM orders_details 
        INNER JOIN orders ON orders_details.order_id = orders.id
        INNER JOIN products ON orders_details.product_id = products.id
        INNER JOIN users ON orders.user_id = users.id
        WHERE user_id = ${userId}`
    }
    connection.query(sql, (err, orders) => {
        if (err) {
            console.log(err)
            res.status(500).json({ message: 'Internal Error' })
        } else {
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
    let userId = req.params.rol.id

    let order = req.body;

    let sql = `INSERT INTO delilah_resto.orders(user_id, status, payment_method, update_time)
    VALUES (${userId}, 'new', '${order.payment_method}', '${orderTime}')`;

    connection.query(sql, (err, orders) => {
        if (err) {
            console.log(err)
            res.status(500).json({ message: 'Internal Error' })
        } else {
            order.details.forEach(element => {

                let orderDetail = `INSERT INTO delilah_resto.orders_details(order_id, product_id, quantity)
                VALUES (${orders.insertId}, ${element.product_id}, '${element.quantity}')`;

                connection.query(orderDetail, (err, order) => {
                    if (err) {
                        res.status(500).json({ message: 'Internal Error' })
                    }
                })
            });
            res.status(200).json({message: "Order created"})
        }
    })
}

function updateOrder(req, res) {
    let update = req.body;
    let orderId = req.params.id;

    let sql;
    let userRol = req.params.rol.is_admin

    if (userRol == 1) {

        sql = `UPDATE delilah_resto.orders
        SET status = '${update.status}'
        WHERE id = ${orderId}`
    }else{
        res.status(403).json({message: "The user is not authorized to perform this operation"})
        return
    }

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

    let sql;
    let userRol = req.params.rol.is_admin

    if (userRol == 1) {

        sql = `DELETE FROM orders WHERE id = ${orderId}`

    }else{
        res.status(403).json({message: "The user is not authorized to perform this operation"})
        return
    }
    //borrar una orden general

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