const mongoose=require('mongoose')

const jobsSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    country:{
        type:String,
    },
    jobType:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true
    },
    education:{
        type:String,
       
    },
    location:{
        type:String,
        required:true
    },
    salary:{
        type:String,
    },
    lastDate:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    skills:{
        type:String,
    },
    responsibilities:{
        type:String,
       
    },
    userid:{
        type:String,
        required: true
    },

},{ timestamps: true })


const jobs=mongoose.model('jobs',jobsSchema)

module.exports=jobs