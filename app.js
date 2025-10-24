const express = require('express'); // returns a function & storing in express
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express(); // invoking that function to create an instance of Express

// connect to mongodb
const dbURI = "mongodb+srv://Yoshi:pass123@nodetuts.vprzzw2.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=nodetutss"
mongoose.connect(dbURI) // asynchronous task, returns a promise 
    .then((result) => {
        console.log('connected to mongodb');
        app.listen(3000, () => console.log('server running on port 3000'))
    }) // gonna fire function after connection - listen for requests, second argu: default value of the argument is localhost. returns instance of the server
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs'); // .set() lets configure application settings, one of these settings is view engine 
                            // ejs gonna be used to create templates 

app.use(express.static('public')); // setting up the static files
app.use(express.urlencoded({ extended: true})); // takes all URL encoded data & passes into an object that can be used on the request object (accepts form data)
app.use(morgan('dev')); // dictates how it's gonna be formatted what is logged to the console


app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

// blog routes
app.use('/blogs', blogRoutes) // gonna apply all handlers in blogRoutes into the app


// handler for delete request
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});



