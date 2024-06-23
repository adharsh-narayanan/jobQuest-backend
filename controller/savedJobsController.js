const jwt = require('jsonwebtoken');
const savedjobs = require('../method/savedJobsSchema');

//to save jobs to saved jobs
exports.saveJob = async (req, res) => {
    const applicantId = req.payload
    console.log(applicantId);

    const { id, userid, title, category, city, country, jobType, experience, education, location, salary, lastDate, description, skills, responsibilities } = req.body
    //console.log(id, userid, title, category, city, country, jobType, experience, education, location, salary, lastDate, description, skills, responsibilities);

    try {
        const existingJobs = await savedjobs.findOne({ id, applicantId })
        if (existingJobs) {
            res.status(406).json('Job already saved')
        } else {
            const savedJob = new savedjobs({
                id,
                title,
                category,
                city,
                country,
                jobType,
                experience,
                education,
                location,
                salary,
                lastDate,
                description,
                skills,
                responsibilities,
                userid, 
                applicantId

            })
            await savedJob.save()
            res.status(200).json(savedJob)

        }

    } catch (error) {
        res.status(401).json(`req failed due to ${error}`)
    }
}

//to get saved jobs

exports.getSavedJobs = async (req, res) => {
    const userid = req.payload

    try {
        const jobs = await savedjobs.find({ applicantId: userid })
        const jobsIds= jobs.map((job)=>job._id) //here the  id is mapped as object id itself hence no need to convert into object id again
        console.log(jobsIds);

        const result = await savedjobs.aggregate([
            {
                $match: { _id: { $in: jobsIds } } // Match only the jobs from the search results
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
            },
            {
                $project: {
                    'recruiterDetails.password': 0,
                    'recruiterDetails.cpassword': 0,
                    'recruiterDetails.documents': 0
                }
            }
        ]);
        res.status(200).json(result)  
        console.log(result);


    } catch (error) {
        res.status(401).json(`req failed due to ${error}`)

    }
}

//to remove saved job 
exports.removeSavedJob=async(req,res)=>{
    const {id}=req.params
    console.log(id);
    try {
        const deleteJob = await savedjobs.findByIdAndDelete({ _id: id })
        res.status(200).json(deleteJob)



    } catch (error) {
        res.status(401).json(`req failed due to ${error}`)

    }
}

//to get single job
exports.getOneSavedJob = async (req, res) => {
    const { id } = req.params
    try {
        const job = await savedjobs.findOne({ _id: id })
        const result = await savedjobs.aggregate([
            {
                $match: { _id: job._id } // Match the document by _id
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

    } catch (error) {
        res.status(401).json(`req failed due to ${error}`)
    }

}