
const Post = require('../models/post')
const formidable = require('formidable')
const fs = require('fs')
const _ = require('lodash')


exports.postById = (req,res,next,postId) => {

    Post.findById(postId)
    .populate('postedBy','_id name')
    .exec((err,post)=>{
        if(err || !post){
            return res.status(400).json({
                error:err
            })
        }

        req.post = post
        next()
    })
}

exports.getPosts = (req,res) => {

    Post.find().
    populate('postedBy','_id name').
    select('_id title body')
    .then(posts=>{
            res.status(200).json({posts})
    }).catch(err=>{console.log(`Occourred a error:${err}`)})

}  

exports.getPostsByUser = (req,res) => {

    Post.find({postedBy:req.profile._id})
    .populate('postedBy','_id name')
    .exec((err,posts)=>{
        if(err){
            return res.status(401).json({
                error:err
            })
        }

        res.json(posts)
    })
}

exports.createPosts = (req,res,next) => {
    
    const form = new formidable.IncomingForm()
    form.keepExtensions = true

    form.parse(req,(err,fields,files)=>{
        
        if(err){
            return res.status(400).json({
                error:'Image could not be uploaded'
            })
        }

        let post = new Post(fields);
           
        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;
        post.postedBy = req.profile;
            
        if (files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
        }
        post.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });

    })
    
}

exports.deletePost = (req,res)=>{
    let post = req.post;
    post.remove((err,post)=>{
        if(err){
            return res.status(400).json({
                error:err
            })
        }

        res.json({
            msg:'Post deleted successfully'
        })
    })
}

exports.updatePost = (req,res,next)=>{
    let post = req.post
    post = _.extend(post,req.body)
    post.updated = Date.now()
    post.save(err=>{
        if(err){
            return res.status(400).json({
                error:err
            })
        }

        res.json(post)
    })
}
