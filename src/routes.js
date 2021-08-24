const express = require('express')
const router = express.Router()
const Post = require('./models/Post')
const postController = require('../src/controllers/postController')

//feed?
router.get('/', (request, response) => {
    response.json({ message: 'home' })
})

//show all posts
router.get('/posts', postController.all)

//show one post
router.get('/post/:id', postController.byID)

//form to create a new post
router.get('/post', postController.formCreatePost)

//create a new post
router.post('/post', postController.createPost)

/*****************************/
/* this needs to be implemented */
//router.put('/post', postController.formUpdatePost)
/*****************************/

//update post
router.put('/post/:id', postController.update)

//delete post
router.delete('/post/:id', postController.delete)

module.exports = router