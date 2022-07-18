const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}
const mysql = require('mysql')
const connection = mysql.createConnection(config)

connection.connect((err) => {
    if(err) throw err
    const sqlForCreateTable = ` CREATE TABLE IF NOT EXISTS people ( id int NOT NULL AUTO_INCREMENT, name varchar(255), PRIMARY KEY (id) );`
    connection.query(sqlForCreateTable, (err) => {
        if (err) throw err;
    })
})

app.get('/', (req,res) => {
    let body = "<h1>Full Cycle Rocks!</h1>"
    const newConnection = mysql.createConnection(config)

    const sqlForInsert = `INSERT INTO people(name) values('Testador');`
    newConnection.query(sqlForInsert)

    const sqlForSelectPeople = `SELECT * FROM people;`
    newConnection.query(sqlForSelectPeople, (err, result) => {
        if (err) throw err;
        result.map(item => {
            body = body + `<br/> <h5>id: ${item.id}, name: ${item.name}<h5/>`
        })
        
        res.send(body)
    })
    newConnection.end()
})

app.listen(port, () => {
    console.log('Listen on port:', port)
})