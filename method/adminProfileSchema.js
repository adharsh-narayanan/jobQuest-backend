const mongoose = require('mongoose')

//schema
const adminProfileSchema = new mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },   
    industry:{
        type:String,
        required:true

    },
    website:{
        type:String, 
        required:true
       

    },
    address:{
        type:String,
        required:true

    },
    country:{
        type:String,
        required:true

    },
    about:{
        type:String
    },
    companyImage:{
        type:String,
        required:true

    },
    documents:{
        type:String,

        
    },
    verification:{
        type:Boolean,
        default:false
    },
    
})

//model

const adminprofiles = mongoose.model("adminprofiles",adminProfileSchema)


//export so that controller can use this and  index.js will be able to access this

module.exports = adminprofiles