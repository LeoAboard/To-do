var mysql = require('mysql2')

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678'
})

con.connect(function(err){
    if(err) throw err
    console.log('Banco conectado')
})

con.query('use todo_database', function(err){
    if(err) throw err
    console.log('Conectado a todo_database')
})

module.exports = con