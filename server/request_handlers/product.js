const pool = require('../sqlConnector.js');

const productSearch = async (req, res) => {
  let connection;

  const platformQuery = `SELECT product.*, AVG(reviews.score) AS avg_score
  FROM product LEFT JOIN reviews ON product.idproduct = reviews.idproduct
  WHERE platform = ? AND name LIKE ? GROUP BY product.idproduct ORDER BY
  ${req.body.field} ${req.body.order}`;

  const platformQueryParameters = [req.body.platform, '%' + req.body.name + '%'];

  const query = `SELECT product.*, AVG(reviews.score) AS avg_score
  FROM product LEFT JOIN reviews ON product.idproduct = reviews.idproduct
  WHERE name LIKE ? GROUP BY product.idproduct ORDER BY
  ${req.body.field} ${req.body.order}`;

  const queryParameters = ['%' + req.query.name + '%'];

  try {
    connection = await pool.getConnection();
    let searchResults;

    if (req.body.platform == -1) {
      searchResults = connection.query(query, queryParameters);
    } else {
      searchResults = connection.query(platformQuery, platformQueryParameters);
    }

    res.send(JSON.stringify(searchResults));

  } catch (err) {
    console.log(err);
  } finally {
    connection.release();
    res.end();
  }
}

module.exports = {
  productSearch: productSearch
};
