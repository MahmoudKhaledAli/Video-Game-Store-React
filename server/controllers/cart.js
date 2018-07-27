const pool = require('../utils/sqlConnector');

exports.addToCart = async (req, res, next) => {
  let connection;

  try {
    connection = await pool.getConnection();
    const product = await connection.query(
      "SELECT * FROM product WHERE idproduct = ?",
      [req.body.id]
    );

    if (product[0].stock < req.body.quantity) {
      throw ('NO');
    }

    await connection.query(
      "INSERT INTO cart (username, idproduct, quantity) values (?, ?, ?)\
       ON DUPLICATE KEY UPDATE quantity = quantity + ?",
      [req.body.username, req.body.id, req.body.quantity, req.body.quantity]
    );

    await connection.query(
      "UPDATE product SET stock = stock - ? WHERE idproduct = ?",
      [req.body.quantity, req.body.id]
    );

    res.json({
      idproduct: req.body.id,
      quantity: req.body.quantity,
      final_price: (100 - product.sale) * product.price * req.body.quantity / 100,
      product: product
    });
  } catch (err) {
    next(err);
  } finally {
    connection.release();
    res.end()
  }
};

exports.fetchCart = async (req, res, next) => {
  let connection;

  try {
    connection = await pool.getConnection();
    let cartItems = await connection.query(
      "SELECT * FROM `games`.`cart` INNER JOIN product On `games`.`cart`.idproduct = product.idproduct\
       WHERE username = ?",
      [req.body.username],
    );

    cartItems = cartItems.map(cartItem => {
      return {
        idproduct: cartItem.idproduct,
        quantity: cartItem.quantity,
        final_price: cartItem.total = (100 - cartItem.sale) * cartItem.price * cartItem.quantity / 100
      };
    });

    res.json(cartItems);
  } catch (err) {
    next(err);
  } finally {
    connection.release()
    res.end()
  }
}