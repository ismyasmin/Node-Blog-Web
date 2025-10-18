const express = require('express'); // returns a function & storing in express
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blogs');

// express app
const app = express(); // invoking that function to create an instance of Express

// connect to mongodb
const dbURI = "mongodb+srv://Yoshi:pass123@nodetuts.vprzzw2.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=nodetutss"
mongoose.connect(dbURI) // asynchronous task, returns a promise 
    .then((result) => app.listen(3000)) // gonna fire function after connection - listen for requests, second argu: default value of the argument is localhost. returns instance of the server
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

app.get('/blogs/create', (req,res) => {
    res.render('create', {title: 'Create'});
});

// blog routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1}) // descending order - gonna go from the newest to the oldest
     .then((result) => {
        res.render('index', {title: 'All Blogs', blogs: result}) // render index view & pass in some data
     })
     .catch((err) => {
        console.log(err);
     })
});

app.post('/blogs', (req, res) =>{
    const blog = new Blog(req.body); // passing object that was created on the form

    blog.save()
     .then((result)=> {
        res.redirect('/blogs');

     })
     .catch((err) =>{
        console.log(err);
     })
   
});



app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});



