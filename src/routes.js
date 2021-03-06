const express = require('express')
const router = express.Router()
const Post = require('./models/Post')
const postController = require('../src/controllers/postController')

//feed?
router.get('/', postController.home)

//show all posts
router.get('/posts', postController.all)

//show one post
router.get('/post/:id', postController.byID)

//form to create a new post
router.get('/newpost', postController.formCreatePost)

//create a new post
router.post('/newpost', postController.createPost)

//form to update a post
router.get('/post-edit/:id', postController.editPost)

//update post
router.post('/post/:id', postController.update)

//delete post
router.get('/delete/:id', postController.delete)

module.exports = router