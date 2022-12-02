const {exec} = require("../db/pgsql")
const login = (username, password)=>{
    
    const sql = `select username, realname from users where username='${username}' and password='${password}'; `
    return exec(sql).then(result=>{
        
        return result.rows[0] || {}
    })
}

module.exports = {
    login
}