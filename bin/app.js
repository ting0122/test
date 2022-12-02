const { resolve } = require("path");
const querystring = require("querystring");
const handleBlogRouter = require("../src/router/blog");
const handleUserRouter = require('../src/router/user');

//設置cookie的過期時間
const getCookieExpires = () =>{
    const d = new Date()
    d.setTime(d.getTime() + (24*60*60*1000))
    return d.toGMTString()
}

//session
const SESSION_DATA = {}

//用於處理post請求
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

    //解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item=>{
        if(!item)
            return
        const arr = item.split('=')
        const key = arr[0]
        const val = arr[1]
        req.cookie[key]=val
    })

    //解析 session
    let needSetCookie = false
    let userId = req.cookie.userid
    if(userId){
        if(!SESSION_DATA[userId]){
            SESSION_DATA[userId] = {}
        } 
    } else {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        SESSION_DATA[userId] = {}
    }
    req.session = SESSION_DATA[userId]

    getPostData(req).then(postData=>{
        req.body = postData

        //處理文章路由
        const blogResult = handleBlogRouter(req,res);
        if(blogResult){
            blogResult.then(blogData=>{

                if(needSetCookie){
                    res.setHeader('Set-Cookie',`userid=${userId}; path = /; httpOnly; expires=${getCookieExpires()};`)
                }

                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }

        //處理使用者路由
        const userResult = handleUserRouter(req,res);
        if(userResult){
            userResult.then(userData=>{

                if(needSetCookie){
                    res.setHeader('Set-Cookie',`userid=${userId}; path = /; httpOnly; expires=${getCookieExpires()};`)
                }

                res.end(
                    JSON.stringify(userData)
                )
            })
            return
        }
        

        //未命中路由
        res.writeHead(404,{"content-type":"text/plain"});
        res.write("404 NOT FOUND");
        res.end();
        })

}

module.exports = serverHandle;