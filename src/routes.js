const express = require('express')
const router = express.Router()
const Post = require('./models/Post')

//feed?
router.get('/', (request, response) => {
    response.json({ name: 'feed', age: 23 })
})

//todas as postagem feitas
router.get('/posts', async (request, response) => {
    try {
        const post = await Post.find()
        return response.status(200).json(post)
    } catch (error) {
        return response.status(500).json({ "error": error })
    }
})

//mostrar uma postagem pelo id
router.get('/post/:id', async (request, response) => {

    try {
        const _id = request.params.id
        const post = await Post.findOne({ _id })

        if (!post) {
            return response.status(404).json({ post })
        } else {
            console.log(post)
            return response.render('../src/views/singlePost', { post: post })
        }
    } catch (error) {
        return response.status(500).json({ "error": error })
    }
})

//criar uma postagem
router.post('/post', async (request, response) => {
    try {
        const { title, description, vip, likes } = request.body

        const newPost = await Post.create({
            title,
            description,
            vip,
            likes
        })
        return response.status(201).json(newPost)

    } catch (error) {
        return response.status(500).json({ "error": error })
    }

    /**
     *     { 
            "title":"oi",
            "description":"olaaa",
            "vip":true,
            "likes":0 
        }
     */

})

//atualizar uma postagem
router.put('/post/:id', async (request, response) => {

    try {
        const _id = request.params.id
        const { title, description, vip, } = request.body
        let post = await Post.findOne({ _id })

        if (!post) {
            return response.status(404).json({ post })

        } else {
            post.title = title
            post.description = description
            post.vip = vip

            await post.save()

            return response.status(200).json(post)
        }
    } catch (error) {
        return response.status(500).json({ "error": error })
    }

})

//deletar  uma postagem
router.delete('/post/:id', async (request, response) => {

    try {
        const _id = request.params.id
        const post = await Post.deleteOne({ _id })

        if (post.deleteCount === 0) {
            return response.status(404).json()
        } else {
            return response.status(204).json()
        }

    } catch (error) {
        return res.status(500).json({ "error": error })
    }
})



module.exports = router