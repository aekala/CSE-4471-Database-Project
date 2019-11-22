const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const queries = require('./query.js');  // contains Postgres queries
require('dotenv').config();     // configures dotenv so we can use process.env for environment variables

//connect to postgres DB
const {Pool, Client} = require('pg');
const pool = new Pool({     // use environment variables to programatically connect to DB and protect connection data
    user: process.env.PGUSERNAME,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
});

async function callQueries() {  
    try {
        const setQueryResponse = await pool.query(queries.setSearchPath("MarriottSchema"));     // need to set search_path to MarriottSchema before calling to DB table
        const getDataResponse = await pool.query(queries.showTableData("MarriottCustomer"));
        console.log(getDataResponse);
    } catch (err) {
        console.log(err);
    }
}

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  callQueries();
  console.log(`Server running at http://${hostname}:${port}/`);
});