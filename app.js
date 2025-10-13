const express = require('express'); // returns a function & storing in express

// express app
const app = express(); // invoking that function to create an instance of Express

// register view engine
app.set('view engine', 'ejs'); // .set() lets configure application settings, one of these settings is view engine 
                            // ejs gonna be used to create templates 


// listen for requests, second argu: default value of the argument is localhost
app.listen(3000); // returns instance of the server


app.get('/', (req, res) => {
    // render a view 
    res.render('index'); // what the view is called minus the extension
    // gonna look at the views folder automatically finding this view name, use ejs view engine to render that & send it back the browser
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/blogs/create', (req,res) => {
    res.render('create');
})
app.use((req, res) => {
    res.status(404).render('404');
});



