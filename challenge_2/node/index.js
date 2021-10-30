const express = require('express')
const mysql = require('mysql')
const faker = require('faker')

const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const app = express()

app.get('/', (req,res) => {
    const conn = mysql.createConnection(config)
    const name = faker.name.findName()
    const insert_people_query = `INSERT INTO people(name) VALUES ("${name}")`
    conn.query(insert_people_query)
    const get_people_query = `SELECT * FROM people`;
    conn.query(get_people_query, (error, results, fields) => {
        if (error) {
            throw error
        };
        let list = '<ol>';
        for(let person of results) {      
            list += `<li>${person.name}</li>`;
        }
        list += '</ol>';
        const result = '<h1>Full Cycle Rocks!</h1>' + list
        res.send(result)
        
    });
    conn.end()
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})