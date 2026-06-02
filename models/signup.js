
const express=require('express')
const  mongoose  = require('mongoose')

const userSingUp=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{timpstamps:true})
const User=mongoose.model('user',userSingUp)
module.exports={
    User
}