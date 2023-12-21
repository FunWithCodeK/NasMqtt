var mysql      = require('mysql2');
var connection = mysql.createConnection({
  host     : 'localhost',
  port     : "3306",   
  user     : 'root',
  password : 'Jeresfarm1*',
  database : 'farmdb'
});
 
connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
 
connection.end();