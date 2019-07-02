
// const express =  require('express');

// const app = express()

// app.get('/', (req,res) => {
//     res.send('Hello world !!!')
// })

// app.listen('2522')

const fs = require('fs');

//fs.watch('test.txt', (response) => console.log(response))


const handleErr = (err) => console.log(err);
const handleData = (data) => console.log(data.toString());

const data = fs.readFileSync('test.txt');
console.log(data.toString())
console.log('Node JS programing synchronous...')

fs.readFile('test.txt',(err,data)=>{
    if(err) handleErr(err);

    handleData(data);
})

console.log('Node  JS programing asynchronous...')