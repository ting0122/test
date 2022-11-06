const http = require("http");
const fs = require("fs");
const qs = require("querystring");
const pg = require("pg");

http.createServer(function(req,res){

    //<show index.com>
    fs.readFile('index.html',function(err,data){
        if(err){
            res.writeHead(404,{'content-type':'text/html'});
            return res.end("404 , not found");
        };
            res.writeHead(200,{'content-type':'text/html'});
            res.write(data);
            res.end();//若無此行，會讓網頁持續加載中
    });
    //</show index.com>

    //<catch request>
    const method = req.method;
    const url = req.url;

    if(method==="POST"){
        //<sign up>
        if(url==="/built_account"){
            let body = [];
            req.on("data",(chunk)=>{
                body.push(chunk);
            });
            req.on("end",()=>{
                body = Buffer.concat(body).toString();
                body = qs.parse(body);    
            });
            //connect to database
            let users = {
                host:'localhost',
                user:`${body.fname}`,
                password:'body.password',
                database:'mydb',
                port:5432,
            };
        };
        //</sign up>

        //<sign in>

        //</sign in>
    };
    //</catch request>




}).listen(8080);