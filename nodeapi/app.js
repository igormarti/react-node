const express = require('express')

const app = express()
const morgan = require('morgan')
const fs = require("fs")
const path = require('path')

//Brings route
const { postRoute } = require('./route/post')
const middleware = (req,res,next) => {
    console.log('Middleware was initialized')
    next()
}

app.use(morgan("common", {
    stream: fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'})
}))
app.use(middleware)
app.get('/',postRoute)


app.listen(2222, () => {
    console.log("Serve is standing...")
})