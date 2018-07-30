const pool = require('../utils/sqlConnector');
const _ = require('lodash');

exports.productsList = async (req, res, next) => {
  let connection;

  try {
    connection = await pool.getConnection();

    let products = await connection.query(
      `SELECT * FROM product
       WHERE name like ?
       ORDER BY ${req.query._sort ? req.query._sort.replace('id', 'idproduct') : 'idproduct'}
       ${req.query._order ? req.query._order : 'ASC'} ${req.query._end ? `LIMIT ${req.query._end - req.query._start}
       OFFSET ${req.query._start}` : ''};`,
      [`%${req.query._name ? req.query._name : ''}%`]
    );

    products = products.map(product => _.rename(product, 'idproduct', 'id'));

    const count = (await connection.query(
      `SELECT count(*) as count FROM product
       WHERE name like ?`,
      [`%${req.query._name ? req.query._name : ''}%`]
    ))[0].count;

    res.header('X-Total-Count', count);
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');

    res.json(products);
  } catch (err) {
    next(err);
  } finally {
    connection.release();
    res.end();
  }
}

exports.product = async (req, res, next) => {
  try {
    connection = await pool.getConnection();

    let product = (await connection.query(
      "SELECT * FROM product WHERE idproduct = ?",
      [req.params.id]
    ))[0];

    product = _.rename(product, 'idproduct', 'id');

    res.json(product);
  } catch (err) {
    next(err);
  } finally {
    connection.release();
    res.end();
  }
}

exports.addProduct = async (req, res, next) => {
  try {
    connection = await pool.getConnection();

    const result = await connection.query(
      "INSERT INTO product (name, price, stock, imgpath, platform, descripton, sales, sale) VALUES (?,?,?,?,?,?,?,?)",
      [req.body.name, req.body.price, req.body.stock, req.body.imgpath, req.body.platform, req.body.descripton, req.body.sales, req.body.sale]
    );

    res.json({ id: result.insertId });
  } catch (err) {
    next(err);
  } finally {
    connection.release();
    res.end();
  }
}

exports.updateProduct = async (req, res, next) => {
  try {
    connection = await pool.getConnection();

    await connection.query(
      "UPDATE product SET name = ?, price = ?, stock = ?, imgpath = ?, platform = ?, descripton = ?, sales = ?, sale = ?\
       WHERE idproduct = ?",
      [req.body.name, req.body.price, req.body.stock, req.body.imgpath, req.body.platform, req.body.descripton, req.body.sales, req.body.sale, req.params.id]
    );

    res.json({ id: req.params.id });
  } catch (err) {
    next(err);
  } finally {
    connection.release();
    res.end();
  }
}

exports.deleteProduct = async (req, res, next) => {
  try {
    connection = await pool.getConnection();

    await connection.query(
      "DELETE FROM product WHERE idproduct = ?",
      [req.params.id]
    );

    res.json({});
  } catch (err) {
    next(err);
  } finally {
    connection.release();
    res.end();
  }
}

exports.usersList = async (req, res, next) => {
  let connection;

  try {
    connection = await pool.getConnection();

    let users = await connection.query(
      `SELECT * FROM user
       WHERE username like ?
        ORDER BY ${ req.query._sort.replace('id', 'username')} ${req.query._order} LIMIT 10`,
      [`%${req.query._username ? req.query._username : ''}%`, -req.query._start + req.query._end]
    );

    users = users.map(user => _.omit(_.rename(user, 'username', 'id'), 'password'));

    const count = (await connection.query(
      "SELECT count(*) as count FROM user WHERE username like ?",
      [`%${req.query._username ? req.query._username : ''}%`]
    ))[0].count;

    res.header('X-Total-Count', count);
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');

    res.json(users);
  } catch (err) {
    next(err);
  } finally {
    connection.release();
    res.end();
  }
}

exports.user = async (req, res, next) => {
  try {
    connection = await pool.getConnection();

    let user = (await connection.query(
      "SELECT * FROM user WHERE username = ?",
      [req.params.id]
    ))[0];

    user = _.omit(_.rename(user, 'username', 'id'), 'password');

    res.json(user);
  } catch (err) {
    next(err);
  } finally {
    connection.release();
    res.end();
  }
}

exports.deleteUser = async (req, res, next) => {
  try {
    connection = await pool.getConnection();

    await connection.query(
      "DELETE FROM user WHERE username = ?",
      [req.params.id]
    );

    res.json({});
  } catch (err) {
    next(err);
  } finally {
    connection.release();
    res.end();
  }
}

exports.updateUser = async (req, res, next) => {
  try {
    connection = await pool.getConnection();

    await connection.query(
      "UPDATE user SET email = ?, address = ?, datecreated = ?\
       WHERE username = ?",
      [req.body.email, req.body.address, req.params.id]
    );

    res.json({ id: req.params.id });
  } catch (err) {
    next(err);
  } finally {
    connection.release();
    res.end();
  }
}

exports.couponsList = async (req, res, next) => {
  let connection;

  try {
    connection = await pool.getConnection();

    let coupons = await connection.query(
      `SELECT * FROM coupon
       WHERE idcoupon like ?
        ORDER BY ${ req.query._sort.replace('id', 'idcoupon')} ${req.query._order} LIMIT 10`,
      [`%${req.query._name ? req.query._name : ''}%`, -req.query._start + req.query._end]
    );



    coupons = coupons.map(coupon => _.rename(coupon, 'idcoupon', 'id'));

    const count = (await connection.query(
      "SELECT count(*) as count FROM coupon WHERE idcoupon like ?",
      [`%${req.query._name ? req.query._name : ''}%`]
    ))[0].count;

    res.header('X-Total-Count', count);
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');

    res.json(coupons);
  } catch (err) {
    next(err);
  } finally {
    connection.release();
    res.end();
  }
}

exports.coupon = async (req, res, next) => {
  try {
    connection = await pool.getConnection();

    let coupon = (await connection.query(
      "SELECT * FROM coupon WHERE idcoupon = ?",
      [req.params.id]
    ))[0];

    coupon = _.rename(coupon, 'idcoupon', 'id');

    res.json(coupon);
  } catch (err) {
    next(err);
  } finally {
    connection.release();
    res.end();
  }
}

exports.deleteCoupon = async (req, res, next) => {
  try {
    connection = await pool.getConnection();

    await connection.query(
      "DELETE FROM coupon WHERE idcoupon = ?",
      [req.params.id]
    );

    res.json({});
  } catch (err) {
    next(err);
  } finally {
    connection.release();
    res.end();
  }
}

exports.addCoupon = async (req, res, next) => {
  try {
    connection = await pool.getConnection();

    await connection.query(
      "INSERT INTO coupon (idcoupon, discount, amount)\
       VALUES (?,?,?)",
      [req.body.id, req.body.discount, req.body.amount]
    );

    res.json({ id: req.body.id });
  } catch (err) {
    next(err);
  } finally {
    connection.release();
    res.end();
  }
}

exports.updateCoupon = async (req, res, next) => {
  try {
    connection = await pool.getConnection();

    await connection.query(
      "UPDATE coupon SET discount = ?, amount = ?\
       WHERE idcoupon = ?",
      [req.body.discount, req.body.amount, req.params.id]
    );

    res.json({ id: req.params.id });
  } catch (err) {
    next(err);
  } finally {
    connection.release();
    res.end();
  }
}

exports.reviewsList = async (req, res, next) => {
  let connection;

  try {
    connection = await pool.getConnection();

    if (req.query._sort == 'id') {
      req.query._sort = 'username';
    }

    let reviews = await connection.query(
      `SELECT * FROM review
       WHERE username like ?
        ORDER BY ${ req.query._sort} ${req.query._order} LIMIT 10`,
      [`%${req.query._username ? req.query._username : ''}%`, -req.query._start + req.query._end]
    );

    reviews = reviews.map(review => ({ ...review, id: `${review.username},${review.idproduct}` }));

    const count = (await connection.query(
      "SELECT count(*) as count FROM review WHERE username like ?",
      [`%${req.query._username ? req.query._username : ''}%`]
    ))[0].count;


    res.header('X-Total-Count', count);
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');

    res.json(reviews);
  } catch (err) {
    next(err);
  } finally {
    connection.release();
    res.end();
  }
}

exports.review = async (req, res, next) => {
  try {
    connection = await pool.getConnection();

    const [username, idproduct] = req.params.id.split(/,(?=[^,]+$)/);

    const review = (await connection.query(
      "SELECT * FROM review\
       WHERE username = ? AND idproduct = ?",
      [username, idproduct]
    ))[0];

    res.json({ ...review, id: req.params.id });
  } catch (err) {
    next(err);
  } finally {
    connection.release();
    res.end();
  }
}

exports.deleteReview = async (req, res, next) => {
  try {
    connection = await pool.getConnection();

    const [username, idproduct] = req.params.id.split(/,(?=[^,]+$)/);

    await connection.query(
      "DELETE FROM review WHERE username = ? AND idproduct = ?",
      [username, idproduct]
    );

    res.json({});
  } catch (err) {
    next(err);
  } finally {
    connection.release();
    res.end();
  }
}