const env = process.env.NODE_ENV //環境變量

let postgre_conf

if(env === 'env'){ //本地開發端
    postgre_conf = {
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'nba51158',
        database: 'mydb'
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
}

module.exports = {
    postgre_conf
}