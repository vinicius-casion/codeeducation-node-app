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


app.get('/', (req,res) => {
    const connection = mysql.createConnection(config)
    let body = "<h1>Full Cycle Rocks!</h1>"

    const sql = `INSERT INTO people(name) values('Testador')`
    connection.query(sql)

    const selectPeopleSQL = `SELECT * FROM people`
    connection.query(selectPeopleSQL, (err, result) => {
        if (err) throw err;
        result.map(item => {
            body = body + `<br/> <h5>id: ${item.id}, name: ${item.name}<h5/>`
        })
        
        res.send(body)
    })
    connection.end()
})

app.listen(port, () => {
    console.log('Listen on port:', port)
})