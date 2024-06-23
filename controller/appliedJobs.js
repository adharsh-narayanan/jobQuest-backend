const { default: mongoose } = require('mongoose');
const jobapplications = require('../method/appliedJobsSchema');
const jobs = require('../method/jobsSchema');
const userprofiles = require('../method/userProfileSchema');

exports.applyJob = async (req, res) => {
    const userid = req.payload
    // console.log(userid);
    const { id } = req.params
    // console.log(id);
    try {
        const alreadyApplied = await jobapplications.findOne({ userid, jobid: id })
        if (alreadyApplied) {
            res.status(406).json(`Already applied`)
        }
        else {
            const newJob = new jobapplications({
                jobid: id,
                userid: userid
            })
            await newJob.save()
            res.status(200).json(newJob)

        }

    } catch (error) {
        res.status(401).json(`req failed due to ${error}`)
    }

}

//get applied jobs by user

exports.appliedJobs = async (req, res) => {
    const userid = req.payload
    //console.log(`userid is ${userid}`);
    try {
        const applicantJobs = await jobapplications.find({ userid })
        const jobsIds = applicantJobs.map((job) => new mongoose.Types.ObjectId(job.jobid)) //here the user id and job id is sent as strings hence need to convert into object id to match the ids
        // console.log(jobsIds);

        if (applicantJobs) {
            const result = await jobs.aggregate([
                {
                    $match: { _id: { $in: jobsIds } }
                },
                {
                    $lookup: {
                        from: 'adminprofiles',
                        localField: 'userid',
                        foreignField: 'userid',
                        as: 'recruiterDetails'
                    }
                },
                {
                    $unwind: '$recruiterDetails'
                }
            ]);
            res.status(200).json(result)
            //console.log(result);
        }


    } catch (error) {
        res.status(401).json(`req failed due to ${error}`)
    }
}

//delete applied job 

exports.deleteApplication = async (req, res) => {
    const userid = req.payload
    const { id } = req.params
    //console.log(`userid is ${id}`);
    try {        
        const deleteJob = await jobapplications.deleteOne({ userid, jobid: id })
        res.status(200).json(deleteJob)


    } catch (error) {
        res.status(401).json(`req failed due to ${error}`)
    }
}

//to get applicants of each job for recruiter
exports.JobApplicants = async (req, res) => {
    const userid = req.payload
   // console.log(userid);
    const { id } = req.params
   // console.log(id);
    try {
        const jobs = await jobapplications.find({ jobid: id })
       // console.log(jobs);
        if (jobs) {

            const userids = jobs.map((user) => user.userid);
            const applicants = await userprofiles.find({ userid:{ $in:userids} });
            res.status(200).json({ applicants })
            //console.log(applicants);
        } else {
            res.status(401).json(`no applicants`)
        }

    } catch (error) {
        res.status(401).json(`req failed due to ${error}`)
    }

}