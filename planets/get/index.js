const vandium = require('vandium');
const mysql  = require('mysql');

exports.handler = vandium.generic()
  .handler( (event, context, callback) => {

    var connection = mysql.createConnection({
    host     : process.env.host,
    user     : process.env.user,
    password : process.env.password,
    database : process.env.database
    });
    
    var search = 0;
    if(event.search){
      search = event.search;
    }    
    
    var tags = 0;
    if(event.tags){
      tags = event.tags;
    }   
    
    var role = 0;
    if(event.role){
      role = event.role;
    }       
    
    var page = 0;
    if(event.page){
      page = event.page;
    }
    
    var limit = 5;
    if(event.limit){
      limit = event.limit;
    }   
    if(limit > 25){
      limit = 25;
    }

    var sql = "SELECT * FROM planets p WHERE identifier IS NOT NULL";
    if(search != ''){
       sql += " AND b.name LIKE '%" + search + "%'";
    }
    sql += " ORDER BY name";
    sql += " LIMIT " + event.page + "," + event.limit;
    connection.query(sql, function (error, results, fields) {

    callback( null, results );

  });
});