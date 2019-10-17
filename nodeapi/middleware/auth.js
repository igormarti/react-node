const expressJwt = require('express-jwt')
const User = require('../models/user')

exports.HasPermission = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty:'auth'
})

exports.hasAuthorization = (req,res,next)=>{
    const authorized = req.profile === req.auth && req.profile.id === req.auth._id
    if(!authorized){
        return res.status(403).json({error:'User not authorized to perform actions'})
    }

    next()
}