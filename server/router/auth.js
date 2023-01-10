const express = require('express')
const User = require('../models/userSchema')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authenticate = require('../middleware/authenticate')
const cookieParser = require('cookie-parser')

require('../db/conn')

router.use(cookieParser())

router.get('/', (req, res)=>{
    res.send('Hello Cricket Fantasyyy!!!!')
})

router.post('/register', async (req,res)=>{
    const {name, email, password, cpassword} = req.body
    if(!name || !email || !password || !cpassword){
        return res.status(422).json({error : "Please fill all the fields!!!"})
    }

    try{
        const userExist = await User.findOne({email : email})
        if(userExist){
            return res.json({error: "User already present with the email : " + email})
        } else if(password != cpassword){
            return res.json({error: "Passwords not matching"})
        }

        const user = new User({name, email, password, cpassword})
        await user.save()

        res.json({message : "User registered succesfully"})
    }catch(err) {
        console.log(err)
    }
    
})

router.post('/signin', async (req, res)=>{

    const {email, password} = req.body
    if(!email || !password){
        return res.status(422).json({error : "Please fill all the fields!!!"})
    }

    try{
        const user = await User.findOne({email : email})
        
        if(!user){
            return res.json({error: "User does not exist with the email : " + email})
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.json({error: "Invalid Credentials"})
        }
        const token = await user.genAuthToken()
        
        res.cookie("crictoken", token, {
            expires: new Date(Date.now() + 25892000000)
            // httpOnly: true
        })
        res.json({message: "User signed in succesfully"})

    }catch(err){
        console.log(err)
    }
})

router.get('/dashboard', authenticate, (req, res) => {
    console.log('Inside dashboard')
    console.log(req.rootUser.email)
    res.send(req.rootUser)
})

module.exports = router