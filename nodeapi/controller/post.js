
const Post = require('../models/post')

exports.getPosts = (req,res) => {

    Post.find().select('_id title body')
    .then(posts=>{
            res.status(200).json({posts})
    }).catch(err=>{console.log(`Occourred a error:${err}`)})

}  

exports.createPosts = (req,res) => {

    const post = new Post(req.body)
    post.save().then(result=>{
        res.status(200).json({post:result})
    })
    
}
