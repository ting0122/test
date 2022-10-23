var http = require("http");
var fs = require("fs");//because we need read html files
var formidable = require("formidable");
var pg = require("pg");

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
}).listen(8080);

const config = { //configuration
    host: 'localhost',
    user: 'chen',
    password:'123456',
    database:'postgres',
    port:5432,
};

const client = new pg.Client(config);

client.connect(err => {
    if(err)
        throw err;
    else{
        queryDatabase();
    }
});

function queryDatabase(){
    console.log('running query to postgresql');
    const query = ``;
    client.query(query)
    .then(res=>{
        console.log('you did it');
    })
    .catch(err=>{
        console.log('err');
        throw err;
    })
};