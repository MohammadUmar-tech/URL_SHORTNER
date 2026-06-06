const {User}=require('../models/signup')
const {URL}=require('../models/schema')
const {v4:uuidv4}=require('uuid')
const {Session}=require('../models/session')
const PORT=require('../PORT')
const JWT=require('jsonwebtoken')
const { Secret }=require('../secret')


const HandleSignUp=async (req,res)=>{
try {
        const body=req.body
        if(!body||!body.name||!body.email||!body.password){
            return res.status(400).send({msg:"URL not found"})
        }
        const result=await User.create({
            name:body.name,
            email:body.email,
            password:body.password
        })
        if(!result){
            return res.status(500).send({msg:"Internal server error while creating the user"})
        }
        return res.render('user',{result})
} catch (error) {
    console.log(error)
}
}

const HandleLogin=async(req,res)=>{
    const body=req.body
    console.log(`email is :${body.email} and password is ${body.password}`)
    const result=await User.findOne({email:body.email,password:body.password})
    if(!result) return res.render('bad',{msg:'404 please SignUp To Create Your Profile'})
    // const Token=uuidv4()
    // const result1=await Session.create({
    //     sessionId:Token,
    //     userId:result._id
    // })
    // req.user=result1
    // res.cookie('sessionId', Token, {
    //         httpOnly: true, 
    //         secure: false,  
    //         sameSite: 'lax'
    //     });
    const payload={
        _id:result._id,
        email:result.email,
        name:result.name
    }
    const token=JWT.sign(payload,Secret,{expiresIn:'1h'})
    // res.cookie('sessionId',token,{
    //         httpOnly: true, 
    //         secure: false,  
    //         sameSite: 'lax'
    // })
    res.json({token})


     const urls=await URL.find({createdBy:result._id})
     return res.render('home',{urls,port:PORT})
}

module.exports={
    HandleSignUp,
    HandleLogin
}