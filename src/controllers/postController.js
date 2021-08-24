//const Post = require('./models/Post')
const Post = require('../models/Post')


module.exports.all = async function (request, response) {
    try {
        const post = await Post.find()
        return response.render('../src/views/allPosts', { posts: post })

    } catch (error) {
        return response.status(500).json({ "error": error })
    }
}

module.exports.byID = async function (request, response) {
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
}

module.exports.formCreatePost = function (request, response) {
    response.render('../src/views/create')

}

module.exports.createPost = async function (request, response) {
    try {
        const { title, description, vip, likes } = request.body

        const newPost = await Post.create({
            title,
            description,
            vip,
            likes
        })
        return response.redirect('/')

    } catch (error) {
        return response.status(500).json({ "error": error })
    }
}

module.exports.update = async function (request, response) {
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
}

module.exports.delete = async function (request, response) {
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
}
