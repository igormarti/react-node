
const Post = require('../models/post')
const formidable = require('formidable')
const fs = require('fs')
const _ = require('lodash')


exports.postById = (req,res,next,postId) => {

    Post.findById(postId)
    .populate('postedBy','_id name role')
    .populate('Comments.postedBy','_id name')
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
    populate('Comments','text created').
    populate('Comments.PostedBy','_id name').
    select('_id title body created Likes')
    .sort({'created':-1})
    .then(posts=>{
            res.status(200).json(posts)
    }).catch(err=>{console.log(`Occourred a error:${err}`)})

}  

exports.getPostsByUser = (req,res) => {

    Post.find({postedBy:req.profile._id})
    .populate('postedBy','_id name role')
    .sort({created:-1})
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

exports.updatePost = (req,res,next) => {
    const form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err,fields,files)=>{

            if(err){
                return res.status(400).json({
                    error:'Image could not be uploaded'
                }) 
            }

            let post = req.post
            post = _.extend(post,fields)
            post.updated = Date.now()

            if(files.photo){
                post.photo.data = fs.readFileSync(files.photo.path)
                post.photo.contentType = files.photo.type
            }

            post.save((err,result)=>{
                if(err){
                    return res.status(400).json({
                        error: err
                    });
                }
                return res.status(200).json(post)
            })
    })
}

exports.singlePost = (req,res) => {
    return res.json(req.post)
}

exports.like = (req,res) => {
    Post.findByIdAndUpdate(req.body.postId,
    {$push:{Likes:req.body.userId}},
    {new:true}).exec((err,result) => {
        if(err){
            return res.status(400).json({error:err})
        }else{
            return res.status(200).json(result)
        }

    })

}

exports.unLike = (req,res) => {
    Post.findByIdAndUpdate(req.body.postId,{$pull:{Likes:req.body.userId}},{new:true})
    .exec((err,result) => {
        if(err){
            return res.status(400).json({error:err})
        }else{
            return res.status(200).json(result)
        }
    })
}

exports.photo = (req,res,next) => {
    res.set('Content-Type',req.post.photo.contentType)
    return res.send(req.post.photo.data)
}

exports.comment = (req,res) => {
    let comment = req.body.comment
    comment.postedBy = req.body.userId
    Post.findByIdAndUpdate(req.body.postId,{$push:{Comments:comment}},{new:true})
    .populate('Comments.postedBy','_id name')
    .populate('postedBy','_id name')
    .exec((err,result)=>{
        if(err){
            return res.status(400).json({error:err})
        }else{
            return res.status(200).json(result)
        }
    })
}

exports.unComment = (req,res) => {
    let comment = req.body.comment

    Post.findByIdAndUpdate(req.body.postId,{$pull:{Comments:{_id:comment._id}}},{new:true})
    .populate('Comments.postedBy','_id name')
    .populate('postedBy','_id name')
    .exec((err,result)=>{
        if(err){
            return res.status(400).json({error:err})
        }else{
            return res.status(200).json(result)
        }
    })
}