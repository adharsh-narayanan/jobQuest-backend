//jwt
const jwt = require('jsonwebtoken');
const recruiters = require('../method/adminSchema');
const bcrypt = require('bcrypt');
const { default: mongoose } = require('mongoose');


//admin registration

exports.adminRegister = async (req, res) => {
    const { username, email, password, cpassword } = req.body
    const hash = await bcrypt.hash(password, 10) //hashing given password
    //console.log(hash);
    try {
        const existingUser = await recruiters.findOne({ email: email })

        if (existingUser) {
            res.status(406).json('user already exists')
        }
        else {
            const newUser = new recruiters({
                username,
                email,
                password: hash,
                cpassword:hash,
            })
            //store the particular data in mongoDB mongoose method
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (error) {
        res.status(401).json('registration failed due to', error)
    }

}

//admin login

exports.adminLogin = async (req, res) => {
    const { email, password } = req.body

    try {
        const existingUser = await recruiters.findOne({ email })

        if (existingUser) {
            const validatePassword = await bcrypt.compare(password, existingUser.password) //comparing passwords
           // console.log(validatePassword);
            if (validatePassword) {
                const token = jwt.sign({ userid: existingUser._id }, "confidential123");

                if (email === 'admin@gmail.com') {
                    return res.status(202).json({ existingUser, token });
                }

                return res.status(200).json({ existingUser, token });

            } else {
                res.status(406).json("incorrect password")

            }


        }
        else {
            res.status(405).json("incorrect email")
        }


    } catch (error) {
        res.status(401).json(`Login failed due to ${error}`)

    }
}

//update admin password

exports.updateAdminPassword = async (req, res) => {
    const { id, oldPassword, newPassword, cNewPassword } = req.body
    console.log(id, oldPassword, newPassword, cNewPassword);
/*     const userid=new  mongoose.Types.ObjectId(id)
 */    

    try {
        const profile = await recruiters.findOne({ _id:id })
        console.log(profile);
        if (profile) {
            const validation=await bcrypt.compare(oldPassword, profile.password) 
           if(validation){
            const hash=await bcrypt.hash(newPassword, 10) //hashing given password
            console.log(hash);

            const updatePassword = await recruiters.findByIdAndUpdate(
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






