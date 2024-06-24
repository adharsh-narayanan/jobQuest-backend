const { default: mongoose } = require("mongoose");
const savedcandidates = require("../method/saveCandidatesSchema");
const userprofiles = require("../method/userProfileSchema");

exports.saveCandidate = async (req, res) => {
   const adminId = req.payload
    //console.log(adminId);
    const { id } = req.params
    //console.log(id);
    try {
        const existingProfile = await savedcandidates.findOne({ profileid: id,adminId })
        if (existingProfile) {
            res.status(406).json(`profile already saved`)
        } else {
            const newProfile = new savedcandidates({
                profileid: id,
                adminId
            })
            await newProfile.save()
           /// console.log(newProfile);
            res.status(200).json(newProfile)
        }

    } catch (error) {
        res.status(401).json(`req failed due to ${error}`)
    }
}

//to get saved candidates

exports.getSavedCandidates = async (req, res) => {
    const adminId = req.payload
    //console.log(adminId);
    try {
        const savedprofiles = await savedcandidates.find({ adminId })
        const profileids = savedprofiles.map((items) => new mongoose.Types.ObjectId(items.profileid))
        //console.log(profileids);
        const profiles =  await userprofiles.find({ _id: { $in: profileids } });
        //console.log(profiles);

        res.status(200).json(profiles)

    } catch (error) {
        res.status(401).json(`req failed due to ${error}`)
    }
}

//remove saved candiate
exports.removeSavedCandidate=async(req,res)=>{
    const adminId = req.payload
    const { id } = req.params
    //console.log(id);
    try {
        const deleteProfile=await savedcandidates.deleteOne({ profileid:id ,adminId})
        res.status(200).json(deleteProfile)

        
    } catch (error) {
        res.status(401).json(`req failed due to ${error}`)
    }
    }
    