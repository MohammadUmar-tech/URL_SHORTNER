const mongoose=require('mongoose')
const {User}=require('./signup')
const urlShortnerSchema=new mongoose.Schema({
    shortId:{
        type :String,
        unique:true,
        required :true
    },
    redirectUrl:{
        type:String,
        required:true,
        
    },
   visitHistory: [
        {
            timestamp: {
                type: Date,
                default: Date.now 
            }
        }
    ],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
    
},{timestamps:true})

const URL=mongoose.model('url',urlShortnerSchema)
module.exports={
    URL
}