const http = require("http");
const fs = require("fs");//because we need read html files
const formidable = require("formidable");
const pg = require("pg");
const qs = require("querystring");
var FirstName ;
var LastName ;
var password ;



http.createServer(function(req,res){
    fs.readFile('index.html',function(err,data){
        if(err){
            res.writeHead(404,{'content-type':'text/html'});
            return res.end("404 not found");
        };
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(data);//html's content
        res.end();//end of response
    });

    const method = req.method;
    const url = req.url;//req為從前端傳來的東西，html form裡的method和action的url

    if(method==="GET"){

    }else{
        if(url==="/built_account"){
            let body = [];

            req.on("data",(chunk)=>{
                body.push(chunk);
            });
            req.on("end",()=>{
                body = Buffer.concat(body).toString();
                body = qs.parse(body);
                FirstName = body.fname;
                LastName = body.lname;
                password = body.pwd;
                console.log(FirstName);
                console.log(LastName);
                console.log(password);
            });
        };
    };

}).listen(8080);

const config = { //configuration
    host: 'localhost',
    user: 'chen',
    password:'123456',
    database:'mydb',
    port:5432,
};

const client = new pg.Client(config);

client.connect();
//要將postgresql資料庫裡的架構public屬性打開權限，才能動作
client.query(`insert into users(first_name,last_name,passwords)
values('${FirstName}','${LastName}','${password}');
`,(err, res)=>{
    if(!err){
        console.log(res.rows);
    }
    else{
        console.log(err.message);
    }
    client.end;
});