const pool = require('../utils/sqlConnector.js');
const _ = require('lodash');

const resultsPerPage = 6;

exports.productSearch = async (req, res, next) => {
  let connection;
  console.log(req.body);
  

  const platformQuery = `SELECT COUNT(*) as count, product.*, AVG(review.score) AS avg_score
  FROM product LEFT JOIN review ON product.idproduct = review.idproduct
  WHERE platform = ? AND name LIKE ? GROUP BY product.idproduct ORDER BY
  ${req.body.field} ${req.body.order}
  LIMIT ? OFFSET ?`;

  const platformQueryParameters = [
    req.body.platform,
    '%' + req.body.name + '%',
    resultsPerPage,
    (req.body.pageNo) * resultsPerPage
  ];

  const query = `SELECT COUNT(*) as count, product.*, AVG(review.score) AS avg_score
  FROM product LEFT JOIN review ON product.idproduct = review.idproduct
  WHERE name LIKE ? GROUP BY product.idproduct ORDER BY
  ${req.body.field} ${req.body.order}
  LIMIT ? OFFSET ?`;

  const queryParameters = [
    '%' + req.body.name + '%',
    resultsPerPage,
    (req.body.pageNo) * resultsPerPage
  ];

  try {
    connection = await pool.getConnection();
    let searchResults;

    if (req.body.platform == -1) {
      searchResults = await connection.query(query, queryParameters);
    } else {
      searchResults = await connection.query(platformQuery, platformQueryParameters);
    }

    if (!searchResults.length) {
      return res.send('No results');
    }

    const response = {
      count: Math.ceil(searchResults[0].count / resultsPerPage),
      products: searchResults.map(result => _.omit(result, 'count'))
    }

    res.json(response);
  } catch (err) {
    next(err);
  } finally {
    connection.release();
    res.end();
  }
}

exports.fetchFeatured = async (req, res, next) => {
  let connection;

  try {
    connection = await pool.getConnection();

    const topSellersQuery = connection.query("SELECT * FROM product ORDER BY sales DESC LIMIT 4");
    const highestRatedQuery = connection.query("SELECT product.*, AVG(review.score) FROM product LEFT JOIN review ON product.idproduct = review.idproduct GROUP BY product.idproduct ORDER BY AVG(review.score) DESC LIMIT 4");

    const [topSellers, highestRated] = await Promise.all([topSellersQuery, highestRatedQuery]);

    res.json({ topSellers, highestRated });
  } catch (err) {
    next(err);
  } finally {
    connection.release();
    res.end();
  }
}

exports.fetchProduct = async (req, res, next) => {
  let connection;

  try {
    connection = await pool.getConnection();

    const productReviews = await connection.query(
      "SELECT product.*, review.* FROM product LEFT JOIN review ON product.idproduct = review.idproduct WHERE\
       product.idproduct = ?",
      [req.query.idproduct]);

    productReviews[0].avg_score = _.meanBy(productReviews, 'score');;

    res.json(productReviews);
  } catch (err) {
    next(err);
  } finally {
    connection.release();
    res.end();
  }
}