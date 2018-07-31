const pool = require('../utils/sqlConnector');
const _ = require('lodash');
const helpers = require('../utils/helpers');

exports.updateAddress = async (req, res, next) => {
  let connection;

  try {
    connection = await pool.getConnection();

    await connection.query(
      "UPDATE user SET address = ? WHERE username = ?",
      [req.body.address, req.user.username]
    );

    res.json({ address: req.body.address });
  } catch (err) {
    next(err);
  } finally {
    connection.release();
    res.end();
  }
}

exports.addReview = async (req, res, next) => {
  let connection;

  try {
    connection = await pool.getConnection();

    await connection.query(
      "INSERT INTO review (username, idproduct, score, comment) VALUES (?, ?, ?, ?)",
      [req.user.username, req.body.idproduct, req.body.score, req.body.comment]
    );

    res.json({ ...req.body, username: req.user.username });
  } catch (err) {
    next(err);
  } finally {
    connection.release();
    res.end();
  }
}

exports.getOrders = async (req, res, next) => {
  let connection;

  try {
    connection = await pool.getConnection();

    let orders = await connection.query(
      "SELECT * FROM `games`.`order` INNER JOIN product On `games`.`order`.idproduct = product.idproduct WHERE username = ? ORDER BY datecreated DESC, idorder",
      [req.user.username]
    );

    orders = helpers.convertOrders(orders);

    res.json({ orders });
  } catch (err) {
    next(err);
  } finally {
    connection.release();
    res.end();
  }
}

exports.deleteOrder = async (req, res, next) => {
  let connection;

  try {
    connection = await pool.getConnection();

    const username = (await connection.query(
      "SELECT username FROM `games`.`order` WHERE idorder = ?",
      [req.body.idorder]
    ))[0].username;

    if (username != req.user.username) {
      res.status(404);
      return res.send('Not found');
    }

    await connection.query(
      "DELETE FROM `games`.`order` WHERE idorder = ?",
      [req.body.idorder]
    );

    res.json(req.body);
  } catch (err) {
    next(err);
  } finally {
    connection.release();
    res.end();
  }
}