const http = require("http");
const port = 8080;
const serverHandle = require("./app.js");
const server = http.createServer(serverHandle);
server.listen(port);