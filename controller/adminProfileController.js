const { default: mongoose } = require("mongoose");
const adminprofiles = require("../method/adminProfileSchema");

//to add admin profile

exports.addAdminProfile = async (req, res) => {
    const userid = req.payload
    console.log(userid);

    const { username, email, industry, website, address, country, about, documents, companyImage } = req.body
    console.log(username, email, industry, website, address, country, about, documents, companyImage);


    const companypic = req.files && req.files.companyImage ? req.files.companyImage[0].filename : companyImage;
    console.log(companypic);
    const companydoc = req.files && req.files.documents ? req.files.documents[0].filename : documents;
    console.log(companydoc);

    try {
        const existingProfile = await adminprofiles.findOne({ userid})
        if (existingProfile) {
            res.status(406).json(`Profile already exists`)
        } else {
            const newProfile = new adminprofiles({
                userid: userid,
                username,
                email,
                industry,
                website,
                address,
                country,
                about,
                documents: companydoc,
                companyImage: companypic

            })
            await newProfile.save()
            res.status(200).json(newProfile)
        }


    } catch (error) {
        res.status(401).json(`req failed due to ${error}`)

    }


}

//to get admin profile

exports.getAdminProfile = async (req, res) => {
    const userid=req.payload
    try {
      const profile=  await adminprofiles.findOne({userid:userid})
      if(profile){
        res.status(200).json(profile)
        // console.log(profile);
       }else{
        res.status(406).json('please complete your profile')
        // console.log(profile);
       }
        
    } catch (error) {
        res.status(401).json(`req failed due to ${error}`)
    }

}

//to update admin profile

exports.updateAdmin=async(req,res)=>{ 
    const {id}=req.params 
    console.log(id);
    const userid =req.payload 
    console.log(userid);
   
    const {username,email, industry, website, address, country,about,documents,companyImage}=req.body
    console.log(username,email, industry, website, address, country,about,documents,companyImage);
   
   
    const companypic = req.files && req.files.companyImage ? req.files.companyImage[0].filename : companyImage;
    console.log(companypic);
    const companydoc = req.files && req.files.documents ? req.files.documents[0].filename : documents;
    console.log(companydoc);
   
   
    try {
        const updateAdmin =await adminprofiles.findByIdAndUpdate(
            { _id:id},
            {
               username,
               email,
               industry,
               website,
               address,
               country,
               about,
               documents:companydoc,
               companyImage:companypic,
               userid:userid
            },
            { new: true }
   
        )
   
        await updateAdmin.save()
   
        res.status(200).json(updateAdmin)
   
   
    } catch (error) {
        res.status(401).json(`request failed due to ${error}`)
    }
   
   
   }



   //to get all recruiters
exports.getAllRecruiters = async (req, res) => {
    const userid=req.payload
    console.log(userid);
    try {
        const Allrecruiters = await adminprofiles.find()
        res.status(200).json(Allrecruiters)
        console.log(Allrecruiters);

    } catch (error) {
        res.status(401).json(`request failed due to ${error}`)

    }
}

//to verify  admin

exports.verifyAdmin=async(req,res)=>{
    const{id}=req.params
    //console.log(id);

    const {verified}=req.body
  //  console.log(verified);
    
try {
    
    const profile=await adminprofiles.findByIdAndUpdate(
        { _id: id },
        {
            verification:verified

        },
        { new: true }

    )


    res.status(200).json(profile)
    console.log(profile);    
    
} catch (error) {
    res.status(401).json(`request failed due to ${error}`)
}  


    
}