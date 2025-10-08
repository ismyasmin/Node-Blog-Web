const http = require('http'); 

// create server

// two objects in function: request object: info about request; url, request type. response that we send to user in browser 
const server = http.createServer( (req, res) => { // callback functions runs everytime there's a request 
    console.log('request made');
}); // stores instance of the server


// lsiten for requests 

// invoke listen method  to actively listen for requests being sent
server.listen(3000, 'localhost', () => { // default value of the argument is localhost but explicity typing it out here
    console.log('listening for requests on port 3000');
});