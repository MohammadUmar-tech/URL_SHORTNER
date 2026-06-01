const mongoose=require('mongoose')

const dbConnection=async (url)=>{

    mongoose.connect(url).then(()=>{
        console.log("Database Connected")
    }).catch((err)=>{
        console.log('Error occured while connetion to the database')
    })
}

module.exports=dbConnection



