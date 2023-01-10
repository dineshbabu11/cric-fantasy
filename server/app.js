const dotenv = require('dotenv')
const express = require('express')
const app = express()

dotenv.config({path: './config.env'})

require('./db/conn')
//const User = require('./models/userSchema')

app.use(express.json())

//link the router files for easy routing
app.use(require('./router/auth'))

const PORT = process.env.PORT

app.get('/login', (req, res)=>{
    res.send('You are logged in!!!!')
})

app.listen(PORT, ()=>{
    console.log('Server running on port :' + PORT)
})