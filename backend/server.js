const http = require('http');
const app = require('./app');
// set port
const port = process.env.PORT || 8080;

const server = http.createServer(app);

server.listen(port);