const express=require('express')
const {URL}=require('../models/schema')
const {hadndlehomepageURLGenerator,handleAllRouteInfromtion}=require('../constrollers/staticController')
const router=express.Router()
router.get('/',hadndlehomepageURLGenerator)
router.get('/test',handleAllRouteInfromtion)
module.exports= router