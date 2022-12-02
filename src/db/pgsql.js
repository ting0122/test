const { Client } = require('pg')
const  { postgre_conf }  = require('../conf/db')
const client = new Client(postgre_conf)

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