const mongoose = require('mongoose')

const bookmarkedjobsSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
    },
    jobType: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    education: {
        type: String,

    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: String,
    },
    lastDate: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    skills: {
        type: String,
    },
    responsibilities: {
        type: String,

    },
    userid: {
        type: String,
        required: true
    },
    applicantId:{
        type: String,
        required: true
    }

}, { timestamps: true })


const savedjobs = mongoose.model('savedjobs', bookmarkedjobsSchema)

module.exports = savedjobs