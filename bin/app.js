const { resolve } = require("path");
const querystring = require("querystring");
const handleBlogRouter = require("../src/router/blog");
const handleUserRouter = require('../src/router/user');

const getPostData = (req)=>{
    const promise = new Promise((resolve, reject)=>{
        if(req.method !== 'POST'){
            resolve({})
            return
        }
        if(req.headers['content-type'] !== 'application/json'){
            resolve({})
            return
        }
        
        let postData = ''
        req.on('data', chunk=>{
            postData += chunk.toString()
        })
        req.on('end',()=>{
            if(!postData){
                resolve({})
                return
            }
            JSON.parse(postData)
        })

    })
    return promise
}

const serverHandle = (req,res)=>{

    res.setHeader('content-type','application/json');

    //獲取path
    const url = req.url;
    req.path = url.split('?')[0];

    //解析query
    req.query = querystring.parse(url.split('?')[1]);

    getPostData(req).then(postData=>{
        req.body = postData

        //處理文章路由
        const blogResult = handleBlogRouter(req,res);
        if(blogResult){
            blogResult.then(blogData=>{
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }

        //處理使用者路由
        const userData = handleUserRouter(req,res);
        if(userData){
        res.end(
            JSON.stringify(userData)
        )
        return
        }

        //未命中路由
        res.writeHead(404,{"content-type":"text/plain"});
        res.write("404 NOT FOUND");
        res.end();
        })

}

module.exports = serverHandle;