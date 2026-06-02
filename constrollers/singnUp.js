const {User}=require('../models/signup')
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
    const result=await User.findOne({email:body.email,password:body.password})
    if(!result) return res.render('bad',{msg:'404'})

        return res.render('user',{result})
}
module.exports={
    HandleSignUp,
    HandleLogin
}

