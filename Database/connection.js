//connecting server and database

//mongoose
const mongoose = require('mongoose')
connectionString = process.env.Database


//connect

mongoose.connect(connectionString).then(()=>{
    console.log('mongoose connected successfully');
}).catch((error)=>{
    console.log(error);
})