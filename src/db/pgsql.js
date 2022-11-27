const { Client } = require('pg')
const { postgre_conf } = require('../conf/db')
const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'nba51158',
    database: 'mydb'
})//db.js的config傳不進來

client.connect()

function exec(sql){

    const promise = new Promise((res,rej)=>{
        client.query(sql, (err, result) => {
            if (err){
                rej(err)
                return
            }
            res(result)
        })
    })
    return promise
}

module.exports = {
    exec
}