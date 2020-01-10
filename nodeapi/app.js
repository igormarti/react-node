const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const fs = require("fs")
const path = require('path')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
const err = require('./middleware/errHandle')
const cors = require('cors')

//config dotenv
dotenv.config({path:(process.env.NODE_ENV==="dev")?".env.dev":".env"})
//connecting db mogoose
mongoose.connect(process.env.MONGO_URILOCAL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('DB connected succefully') })
//verify if has error in connect with db
mongoose.connection.on('error', err => {
    console.log(`DB connection error ${err}`)
})

//body parser
app.use(bodyParser.json())
//Cookie parser Middleware
app.use(cookieParser())
//Brings route
const routePosts = require('./route/post')
const routeUsers = require('./route/user')
//Save all requests 
app.use(morgan("common", {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}))
//Package to validation
app.use(expressValidator())
//Cors to allow connect client-side and backend 
app.use(cors())
//Middleware of the routers 
app.use("/", routePosts)
app.use("/", routeUsers)
app.use(err.ErrorHandle)
//Get Api Documentation 
app.get('/doc',(req,res)=>{
    fs.readFile('docs/docApi.json',(err,content)=>{
        if(err){
            res.status(401).json({error:err})
        }
        let contentJson = JSON.parse(content)
        res.json(contentJson)
    })
})
//Get port
const port = process.env.PORT || 2222
app.listen(port, () => {
    console.log("Serve is standing, port:" + port)
})