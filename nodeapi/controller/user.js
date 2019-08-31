
const User = require('../models/user')

exports.singup = async (req,res)=>{
    const userExist = await User.findOne({email:req.body.email})
    if(userExist) return res.status(403).json({error:'User already exists'})

    const user = await new User(req.body)
    await user.save()
    return res.status(200).json('Singup success! login please.')
}
