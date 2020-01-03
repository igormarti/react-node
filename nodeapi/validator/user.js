
exports.createSingUpValidation = (req,res,next) => {
    
    req.check('name','Write user name').notEmpty()
    req.check('name','Name must be in minimum 2 characters').isLength({
        min:2
    })

    req.check('email','Write a email').notEmpty()
    req.check('email','Enter a email valid').isEmail()

    req.check('password','Write a password').notEmpty()
    req.check('password').isLength({min:8}).withMessage('Password must be in minimum 8 characters')
    .matches(/(?=.*\d)(?=.*[A-Z])(?=.*[a-z])/)
    .withMessage('Password must contain Uppercase,Lowercase and number')

    const error = req.validationErrors()

    if(error){
        let errorsMsg = error.map(error=>error.msg)[0]
        return res.status(400).json({error:errorsMsg})
    }

    next()
}

exports.createSingInValidation = (req,res,next) => {
    
    req.check('email','Enter email').notEmpty()
    req.check('email','Enter a email valid').isEmail()

    req.check('password','Enter password').notEmpty()
    req.check('password').isLength({min:8}).withMessage('You typed less then 8 characters')

    const errors = req.validationErrors()

    if(errors){
        let errorsMsg = errors.map(error=>error.msg)[0]
        return res.status(400).json({error:errorsMsg})
    }

    next()
}