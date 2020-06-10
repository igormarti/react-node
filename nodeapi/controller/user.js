
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const formidable = require('formidable')
const fs = require('fs')
//const sendGrid = require('../helpers/email')
const nodeMail = require('../helpers/nodemail')

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
        const token = jwt.sign({_id:user._id,role:user.role},process.env.JWT_SECRET) 
        //Store token in cookie 
        res.cookie("t",token,{expire: new Date() + 9999})
        //Destruturing user
        const {_id,name,created_at,role} = user
        //Returning user informations
        return res.status(200).json({
            token,
            user:{_id,name,email,created_at,role}
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

exports.findPeople = (req,res) => {
    let following = req.profile.Following
    following.push(req.profile._id)
    User.find({_id:{$nin:following}},(err,users) => {
        if(err){
            return res.status(400).json({
                error: err
            });   
        }
        return res.json(users)
    }).select('name')
}

exports.forgotPassword = (req, res) => {
    
    if (!req.body) return res.status(400).json({ error: "Enter your email" });
    if (!req.body.email)
        return res.status(400).json({ error: "Enter your email" });
 
    const { email } = req.body;
    // find the user based on email
    User.findOne({ email }, (err, user) => {
        // if err or no user
        if (err || !user)
            return res.status("401").json({
                error: "User with that email does not exist!"
            });
 
        // generate a token with user id and secret
        const token = jwt.sign(
            { _id: user._id, iss: "NODEAPI" },
            process.env.JWT_SECRET
        );
 
        // email data
        const emailData = {
            to: email,
            subject: "Password Reset Instructions",
            text: `Please use the following link to reset your password: ${
                process.env.CLIENT_URL
            }/reset-password/${token}`,
            html:`<p>Please use the following link to reset your password:</p> <p>${
                process.env.CLIENT_URL
            }/reset-password/${token}</p>`
        };
 
        return user.updateOne({ resetPasswordLink: token }, (err, success) => {
            if (err) {
                return res.json({ error: err });
            } else {
                nodeMail.sendMail(emailData,options={typeTemplate:1})
                return res.status(200).json({
                    message: `Email has been sent to ${email}. Follow the instructions to reset your password.`
                });
            }
        });
    });

}

exports.resetPassword = (req, res) => {

    const { resetPasswordLink, newPassword } = req.body;
 
    User.findOne({ resetPasswordLink }, (err, user) => {
        // if err or no user
        if (err || !user)
            return res.status("401").json({
                error: "Invalid Link!"
            });
 
        const updatedFields = {
            password: newPassword,
            resetPasswordLink: ""
        };
 
        user = _.extend(user, updatedFields);
        user.updated = Date.now();
 
        user.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json({
                message: `Great! Now you can login with your new password.`
            });
        });
    });

}

exports.socialLogin = (req, res) => {
    // try signup by finding user with req.email
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err || !user) {
            // create a new user and login
            user = new User(req.body);
            req.profile = user;
            user.save();
            // generate a token with user id and secret
            const token = jwt.sign(
                { _id: user._id,role:user.role, iss: "NODEAPI" },
                process.env.JWT_SECRET
            );
            res.cookie("t", token, { expire: new Date() + 9999 });
            // return response with user and token to frontend client
            const { _id, name, email } = user;
            return res.json({ token, user: { _id, name, email } });
        } else {
            // update existing user with new social info and login
            req.profile = user;
            delete req.body.password
            user = _.extend(user, req.body);
            user.updated = Date.now();
            user.save();
            // generate a token with user id and secret
            const token = jwt.sign(
                { _id: user._id, role:user.role,iss: "NODEAPI" },
                process.env.JWT_SECRET
            );
            res.cookie("t", token, { expire: new Date() + 9999 });
            // return response with user and token to frontend client
            const { _id, name, email,role } = user;
            return res.json({ token, user: { _id, name, email, role } });
        }
    });
};
