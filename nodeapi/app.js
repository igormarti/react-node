const express = require('express')

const app = express()
const morgan = require('morgan')

//Brings route
const { postRoute } = require('./route/post')
const middleware = (req,res,next) => {
    console.log('Middleware was initialized')
    next()
}

app.use(morgan("dev"))
app.use(middleware)
app.get('/',postRoute)


app.listen(2222, () => {
    console.log("Serve is standing...")
})