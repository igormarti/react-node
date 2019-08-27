
exports.createPostValidation = (req,res,next) => {
    
    req.check('title','Write a title').notEmpty()
    req.check('title','Title must be between 2 to 120 characters').isLength({
        min:2,max:120
    })

    req.check('body','Write a body').notEmpty()
    req.check('body','Body must be between 2 to 2000 characters').isLength({
        min:2,max:2000
    })

    const errors = req.validationErrors()

    if(errors){
        let errorsMsg = errors.map(error=>error.msg)[0]
        return res.status(400).json({errors:errorsMsg})
    }

    next()
}