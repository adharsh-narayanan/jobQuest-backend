const mongoose = require("mongoose");


const saveCandidatesSchema = new mongoose.Schema({
    profileid:{
        type: String,
        required: true
    },  
    adminId:{
        type: String,
        required: true
    }


})


const savedcandidates = mongoose.model("savedcandidates", saveCandidatesSchema)
module.exports = savedcandidates