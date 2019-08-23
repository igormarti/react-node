const express = require('express')

const app = express()
const morgan = require('morgan')
const fs = require("fs")
const path = require('path')

//Brings route
const  getPosts  = require('./route/post')

app.use(morgan("common", {
    stream: fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'})
}))
app.use("/",getPosts)


app.listen(2222, () => {
    console.log("Serve is standing...")
})