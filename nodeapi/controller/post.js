
const Post = require('../models/post')
const formidable = require('formidable')
const fs = require('fs')

exports.getPosts = (req,res) => {

    Post.find().select('_id title body')
    .then(posts=>{
            res.status(200).json({posts})
    }).catch(err=>{console.log(`Occourred a error:${err}`)})

}  

exports.createPosts = (req,res) => {
    
    let form = new formidable.IncomingForm()
    form.keepExtensions = true

    form.parse(req,(err,fields,files)=>{

        if(err){
            return res.status(400).json({
                error:'Image could not be uploaded'
            })
        }

        let post = new Post(fields)
        post.postedBy = req.profile

        if(files.photo){if(file)
            files.photo.data = fs.readFileSync(files.photo.path)
            files.photo.contentType = files.photo.type
        }

        post.save().then(result=>{
            res.status(200).json({post:result})
        },err=>{
            res.status(401).json({err:err})
        }).catch((err)=>{
            res.status(401).json({err:err})
        })
    })
    
}
