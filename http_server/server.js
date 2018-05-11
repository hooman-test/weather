const http = require('http');
const router = require('./router');
const fs = require('fs');

let index = (req, res) => {
  res.end("<html><body><h1>Hi</h1></body></html>");
  return true;
};

let customHeader = (req, res) => {
  res.setHeader('X', 1212);
  return false;
};

let logger = (req, res) => {
  console.log(`${req.method}: ${req.url}`);
  return false;
};

let static = (req, res) => {
  let file = fs.createReadStream('./static.html');
  file.pipe(res);
  return true;
};

router.register(null, null, logger);
router.register(null, null, customHeader);
router.register('GET', '/static', static);
router.register('GET', '/', index);

let server = http.createServer();
server.on('request', router.handler);

server.listen(8086);
