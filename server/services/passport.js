const pool = require('../utils/sqlConnector');
const passport = require('passport');
const config = require('../config');
const bcrypt = require('bcrypt');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;

const localLogin = new LocalStrategy({}, (username, password, done) => {
  let connection;
  pool.getConnection().then(conn => {
    connection = conn;
    return connection.query(
      "SELECT * FROM user WHERE username = ?",
      [username]
    );
  }).then(rows => {
    const user = rows[0];
    if (user) {
      return bcrypt.compare(password, user.password.toString());
    } else {
      return Promise.reject('no_user');
    }
  }).then(isMatch => {
    if (isMatch) {
      done(null, username);
    } else {
      done(null, false, { message: 'Wrong password.' });
    }
  }).catch(err => {
    if (err == 'no_user') {
      done(null, false, { message: 'Username does not exist.' });
    } else {
      done(err, false);
    }
  }).finally(() => {
    connection.release();
  });
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  let connection;
  pool.getConnection().then(conn => {
    connection = conn;
    return connection.query(
      "SELECT * FROM user WHERE username = ?",
      payload.sub
    );
  }).then(rows => {
    if (rows.length) {
      done(null, rows[0]);
    } else {
      done(null, false);
    }
  }).catch(err => {
    done(err, false);
  }).finally(() => {
    connection.release();
  });
});

passport.use(jwtLogin);
passport.use(localLogin);