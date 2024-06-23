//dotenv
require('dotenv').config()
//express
const express = require('express')

//cors

const cors = require('cors')

//router

const router = require('./Routing/route')

//mongoose
require('./Database/connection')

//server

const jobServer = express()

//use corse by server

jobServer.use(cors())


//middleware to convert json to js
jobServer.use(express.json())

 //to use router
jobServer.use(router)

//to get uploaded image
     //1st argument- name by which other applications can use this folder
     //second argument - express.static() : exports that folder

     jobServer.use('/uploads',express.static('./uploads'))

//port
const port =4003 || process.env

//run server

jobServer.listen(port,()=>{
    console.log(`server running successfully at port ${port}`);
})
