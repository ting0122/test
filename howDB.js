const { Client } = require('pg')
const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'nba51158',
    database: 'mydb'
  })
client.connect()
client.query(`select * from blogs`, (err, res) => {
  if (err) throw err
  console.log(res)
  client.end()
})