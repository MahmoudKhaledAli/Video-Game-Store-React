const pool = require('../utils/sqlConnector');

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

    res.json({ address: req.body });
  } catch (err) {
    next(err);
  } finally {
    connection.release();
    res.end();
  }
}