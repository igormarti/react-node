
// const express =  require('express');

// const app = express()

// app.get('/', (req,res) => {
//     res.send('Hello world !!!')
// })

// app.listen('2522')

const fs = require('fs');

//fs.watch('test.txt', (response) => console.log(response))

fs.readFile('test.txt',(err,data)=>{
    if(err){
        console.logI(err)
    }else{
        console.log(data.toString())
    }
})

console.log('Node  JS programing asynchronous...')