const express = require('express');
const Blog = require('../models/blogs'); // double . means come out of the current folder then go into modules and blogs file

const router = express.Router(); // creates new instance of a router object


// blog routes
router.get('/', (req, res) => {
    Blog.find().sort({ createdAt: -1}) // descending order - gonna go from the newest to the oldest
     .then((result) => {
        res.render('index', {title: 'All Blogs', blogs: result}) // render index view & pass in some data
     })
     .catch((err) => {
        console.log(err);
     })
});

router.post('/', (req, res) =>{
    const blog = new Blog(req.body); // passing object that was created on the form

    blog.save()
     .then((result)=> {
        res.redirect('/blogs');

     })
     .catch((err) =>{
        console.log(err);
     })
   
});

router.get('/create', (req,res) => {
    res.render('create', {title: 'Create'});
});

router.get('/:id', (req, res) => {
    const id = req.params.id; // : to denote a ramp parameter
    Blog.findById(id)
     .then((result)=>{ // result will be the single blog based on this id
        res.render('details', { blog: result, title: 'Blog Details'})
     })
     .catch((err)=>{
        console.log(err);
     })
}); 

router.delete('/:id', (req, res) => {
     const id = req.params.id;

     Blog.findByIdAndDelete(id)
      .then((result) => {
        res.json({ redirect: '/blogs'}) // send back JSON to the front end , the browser - gonna be json object
                // when sending AJAX request, in node you can't use redirect as a response, have to send JSON or text data back to the browser
      })
      .catch((err)=>{
        console.log(err);
      })
});

module.exports = router;
