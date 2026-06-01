const express=require('express')
const PORT=require('./PORT')
const url=require('./url')
const dbConnection=require('./database/connection')
const urlRouter=require('./routes/route')
const ejs=require('ejs')
const path=require('path')
const staticRouter=require('./routes/staticRouter')


dbConnection(url)
const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.set('view engine',"ejs")

app.set('views', path.resolve( "./views"))


app.use('/url',urlRouter)
app.use('/',staticRouter)





app.listen(PORT,()=>{
    console.log('Server Started!')
})