const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:'Title is required',
        minlength:2,
        maxlength:120
    },
    body:{
        type:String,
        required:'Body is required',
        minlength:2,
        maxlength:2000
    }
})

module.exports = mongoose.model("Post",postSchema)