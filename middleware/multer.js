const multer = require('multer')



  const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
     callback(null,'./uploads')  //the location where the uploaded file should be locally stored
    },
    filename:(req,file,callback)=>{
     filename=`file-${Date.now()}-${file.originalname}`   //Date.now() returs time in milliseconds from 1970 onwards
     callback(null,filename)  //first argument should be error or null
    }
 })

 const fileFilter = (req,file,callback)=>{
    if(file.mimetype==='image/png'||file.mimetype==='image/jpeg'||file.mimetype==='image/jpg'||file.mimetype==='application/pdf'){
        callback(null,true)
    }else{
        callback(null,false)
        return callback(new error("Error: File type not supported!"))
    }
}

//4)

const multerconfig = multer({
    storage,
    fileFilter
})


//export
module.exports = multerconfig