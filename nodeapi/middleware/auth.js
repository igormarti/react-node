const expressJwt = require('express-jwt')

exports.HasPermission = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty:'auth'
})

exports.hasAuthorizationUser = (req,res,next)=>{
 
    const authorized = req.profile && req.auth && req.profile.id.toString() === req.auth._id.toString()
    const authorizedAdmin = req.profile && req.auth && req.auth.role.toString() === 'admin'
    console.log(req.profile.id)
    console.log(req.auth._id)
    console.log(authorized)
    if(!authorized&&!authorizedAdmin){
        return res.status(403).json({error:'User not authorized to perform actions'})
    }

    next()
}

exports.hasAuthorizationPost = (req,res,next)=>{
    const authorizedUser = req.post && req.auth && req.post.postedBy._id.toString() === req.auth._id.toString()
    const authorizedAdmin = req.post && req.auth && req.auth.role.toString() === 'admin'
    if(!authorizedUser && !authorizedAdmin){
        return res.status(403).json({error:'User not authorized to perform actions'})
    }

    next()
}