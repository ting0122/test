const {login} = require("../controller/user")
const {SuccessModel, ErrorModel} = require("../model/resModel");

const handleUserRouter = (req,res)=>{
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0];

    if(method==='GET' && path==='/api/user/login'){
        const{username, password} = req.query
        const result = login(username, password)
        return result.then(data=>{
            
            if(data.username){
                
                //設置session
                req.session.username = data.username
                req.session.realname = data.realname
                
                return new SuccessModel()
            }
            else {
                return new ErrorModel('login failed')
            }
        })
    }

}

module.exports = handleUserRouter;