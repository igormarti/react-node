const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const fs = require("fs")
const path = require('path')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')

//config dotenv
dotenv.config()
//connecting db mogoose
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true})
.then(()=>{ console.log('DB connected succefully') })
//verify if has error in connect with db
mongoose.connection.on('error',err=>{
    console.log(`DB connection error ${err}`)
})

//body parser
app.use(bodyParser.json())
//Brings route
const getPosts = require('./route/post')
//Save all requests 
app.use(morgan("common", {
    stream: fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'})
}))
//Package to validation
app.use(expressValidator())
//Middleware of the post routers 
app.use("/",getPosts)
//Get port
const port = process.env.PORT || 2222
app.listen(port, () => {
    console.log("Serve is standing, port:"+port)
})