const env = process.env.NODE_ENV //環境變量

console.log(env)

let postgre_conf
let redis_conf

if(env === 'dev'){ //本地開發端
    postgre_conf = {
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'nba51158',
        database: 'mydb'
    }
    redis_conf = {
        port : 6379,
        host : '127.0.0.1'
    }
}

if(env === 'production'){
    postgre_conf = {    //線上開發端
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'nba51158',
        database: 'mydb'
    }
    redis_conf = {
        port : 6379,
        host : '127.0.0.1'
    }
}

module.exports = {
    postgre_conf,
    redis_conf
}