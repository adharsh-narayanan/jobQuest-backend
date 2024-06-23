const mongoose = require('mongoose')

//schema
const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    }
})

//model

const recruiters = mongoose.model("recruiters", adminSchema)


//export so that controller can use this and  index.js will be able to access this

module.exports = recruiters
