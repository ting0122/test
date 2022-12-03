const { IS_READ_ONLY } = require("@redis/search/dist/commands/AGGREGATE");
const {getList, getDetail,newBlog,updateBlog,delBlog} = require("../controller/blog");
const {SuccessModel, ErrorModel} = require("../model/resModel");

//統一驗證登入函數
const loginCheck = (req)=>{
    if(!req.session.username){
        return new ErrorModel('login failed')
    }
}

const handleBlogRouter = (req,res)=>{
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0];
    const id = req.query.id;

    if(method==='GET' && path==='/api/blog/list'){
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const result = getList(author, keyword)
        return result.then(listData=>{
            return new SuccessModel(listData);
        })

    }

    if(method==='GET' && path==='/api/blog/detail'){
        const data = getDetail(id)
        return new SuccessModel(data)
    }

    if(method==='POST' && path==='/api/blog/news'){

        const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
            return loginCheck
            //未登入
        }

        req.body.author = req.session.username
        const news = req.body
        const data = newBlog(news)
        return new SuccessModel(data)
    }

    if(method==='POST' && path==='/api/blog/update'){
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
            return loginCheck
            //未登入
        }

        const result = updateBlog(id, res.body)
        if(result){
            return new SuccessModel()
        } else {
            return new ErrorModel('can not updata')
        }
    }

    if(method==='POST' && path==='/api/blog/del'){

        const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
            return loginCheck
            //未登入
        }

        const author = req.session.username
        const result = delBlog(id, author)
        if(result){
            return new SuccessModel()
        } else {
            return new ErrorModel('can not delete')
        }
    }
}

module.exports = handleBlogRouter;