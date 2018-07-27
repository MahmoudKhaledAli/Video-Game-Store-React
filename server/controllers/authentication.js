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

    const existingUsers = await connection.query(
      "SELECT * FROM user WHERE email = ? OR username = ?",
      [email, username]
    );

    if (existingUsers.length) {
      res.status(422);
      return next(new Error('Email or username already registered'));
    }

    await connection.query(
      "Insert into user values (?, ?, ?, ?, ?, ?)",
      [username, hash, email, address, banned, dateAdded]
    );

    res.json({ token: tokenForUser(username) });
  } catch (err) {
    next(err);
  } finally {
    connection.release();
    res.end();
  }
}

exports.signin = async (req, res, next) => {
  res.send({ token: tokenForUser(req.username) });
}