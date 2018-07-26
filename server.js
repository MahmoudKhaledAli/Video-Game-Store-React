const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./backend/router');
const port = process.env.PORT || 8080;
const app = express();

app.use(express.static(__dirname + '\\frontend\\build\\'));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

router.route(app);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '\\frontend\\build\\', 'index.html'));
});

app.listen(port);
console.log('Server started');