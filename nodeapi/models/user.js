const moongoose = require('mongoose')
const uuidv1 = require('uuid/v1')
const crypto = require('crypto')

const userSchema = new moongoose.Schema({
    name:{
        type: String,
        trim:true,
        required:true
    },
    email:{
        type: String,
        trim:true,
        required:true
    },
    hashed_password:{
        type:String,
        required:true
    },
    salt:String,
    created_at:{
        type:Date,
        default:Date.now
    },
    updated_at:{
        type:Date
    }
})

userSchema.virtual('password')
.set(function(password){
    //Create a variable temporary called _password
    this._password = password
    //Generate timestamp
    this.salt = uuidv1()
    //EncryptPassword
    this.hashed_password = this.encryptPassword(password)
}).get(function(){
    return this._password
})

//method
userSchema.methods = {
    encryptPassword:function(password){
        if(!password)return""
        try{
            return crypto.createHmac('sha256',this.salt)
            .update(password).digest('hex')    
        }catch(err){
            return ''
        }
    }
}



module.exports = moongoose.model('User',userSchema)