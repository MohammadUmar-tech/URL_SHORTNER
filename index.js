const express=require('express')
const PORT=require('./PORT')
const url=require('./url')
const dbConnection=require('./database/connection')
const urlRouter=require('./routes/route')
dbConnection(url)
const app=express();
app.use(express.json())


app.use('/url',urlRouter)







app.listen(PORT,()=>{
    console.log('Server Started!')
})