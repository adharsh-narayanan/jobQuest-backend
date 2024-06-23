

const mongoose = require('mongoose')
const userProfileSchema = mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true

    },
    phone: {
        type: String,
        required: true

    },
    country: {
        type: String,
        required: true

    },
    city: {
        type: String,
        required: true

    },
    postCode: {
        type: String,
    },
    gender: {
        type: String,
        required: true

    },
    dateOfBirth: {
        type: String,
        required: true

    },
    linkdin: {
        type: String,
    },
    resume: {
        type: String,
        required: true

    },
    userImage: {
        type: String,
        required: true

    },
})


const userprofiles = mongoose.model('userprofiles', userProfileSchema)


module.exports = userprofiles