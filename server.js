const http = require('http'); 
const fs = require('fs');

// create server

// two objects in function: request object: info about request; url, request type. response that we send to user in browser 
const server = http.createServer( (req, res) => { // callback functions runs everytime there's a request 
    console.log(req.url, req.method);


    // bad idea to do html like this
    // request headers. set header content type
    res.setHeader('Content-Type', 'text/html');

    let path = './views/';
    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-me':
            path += 'about.html';
            res.statusCode = 301; // resource been permanently moved & gonna do a permanent redirect
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    } 
    // instead of hardcoding './views/index.html', use path
    fs.readFile(path, (err, data) => {
        if(err) {
            console.log(err);
            res.end(); // keep the request hanging if it's not ended
        } else {
            // res.write(data);
            res.end(data); // can send data in end but not if sending multiple things
        }
    });
}); // stores instance of the server


// lsiten for requests 

// invoke listen method  to actively listen for requests being sent
server.listen(3000, 'localhost', () => { // default value of the argument is localhost but explicity typing it out here
    console.log('listening for requests on port 3000');
});