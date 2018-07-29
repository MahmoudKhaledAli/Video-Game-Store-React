const pool = require('../utils/sqlConnector');
const _ = require('lodash')

exports.addToCart = async (req, res, next) => {
  let connection;

  try {
    connection = await pool.getConnection();

    await connection.query('START TRANSACTION');

    const product = (await connection.query(
      "SELECT * FROM product WHERE idproduct = ?",
      [req.body.idproduct]
    ))[0];

    const oldCartItem = (await connection.query(
      "SELECT quantity FROM cart WHERE username = ? AND idproduct = ?",
      [req.user.username, req.body.id]
    ));

    let oldQuantity = 0;

    if (oldCartItem.length) {
      oldQuantity = oldCartItem[0].quantity;
    }

    if (product.stock < req.body.quantity - oldQuantity) {
      throw ('NO');
    }

    await connection.query(
      "INSERT INTO cart (username, idproduct, quantity) values (?, ?, ?)\
       ON DUPLICATE KEY UPDATE quantity = ?",
      [req.user.username, req.body.idproduct, req.body.quantity, req.body.quantity]
    );

    await connection.query(
      "UPDATE product SET stock = stock - ? WHERE idproduct = ?",
      [req.body.quantity - oldQuantity, req.body.idproduct]
    );

    await connection.query('COMMIT');

    res.json({
      idproduct: req.body.idproduct,
      quantity: req.body.quantity,
      final_price: (100 - product.sale) * product.price * req.body.quantity / 100,
      product: { ...product, stock: product.stock - req.body.quantity + oldQuantity }
    });
  } catch (err) {
    await connection.query('ROLLBACK');
    next(err);
  } finally {
    connection.release();
    res.end();
  }
}

exports.fetchCart = async (req, res, next) => {
  let connection;

  try {
    connection = await pool.getConnection();

    let cartItems = await connection.query(
      "SELECT * FROM `games`.`cart` INNER JOIN\
       product On `games`.`cart`.idproduct = product.idproduct\
       WHERE username = ?",
      [req.user.username],
    );

    cartItems = cartItems.map(cartItem => {
      const { idproduct, name, price, stock, imgpath, platform, description, sales, sale } = cartItem;
      return {
        idproduct: cartItem.idproduct,
        quantity: cartItem.quantity,
        final_price: cartItem.total = (100 - cartItem.sale) * cartItem.price * cartItem.quantity / 100,
        product: { idproduct, name, price, stock, imgpath, platform, description, sales, sale }
      };
    });

    res.json(cartItems);
  } catch (err) {
    next(err);
  } finally {
    connection.release();
    res.end();
  }
}

exports.checkout = async (req, res, next) => {
  let connection;

  try {
    connection = await pool.getConnection();

    await connection.query('START TRANSACTION');

    const cartItems = await connection.query(
      "SELECT * FROM cart WHERE username = ?",
      [req.user.username]
    );

    const insertActions = cartItems.map(cartItem => connection.query(
      "INSERT INTO `games`.`order` (username, idproduct, quantity, status, datecreated, total) values (?,?,?,?,?,?)",
      [req.user.username, cartItem.idproduct, cartItem.quantity, 0, new Date(), req.body.total]
    ));

    const updateActions = cartItems.map(cartItem => connection.query(
      "UPDATE `games`.`product` SET sales = sales + ? WHERE idproduct = ?",
      [cartItem.quantity, cartItem.idproduct]
    ));

    const deleteAction = connection.query(
      "DELETE FROM cart WHERE username = ?",
      [req.user.username]
    );

    await Promise.all([...insertActions, ...updateActions, deleteAction]);

    await connection.query('COMMIT');

    res.json({ success: 'Order Placed' });
  } catch (err) {
    next(err);
  } finally {
    connection.release();
    res.end();
  }
}