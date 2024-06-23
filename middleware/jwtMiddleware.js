const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
   // console.log('inside jwt middleware')
    const token = req.headers['authorization'].split(" ")[1]   //req.header contains bearer and token  .split( )splits the two strings into array and array[1] contains token
    //console.log(token);
 try{
    const response= jwt.verify(token,"confidential123")
   // console.log(response);

    req.payload = response.userid   //to send userId to project controller so that each individual uploads and all uploads can be seperated
console.log(req.payload);
   
    next()
 }
 catch(error){
    console.log('Auhtorization failed due to',error);
 }
}



module.exports = jwtMiddleware