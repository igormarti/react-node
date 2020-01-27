
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const formidable = require('formidable')
const fs = require('fs')

exports.signup = async (req,res)=>{
    const userExist = await User.findOne({email:req.body.email})
    if(userExist) return res.status(403).json({error:'User already exists'})

    const user = await new User(req.body)
    await user.save()
    return res.status(200).json('Singup success! login please.')
}

exports.signin = (req,res)=>{
    //Destruturing the object body
    const {email,password} = req.body
    //find user based in email
    User.findOne({email},(err,user)=>{
        //if error or no user
        if(err || !user){
            return res.status(401).json({
                error:"Email d'ont found"
            })
        }
        //if found user
        //Authenticate with method of the user model
        if(!user.authenticate(password)){
            return res.status(401).json({
                error:"Email and password d'ont match"
            })
        }
        //Credentials match
        //Generate the token with user id and secret
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET) 
        //Store token in cookie 
        res.cookie("t",token,{expire: new Date() + 9999})
        //Destruturing user
        const {_id,name,created_at} = user
        //Returning user informations
        return res.status(200).json({
            token,
            user:{_id,name,email,created_at}
        })
    })
}

exports.signout = (req,res)=>{
    //Clear cookie token
    res.clearCookie("t")
    //return success 
    return res.status(200).json({
        message:'Signout success'
    })
}

exports.userById = (req,res,next,id)=>{

    User.findById(id)
    .populate('Following','_id name')
    .populate('Followers','_id name')
    .exec((err,user)=>{
 
        if(err || !user){
            return res.status(400).json({error:'User not found'})
        }
        
        req.profile = user
        next()
    })
}

exports.allUsers = (req,res) =>{

    User.find((err,users)=>{
        if(err){
            return res.status(400).json({error:err})
        }

        return res.json(users)
    }).select('name email updated_at created_at')
}

exports.getUser = (req,res) =>{
    req.profile.hashed_password = undefined
    req.profile.salt = undefined

    return res.status(200).json(req.profile);
}

exports.updateUser = (req,res,next) => {
    const form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err,fields,files)=>{

            if(err){
                return res.status(400).json({
                    error:'Image could not be uploaded'
                }) 
            }

            let user = req.profile
            user = _.extend(user,fields)
            user.updated_at = Date.now()

            if(files.photo){
                user.photo.data = fs.readFileSync(files.photo.path)
                user.photo.contentType = files.photo.type
            }

            user.save((err,result)=>{
                if(err){
                    return res.status(400).json({
                        error: err
                    });
                }
                user.hashed_password = undefined
                user.salt = undefined
                return res.status(200).json(user)
            })

    })
}

exports.deleteUser = (req,res,next) => {
    let user = req.profile
    user.remove((err,user)=>{
        if(err){
            res.status(400).json({
                error:'Error try remove user '+user.name
            })
        }

        user.hashed_password = undefined
        user.salt = undefined
        res.json({user,'msg':"User "+user.name+" was deleted with success"})
    })
}

exports.photoUser = (req,res,next) => {
    if(req.profile.photo.data){
        res.set(('Content-Type',req.profile.photo.contentType))
        res.send(req.profile.photo.data)
    }
    next()
}

exports.addFollowing = (req,res,next) => {

    User.findByIdAndUpdate(req.body.userId,{$push:{Following:req.body.followId}},(err,result)=>{
        if(err){
            return res.status(400).json({
                error: err
            });   
        }
        next()
    })

}

exports.addFollower = (req,res) => {

    User.findByIdAndUpdate(req.body.followId,{$push:{Followers:req.body.userId}},{new:true})
    .populate('Following','_id name')
    .populate('Followers','_id name')
    .exec( (err,result)=>{
        if(err){
            return res.status(400).json({
                error: err
            });   
        }
        result.salt = undefined
        result.hashed_password = undefined

        return res.status(200).json(result)
    })

}

exports.removeFollowing = (req,res,next) => {

    User.findByIdAndUpdate(req.body.userId,{$pull:{Following:req.body.unfollowId}},(err,result) => {
        if(err){
            return res.status(400).json({
                error: err
            });   
        }
        next()
    })

}

exports.removeFollower = (req,res) => {

    User.findByIdAndUpdate(req.body.unfollowId,{$pull:{Followers:req.body.userId}},{new:true})
    .populate('Following','_id name')
    .populate('Followers','_id name')
    .exec((err,result)=>{
        if(err){
            return res.status(400).json({
                error: err
            });   
        }
        result.salt = undefined
        result.hashed_password = undefined

        return res.status(200).json(result)
    })
    
}
