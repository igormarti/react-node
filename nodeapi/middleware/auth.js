const expressJwt = require('express-jwt')
const User = require('../models/user')

exports.HasPermission = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty:'auth'
})

exports.hasAuthorizationUser = (req,res,next)=>{
    const authorized = req.profile === req.auth && req.profile.id === req.auth._id
    if(!authorized){
        return res.status(403).json({error:'User not authorized to perform actions'})
    }

    next()
}

exports.hasAuthorizationPost = (req,res,next)=>{
    const authorizedUser = req.post && req.auth && req.post.postedBy._id.toString() === req.auth._id.toString()
    const authorizedAdmin = req.post && req.auth && req.auth.role === 'admin'
    if(!authorizedUser && !authorizedAdmin){
        return res.status(403).json({error:'User not authorized to perform actions'})
    }

    next()
}