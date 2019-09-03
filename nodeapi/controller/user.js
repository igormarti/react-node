
const User = require('../models/user')
const jwt = require('jsonwebtoken')

exports.singup = async (req,res)=>{
    const userExist = await User.findOne({email:req.body.email})
    if(userExist) return res.status(403).json({error:'User already exists'})

    const user = await new User(req.body)
    await user.save()
    return res.status(200).json('Singup success! login please.')
}

exports.singin = (req,res)=>{
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
            res.status(401).json({
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
        res.status(200).json({
            token,
            user:{_id,name,email}
        })
    })

}
