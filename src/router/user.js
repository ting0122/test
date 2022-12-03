const {login} = require("../controller/user")
const {SuccessModel, ErrorModel} = require("../model/resModel");
const { set } = require("../db/redis")

const handleUserRouter = (req,res)=>{
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0];

    if(method==='POST' && path==='/api/user/login'){
        const{username, password} = req.body
        const result = login(username, password)
        return result.then(data=>{
            if(data.username){
                //設置session
                req.session.username = data.username
                req.session.realname = data.realname
                //同步到redis
                set(req.sessionId, req.session)
                return new SuccessModel()
            }
            else {
                return new ErrorModel('login failed')
            }
        })
    }

}

module.exports = handleUserRouter;