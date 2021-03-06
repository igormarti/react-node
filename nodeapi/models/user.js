const moongoose = require('mongoose')
const uuidv1 = require('uuid/v1')
const crypto = require('crypto')
const {ObjectId} = moongoose.Schema

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
    photo:{
        data:Buffer,
        contentType:String
    },
    about:{
       type:String,
       trim:true 
    },
    Following:[{type:ObjectId,ref:'User'}],
    Followers:[{type:ObjectId,ref:'User'}],
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
    },
    resetPasswordLink: {
        type: String,
        default: ""
    },
    role:{
        type:String,
        default:"subscriber"
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
    authenticate:function(pass){
        return this.encryptPassword(pass)===this.hashed_password
    },
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