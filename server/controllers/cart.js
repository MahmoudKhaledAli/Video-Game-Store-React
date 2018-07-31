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
      [req.user.username, req.body.idproduct]
    ));

    let oldQuantity = 0;

    if (oldCartItem.length) {
      oldQuantity = oldCartItem[0].quantity;
    }

    if (product.stock < req.body.quantity - oldQuantity) {
      res.status(422);
      return res.send('Not enough items in stock');
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

    const total = _.sumBy(cartItems, 'final_price');

    res.json({ cartItems, total });
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

    let idorder = (await connection.query("SELECT MAX(idorder) as idorder FROM `games`.`order`"))[0].idorder;

    if (!idorder) {
      idorder = 1;
    }

    const cartItemsAction = connection.query(
      "SELECT * FROM cart WHERE username = ?",
      [req.user.username]
    );


    const selectActions = [cartItemsAction];

    if (req.body.coupon !== '') {
      selectActions.push(connection.query(
        "SELECT * FROM coupon WHERE idcoupon = ? and amount > 0",
        [req.body.coupon]
      ));
    }

    const [cartItems, coupon] = await Promise.all(selectActions);

    if (req.body.coupon !== '' && !coupon.length) {
      res.status(422)
      return res.send('Coupon does not exist');
    }

    const insertActions = cartItems.map(cartItem => connection.query(
      "INSERT INTO `games`.`order` (idorder ,username, idproduct, quantity, status, datecreated, total) values (?,?,?,?,?,?,?)",
      [idorder + 1, req.user.username, cartItem.idproduct, cartItem.quantity, 0, new Date(), coupon ? req.body.total * (100 - coupon[0].discount) / 100 : req.body.total]
    ));

    const updateActions = cartItems.map(cartItem => connection.query(
      "UPDATE `games`.`product` SET sales = sales + ? WHERE idproduct = ?",
      [cartItem.quantity, cartItem.idproduct]
    ));

    const deleteAction = connection.query(
      "DELETE FROM cart WHERE username = ?",
      [req.user.username]
    );

    let actions = [...insertActions, ...updateActions, deleteAction];

    if (coupon) {
      actions.push(connection.query(
        "UPDATE coupon SET amount = amount - 1 WHERE idcoupon = ?",
        [req.body.coupon]
      ));
    }

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

exports.deleteCartItem = async (req, res, next) => {
  let connection;

  try {
    connection = await pool.getConnection();

    await connection.query('START TRANSACTION');

    const cartItem = (await connection.query(
      "SELECT * FROM cart INNER JOIN product ON cart.idproduct = product.idproduct WHERE cart.idproduct = ? AND username = ?",
      [req.body.idproduct, req.user.username]
    ))[0];

    const deleteAction = connection.query(
      "DELETE FROM cart WHERE idproduct = ? AND username = ?",
      [req.body.idproduct, req.user.username]
    );

    const updateAction = connection.query(
      "UPDATE product SET stock = stock + ? WHERE idproduct = ?",
      [cartItem.quantity, req.body.idproduct]
    );

    await Promise.all([deleteAction, updateAction]);

    await connection.query('COMMIT');

    res.json({ idproduct: cartItem.idproduct, final_price: (100 - cartItem.sale) * cartItem.price * cartItem.quantity / 100 });
  } catch (err) {
    next(err);
  } finally {
    connection.release();
    res.end();
  }
}