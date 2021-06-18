//Objective

// Part 1: set up basic HTTP server using core http module, set up basic request handler, & start server
// Part 2: serve static HTML files using path and fs core modules
// use Postman to test server

//core modules so don't need to install, just use require to import
const http = require('http')
const hostname = 'localhost'
const port = 3000

const path = require('path')
const fs = require('fs')

// set up server
const server = http.createServer((req, res) => { //request handler callback function
    //console.log(req.headers)
    //res.statusCode = 200
    //res.setHeader('Content-Type', 'text/html') //tells client what data to expect in response body
    //res.end('<html><body><h1>Hello World!</h1></body></html>') //message body with inline html
    // currently not reading types of HTTP requests

    // change for part 2
    console.log(`Request for ${req.url} by method ${req.method}`)
    
    // make server only respond to GET requests
    if (req.method === 'GET') {
        let fileUrl = req.url
        if (fileUrl === '/') { //if request just to hostname (localhost) without specifying url (aboutus.html) then req.url is only /, then send back /index.html
            fileUrl = '/index.html'
        }
        //get absolute path of file requested
        const filePath = path.resolve('./public' + fileUrl) //converts relative path to absolute path
        //grant request only if it's an html file
        const fileExt = path.extname(filePath) //parse out file extension from filePath
        if (fileExt === '.html') {
            //check if file exists in server and is accessible, 2 args: file path & callback that takes error argument
            fs.access(filePath, err => {
                //if file not accessible, error object will be passed to err arg
                if (err) {
                    res.statusCode = 404
                    res.setHeader('Content-Type', 'text/html')
                    res.end(`<html><body><h1>Error 404: ${fileUrl} not found</h1></body></html>`)
                    return //so code after isn't executed
                }
                //HTML file exists in public directory
                res.statusCode = 200
                res.setHeader('Content-Type', 'text/html')
                //send HTML file
                fs.createReadStream(filePath).pipe(res)
                // .createReadStream: read contents of file in small chunks instead of all at once
                //.pipe: available on Node streams, send from one stream to another (from reading file at filepath to response stream)
            })
        } else {
            res.statusCode = 404
            res.setHeader('Content-Type', 'text/html')
            res.end(`<html><body><h1>Error 404: ${fileUrl} is not an HTML file</h1></body></html>`)
        }
    } else {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/html')
        res.end(`<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>`)
    }
})

// start server
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})
