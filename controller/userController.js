//jwt token
const jwt = require('jsonwebtoken');
const applicants = require('../method/userSchema');
const bcrypt = require('bcrypt');



//user register
exports.userRegister=async(req,res)=>{
    console.log(req.body);
    const { username, email, password, cpassword } = req.body
    const hash = await bcrypt.hash(password, 10) //hashing given password

    try {
        const existingUser = await applicants.findOne({ email: email })

        if (existingUser) {
            res.status(406).json('user already exists')
        }
        else {
            const newUser = new applicants({
                username,
                email ,
                password:hash,
                cpassword:hash,         
            })
            //store the particular data in mongoDB mongoose method
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (error) {
        res.status(401).json(`registration failed due to ${error}`)
    }
}


//userlogin

exports.userLogin=async(req,res)=>{
    const {email,password}=req.body

   try {
    const existingUser=await applicants.findOne({email})

    if(existingUser){
        const validatePassword = await bcrypt.compare(password, existingUser.password)
        if(validatePassword){
            const token=jwt.sign({userid:existingUser._id}, "confidential123")
            res.status(200).json({token,existingUser})
        }else{
            res.status(405).json('invalid  password')
        }
    

       

    }else{
        res.status(406).json('invalid email ')
    }

    
   } catch (error) {
    res.status(401).json(`Login failed due to ${error}`)
}
}


//update admin password

exports.updateUserPassword = async (req, res) => {
    const { id, oldPassword, newPassword, cNewPassword } = req.body
    console.log(id, oldPassword, newPassword, cNewPassword);
/*     const userid=new  mongoose.Types.ObjectId(id)
 */    

    try {
        const profile = await applicants.findOne({ _id:id })
        console.log(profile);
        if (profile) {
            const validation=await bcrypt.compare(oldPassword, profile.password) 
           if(validation){
            const hash=await bcrypt.hash(newPassword, 10) //hashing given password
            console.log(hash);

            const updatePassword = await applicants.findByIdAndUpdate(
                { _id: id },
                {
                    password: hash,
                    cpassword: hash,

                },
                { new: true }

            )

            await updatePassword.save()

            res.status(200).json(updatePassword)
            console.log(updatePassword);
           }else {
            res.status(406).json(`Incorrect Password`)

        }

        } 
    } catch (error) {
        res.status(401).json(`Login failed due to ${error}`)
    }

}




