//Objective

// Part 1: set up basic HTTP server using core http module, set up basic request handler, & start server
// Part 2: serve static HTML files using path and fs core modules
// use Postman to test server

const http = require('http')
const hostname = 'localhost'
const port = 3000

// set up server
const server = http.createServer((req, res) => { //request handler callback function
    console.log(req.headers)
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html') //tells client what data to expect in response body
    res.end('<html><body><h1>Hello World!</h1></body></html>') //message body with inline html
})

// start server
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})