
 //import helpers
 const {sum,sub} = require('./helpers/helpers.js')
 //import http to make requests and get answers
 const http = require('http')
 
 const server = http.createServer((req,res)=>{
     res.end('Hello world!!! serve inited...')
 })
    
 server.listen(2522)

 console.log(sum(10,5))
 console.log(sub(25,22))

