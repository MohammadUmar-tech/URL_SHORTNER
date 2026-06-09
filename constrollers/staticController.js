const express=require('express')
const {URL}=require('../models/schema')
const PORT=require('../PORT.js')

const hadndlehomepageURLGenerator=async (req,res)=>{
   
    // return res.render("home")
            const urls = await URL.find({ createdBy: req.user });
            return res.render('home', { urls, port: PORT });
}

const handleAllRouteInfromtion=async(req,res)=>{

 try {
       const allUsers=await URL.find({});
       return res.render('allurl',{result :allUsers})
 } catch (error) {
    console.log(error)
 }

}

const HandlesingUpPage=async (req,res)=>{
    res.render('signup')
}

const HanleLoginPage=async (req,res)=>{
    res.render('login')
}

module.exports={hadndlehomepageURLGenerator,handleAllRouteInfromtion,HandlesingUpPage,HanleLoginPage}
