const express=require('express')
const {URL}=require('../models/schema')


const hadndlehomepageURLGenerator=async (req,res)=>{
    const allUsers=await URL.find({});
    return res.render("home")
}






const handleAllRouteInfromtion=async(req,res)=>{

 try {
       const allUsers=await URL.find({});
       return res.render('allurl',{result :allUsers})
 } catch (error) {
    console.log(error)
 }

}





module.exports={hadndlehomepageURLGenerator,handleAllRouteInfromtion}