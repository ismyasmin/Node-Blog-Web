const Blog = require('../models/blogs'); // double . means come out of the current folder then go into modules and blogs file
// Controller functions: 
// blog_index to get all the blogs & inject into index view,blog_detail to get a single blog ('/:id'), 
// blog_create_get to send actual form, blog_create_post to add a new blog, blog_delete to delete a blog


const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1}) // descending order - gonna go from the newest to the oldest
     .then((result) => {
        res.render('blogs/index', {title: 'All Blogs', blogs: result}) // render index view & pass in some data
     })
     .catch((err) => {
        console.log(err);
     });

}
const blog_detail = (req,res) => {
    const id = req.params.id; // : to denote a ramp parameter
    Blog.findById(id)
     .then((result)=>{ // result will be the single blog based on this id
        res.render('blogs/details', { blog: result, title: 'Blog Details'})
     })
     .catch((err)=>{
        console.log(err);
     });

}

const blog_create_get = (req,res) => {
    res.render('blogs/create', {title: 'Create'});
}

const blog_create_post = (req,res) => {
    const blog = new Blog(req.body); // passing object that was created on the form

    blog.save()
     .then((result)=> {
        res.redirect('/blogs');

     })
     .catch((err) =>{
        console.log(err);
     });
}

const blog_delete = (req,res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
     .then((result) => {
       res.json({ redirect: '/blogs'}) // send back JSON to the front end , the browser - gonna be json object
               // when sending AJAX request, in node you can't use redirect as a response, have to send JSON or text data back to the browser
     })
     .catch((err)=>{
       console.log(err);
     });
}

module.exports = {
    blog_index, // have access to this from anywhere this file is imported
    blog_detail,
    blog_create_get,
    blog_create_post,
    blog_delete
}
