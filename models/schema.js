const mongoose=require('mongoose')
const urlShortnerSchema=new mongoose.Schema({
    shortId:{
        type :String,
        required:true,
        unique:true
    },
    redirectUrl:{
        type:String,
        required:true
    },
   visitHistory: [
        {
            timestamp: {
                type: Date,
                default: Date.now 
            }
        }
    ]
    
},{timestamps:true})

const URL=mongoose.model('url',urlShortnerSchema)
module.exports={
    URL
}