const mongoose =require('mongoose')

const appliedJobsSchema= new mongoose.Schema({
    userid: {
        type: String,
        required:true

    },
    jobid: {
        type: String,
        required:true

    },

})

const jobapplications=mongoose.model("jobapplications",appliedJobsSchema)

module.exports=jobapplications