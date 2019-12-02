const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors'); // for cross-origin-resource-sharing
const db = require('./query.js');  // contains Postgres queries and decryption functions
require('dotenv').config();     // configures dotenv so we can use process.env for environment variables

const app = express();
const port = 8080;

//start node.js app
app.use(cors());
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/all', db.getAll);

app.listen(port, () => {
  console.log("Marriott App listening on port " + port);
});