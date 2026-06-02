const express=require('express')
const {URL}=require('../models/schema')
const {hadndlehomepageURLGenerator,handleAllRouteInfromtion,HandlesingUpPage,HanleLoginPage}=require('../constrollers/staticController')
const router=express.Router()
router.get('/',hadndlehomepageURLGenerator)
router.get('/test',handleAllRouteInfromtion)
router.get('/signup',HandlesingUpPage)
router.get('/login',HanleLoginPage)

module.exports= router