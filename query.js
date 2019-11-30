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
    let data;
    pool.query("SELECT * from \"MarriottCustomers2\"", (error, results) => {
        if (error) {
            throw error;
        }
        decryptedData = decryptResponse(results.rows);
        //response.status(200).json(results.rows);
        decryptedData.then(data => {
            response.status(200).json(data);
        })
    })
}

async function decryptResponse(dataList) {
    let revisedDataList = dataList;
    for (let i = 0; i < dataList.length; i++) {
        const row = dataList[i];
        const firstName = await decrypt(row.FirstName); 
        const middleName = await decrypt(row.MiddleName);
        const lastName = await decrypt(row.LastName);
        const address = await decrypt(row.StreetAddress);
        const city = await decrypt(row.City);
        const state = await decrypt(row.State);
        const zipcode = await decrypt(row.ZipCode);
        const birthdate = await decrypt(row.Birthdate);
        const member = await decrypt(row.Member);
        const homenumber = await decrypt(row.HomePhoneNumber);
        const cellnumber = await decrypt(row.CellNumber);
        const passportnumber = await decrypt(row.PassportNumber);
        const creditcardnumber = await decrypt(row.CreditCardNumber);
        revisedDataList[i].FirstName = firstName;
        revisedDataList[i].MiddleName = middleName;
        revisedDataList[i].LastName = lastName;
        revisedDataList[i].StreetAddress = address;
        revisedDataList[i].City = city;
        revisedDataList[i].State = state;
        revisedDataList[i].ZipCode = zipcode;
        revisedDataList[i].Birthdate = birthdate;
        revisedDataList[i].Member = member;
        revisedDataList[i].HomePhoneNumber = homenumber;
        revisedDataList[i].CellNumber = cellnumber;
        revisedDataList[i].PassportNumber = passportnumber;
        revisedDataList[i].CreditCardNumber = creditcardnumber;
    }
    return revisedDataList;
}

async function decrypt(data) {
    decryptedText = await pool.query("SELECT convert_from(decrypt(\'" + data + "\', \'" + process.env.KEY + "\', \'aes\'), \'SQL_ASCII\');");
    return decryptedText.rows[0].convert_from;
}

module.exports = {
    showSearchPath,
    changeSearchPath,
    getAll
};