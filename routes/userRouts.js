const express=require('express')

const {HandleSignUp,HandleLogin}=require('../constrollers/singnUp')
const router=express.Router()

router.route('/signUp').post(HandleSignUp)
router.route('/Login').post(HandleLogin)
module.exports=router
