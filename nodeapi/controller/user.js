
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

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
            res.status(401).json({
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
        const {_id,name} = user
        //Returning user informations
        return res.status(200).json({
            token,
            user:{_id,name,email}
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

    User.findById(id).exec((err,user)=>{

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

        return res.json({users})
    }).select('name email updated_at created_at')
}

exports.getUser = (req,res) =>{
    req.profile.hashed_password = undefined
    req.profile.salt = undefined

    return res.json(req.profile);
}

exports.updateUser = (req,res,next) => {

    let user = req.profile
    user = _.extend(user,req.body)
    user.updated_at = Date.now()
    user.save(err=>{
        if(err){
            res.status(400).json({
                error:'Error try update user.'
            })
        }

        user.hashed_password = undefined
        user.salt = undefined
        res.json({user})
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