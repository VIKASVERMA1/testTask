const express=require('express')
const app=express()
require('./dbConnection')
const bodyParser = require('body-parser')
require("./route/userRoutes")


PORT=3009

app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

//router

const router=require('./route/userRoutes')

app.use('/user',router)

app.listen(PORT,()=>{
    console.log(`your server is runnig on port ${PORT}`);
})