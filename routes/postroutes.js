const  express = require("express");
const Post = require("../models/postModel.js")
const checkAuth = require('../check-auth.js')

const router = express.Router()

router.post("/",checkAuth, async(req, res)=>{
    const post = new Post({
        title : req.body.title,
        content : req.body.content
    })

    post.save()
    res.status(201).json({
        message: 'Post Created',
        post: post
    })

} )

router.get("/",checkAuth, async (req, res)=>{
    Post.find().then((posts)=>{
        res.json({
            message: "List of posts",
            posts: posts
        })
    })
})

router.delete("/:id",checkAuth, async(req, res)=>{
    Post.deleteOne({_id:req.params.id})
    .then((result)=>{
        res.status(200).json({
            message: "Post Deleted"
        })
    })

})

module.exports= router;