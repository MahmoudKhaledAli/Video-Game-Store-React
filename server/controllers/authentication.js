const pool = require('../utils/sqlConnector.js');
const bcrypt = require('bcrypt');
const config = require('../config');
const jwt = require('jwt-simple');

const tokenForUser = username => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: username, iat: timestamp }, config.secret)
}

exports.signup = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const address = req.body.address;
  const banned = 0;
  const dateAdded = new Date();
  let connection;

  try {
    [hash, connection] = await Promise.all([await bcrypt.hash(password, 10), await pool.getConnection()]);

    await connection.query('START TRANSACTION');

    const existingUsers = await connection.query(
      "SELECT * FROM user WHERE email = ? OR username = ?",
      [email, username]
    );

    if (existingUsers.length) {
      res.status(422);
      if (existingUsers[0].email == email) {
        res.send('Email already registered');
      } else {
        res.send('Username already exists');
      }
    }

    await connection.query(
      "INSERT into user values (?, ?, ?, ?, ?, ?)",
      [username, hash, email, address, banned, dateAdded]
    );

    await connection.query('COMMIT');

    res.json({ token: tokenForUser(username), username: username, address: address });
  } catch (err) {
    await connection.query('ROLLBACK');
    next(err);
  } finally {
    connection.release();
    res.end();
  }
}

exports.fetchUserInfo = async (req, res) => {
  res.json({ token: tokenForUser(req.user.username), username: req.user.username, address: req.user.address });
  res.end();
}