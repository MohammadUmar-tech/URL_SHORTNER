const express=require('express')
const {URL}=require('../models/schema')
const {restrictTo}=require('../middlewares/auth')

const {HandleAdminRequest,hadndlehomepageURLGenerator,handleAllRouteInfromtion,HandlesingUpPage,HanleLoginPage}=require('../constrollers/staticController')
const router=express.Router()
router.get('/',restrictTo(["NORMAL"]),hadndlehomepageURLGenerator)
router.get('/test',handleAllRouteInfromtion)
router.get('/signup',HandlesingUpPage)
router.get('/login',HanleLoginPage)
router.get('/admin',restrictTo(["ADMIN"]),HandleAdminRequest)
module.exports= router