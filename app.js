const express = require('express'); // returns a function & storing in express

// express app
const app = express(); // invoking that function to create an instance of Express


// listen for requests, second argu: default value of the argument is localhost
app.listen(3000); // returns instance of the server

// listen for a get request
app.get('/', (req, res) => { 
    // not a good way to send HTML to the browser
    res.send('<p>home</p>'); // infers the type of content trying to send to the browser & automatically sets the content type header
                // infers status code too

}); // two argus: 1: path to url( here will be root of domain ), 2: fire function of request + response object
// req: info about the request such as url or the method i.e get, post. 

app.get('/about', (req, res) => { 
    res.send('<p>about</p>'); 
})


