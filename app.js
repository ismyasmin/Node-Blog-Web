const express = require('express'); // returns a function & storing in express
const morgan = require('morgan');
const mongoose = require('mongoose');

// express app
const app = express(); // invoking that function to create an instance of Express

// connect to mongodb
const dbURI = "mongodb+srv://Yoshi:pass123@nodetuts.vprzzw2.mongodb.net/?retryWrites=true&w=majority&appName=nodetutss"
mongoose.connect(dbURI) // asynchronous task, returns a promise 
    .then((result) => app.listen(3000)) // gonna fire function after connection - listen for requests, second argu: default value of the argument is localhost. returns instance of the server
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs'); // .set() lets configure application settings, one of these settings is view engine 
                            // ejs gonna be used to create templates 




app.use(express.static('public')) // setting up the static files
app.use(morgan('dev')); // dictates how it's gonna be formatted what is logged to the console

app.get('/', (req, res) => {
    const blogs = [
            {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
            {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
            {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    ];
    
    // render a view, pass data into a view
    res.render('index', {title: 'Home', blogs}); // what the view is called minus the extension, object in second argu  whch is gonna get sent into ejs file
    // gonna look at the views folder automatically finding this view name, use ejs view engine to render that & send it back the browser
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

app.get('/blogs/create', (req,res) => {
    res.render('create', {title: 'Create'});
})
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});



