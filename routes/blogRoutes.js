const express = require('express');
const blogController = require('../controllers/blogsController') // double . to come out of the current folder
const router = express.Router(); // creates new instance  of a router object


router.get('/create', blogController.blog_create_get);

router.get('/', blogController.blog_index);

router.post('/', blogController.blog_create_post) 

router.get('/:id', blogController.blog_detail);

router.delete('/:id', blogController.blog_delete);

module.exports = router;
