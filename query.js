const queries = {
    setSearchPath: function(destination) {  // query for changing search_path
        return "SET search_path to \"" + destination + "\"";      // have extra quotation marks to keep case-sensitivity of destination 
    },

    showSearchPath: "SHOW search_path",    // query to show search_path 

    showTableData: function(tablename) {    // query for showing all data in table
        return "SELECT * from \"" + tablename + "\"";
    }
}

module.exports = queries;