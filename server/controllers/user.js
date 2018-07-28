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