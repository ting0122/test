const logincheck = (username, password)=>{
    if(username==='chen' && password === '123'){
        return true
    }
    return false
}

module.exports = {
    logincheck
}