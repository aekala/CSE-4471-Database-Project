require('dotenv').config();     // configures dotenv so we can use process.env for environment variables
// const queries = {
//     setSearchPath: function(destination) {  // query for changing search_path
//         return "SET search_path to \"" + destination + "\"";      // have extra quotation marks to keep case-sensitivity of destination 
//     },

//     showSearchPath: "SHOW search_path",    // query to show search_path 

//     showTableData: function(tablename) {    // query for showing all data in table
//         return "SELECT * from \"" + tablename + "\"";
//     }
// }

//connect to postgres DB
const {Pool, Client} = require('pg');
const pool = new Pool({     // use environment variables to programatically connect to DB and protect connection data
    user: process.env.PGUSERNAME,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
});

const showSearchPath = (request, response) => {
    pool.query("SHOW search_path", (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
}

const changeSearchPath = (request, response) => {
    pool.query("SET search_path to \"MarriottSchema\"", (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
}

const getAll = (request, response) => {
    console.log("HEYYYYYYYYYY");
    pool.query("SELECT * from \"MarriottCustomer\"", (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    })
}

module.exports = {
    showSearchPath,
    changeSearchPath,
    getAll
};