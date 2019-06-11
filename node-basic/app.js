
// const express =  require('express');

// const app = express()

// app.get('/', (req,res) => {
//     res.send('Hello world !!!')
// })

// app.listen('2522')

const fs = require('fs');

fs.watch('test.txt', (response) => console.log(response))