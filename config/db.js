const mysql=require('mysql2/promise')

const mysqlPool=mysql.createPool({
    host:'localhost',
    user:'root', 
    password:'root',
    database:'student_db'
})

mysqlPool.query("SELECT 1")
.then(data =>console.log("db is connected successfully"))
.catch(err=>console.log("db is connected failed  .\n +err"))

module.exports = mysqlPool