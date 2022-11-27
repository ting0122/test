const {getList, getDetail,newBlog,updateBlog,delBlog} = require("../controller/blog");
const {SuccessModel, ErrorModel} = require("../model/resModel");

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
        const news = req.body
        const data = newBlog(news)
        return new SuccessModel(data)
    }

    if(method==='POST' && path==='/api/blog/update'){
        const result = updateBlog(id, res.body)
        if(result){
            return new SuccessModel()
        } else {
            return new ErrorModel('can not updata')
        }
    }

    if(method==='POST' && path==='/api/blog/del'){
        const result = delBlog(id)
        if(result){
            return new SuccessModel()
        } else {
            return new ErrorModel('can not delete')
        }
    }
}

module.exports = handleBlogRouter;