const expressJwt = require('express-jwt')

exports.HasPermission = expressJwt({
    secret: process.env.JWT_SECRET
})