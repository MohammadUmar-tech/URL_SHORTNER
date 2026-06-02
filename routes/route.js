const express=require('express')
const {URL}=require('../models/schema')
const {handleCreationOfURLSHORTNER,hanleGetShortedURL,handleGetAnalytics}=require('../constrollers/index')

const router=express.Router()

router.post('/',handleCreationOfURLSHORTNER)
router.get('/:shortId',hanleGetShortedURL)
router.get('/analytics/:shortId',handleGetAnalytics)

module.exports= router


