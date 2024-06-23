const userprofiles = require("../method/userProfileSchema");
//to add user profile
exports.AddUserProfile = async (req, res) => {
    const userid = req.payload
    const { username, position, email, phone, country, city, postCode, gender, dateOfBirth, linkdin, resume, userImage } = req.body
    //console.log(userid,username,email,password,position,phone,country,city,postCode,gender,dateOfBirth,linkdin,resume,userImage);

    const profileImage = req.files && req.files.userImage ? req.files.userImage[0].filename : userImage;
    // console.log(profileImage);

    const userResume = req.files && req.files.resume ? req.files.resume[0].filename : resume;
    //console.log(userResume);

    try {
        const existingProfile = await userprofiles.findOne({ userid })
        if (existingProfile) {
            res.status(406).json(`Profile already exists`)
        } else {
            const newProfile = new userprofiles({
                userid: userid,
                username,
                email,
                position,
                phone,
                country,
                city,
                postCode,
                gender,
                dateOfBirth,
                linkdin,
                resume: userResume,
                userImage: profileImage

            })
            await newProfile.save()
            res.status(200).json(newProfile)
        }


    } catch (error) {
        res.status(401).json(`request failed due to ${error}`)
    }
}

//to get user profile
exports.getUserProfile = async (req, res) => {
    const userid = req.payload;
    try {
        const profile = await userprofiles.findOne({ userid: userid });
        if (profile) {
            res.status(200).json(profile);
            console.log(profile);
        } else {
            res.status(404).json('Profile not found. Please complete your profile.');
            // console.log(profile);
        }
    } catch (error) {
        console.error(`Request failed due to: ${error}`);
        res.status(500).json(`Request failed due to: ${error}`);
    }
};


//update profile

exports.updateUserProfile = async (req, res) => {
    console.log('inside controller');
    const { id } = req.params
    console.log(id);
    const userid = req.payload
    const { username, email, position, phone, country, city, postCode, gender, dateOfBirth, linkdin, resume, userImage } = req.body
    console.log(userid, username, email, position, phone, country, city, postCode, gender, dateOfBirth, linkdin, resume, userImage);

    const profileImage = req.files && req.files.userImage ? req.files.userImage[0].filename : userImage;
    console.log(profileImage);

    const userResume = req.files && req.files.resume ? req.files.resume[0].filename : resume;
    console.log(userResume);

    try {
        const updateUser = await userprofiles.findByIdAndUpdate(
            { _id: id },
            {
                username,
                email,
                position,
                phone,
                country,
                city,
                postCode,
                gender,
                dateOfBirth,
                linkdin,
                resume: userResume,
                userImage: profileImage,
                userid: userid

            },
            { new: true }
        )
        await updateUser.save()
        res.status(200).json(updateUser)


    } catch (error) {
        res.status(401).json(`request failed due to ${error}`)
    }
}


//get all user profiles

exports.getAllProfiles=async(req,res)=>{

    try {
        const profiles=await userprofiles.find()
        res.status(200).json(profiles);


        
    } catch (error) {
        res.status(500).json(`Request failed due to: ${error}`);
    }

}

