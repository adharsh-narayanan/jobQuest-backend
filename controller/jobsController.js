const jwt = require('jsonwebtoken');
const jobs = require('../method/jobsSchema');
const recruiters = require('../method/adminSchema');


//to post jobs
exports.postJobs = async (req, res) => {
    console.log(req.body);
    const userid = req.payload

    const { title, category, city, country, jobType, experience, education, location, salary, lastDate, description, skills, responsibilities } = req.body
    console.log(userid, title, category, city, country, jobType, experience, education, location, salary, lastDate, description, skills, responsibilities);
    try {
        const newJob = new jobs({
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
            userid: userid

        })
        await newJob.save()
        res.status(200).json(newJob)

    } catch (error) {
        res.status(401).json(`req failed due to ${error}`)

    }
}

//to get jobs with respect to admins
exports.getRecruiterJobs = async (req, res) => {
    try {
        const userid = req.payload
        const recruiterJob = await jobs.find({ userid: userid })
        res.status(200).json(recruiterJob)




    } catch (error) {
        res.status(401).json(`req failed due to ${error}`)

    }
}

//to edit jobs

exports.editjobs = async (req, res) => {
    const { jobid } = req.params
    const userid = req.payload
    const { title, category, city, country, jobType, experience, education, location, salary, lastDate, description, skills, responsibilities } = req.body
    console.log(userid, title, category, city, country, jobType, experience, education, location, salary, lastDate, description, skills, responsibilities);
    try {
        const editJob = await jobs.findByIdAndUpdate(
            { _id: jobid },
            {
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
                userid: userid
            },
            { new: true }
        )
        await editJob.save()
        res.status(200).json(editJob)
    } catch (error) {
        res.status(401).json(`req failed due to ${error}`)
    }


}

//to delete jobs
exports.deleteJob = async (req, res) => {
    try {
        const { id } = req.params
        const deleteJob = await jobs.findByIdAndDelete({ _id: id })
        res.status(200).json(deleteJob)



    } catch (error) {
        res.status(401).json(`req failed due to ${error}`)

    }
}

//to get profile jobs

exports.getHomejobs = async (req, res) => {
    try {
        const homeJobs = await jobs.aggregate([
            {
                $lookup: {
                    from: 'adminprofiles', // collection name in the database
                    localField: 'userid',
                    foreignField: 'userid',
                    as: 'recruiterDetails'
                }
            },
            {
                $unwind: '$recruiterDetails'
            },
           /*  {
                $project: {
                    // Exclude specific recruiter fields
                    'recruiterDetails.password': 0,
                    'recruiterDetails.cpassword': 0,
                    'recruiterDetails.documents': 0,


                }
            }, */
            {
                $limit: 6  // Limit to the first 6 documents
            }

        ])
        res.status(200).json(homeJobs)
    } catch (error) {
        res.status(401).json(`req failed due to ${error}`)

    }
}

//to get all jobs

exports.getAllJobs = async (req, res) => {
    const searchKey = req.query //to access query parameter 
    //console.log(searchKey);

    let query = {};


    if (searchKey) {
        if (searchKey.search) {
            query.$or = [
                { title: { $regex: new RegExp(searchKey.search, 'i') } },
                { city: { $regex: new RegExp(searchKey.search, 'i') } },
                { country: { $regex: new RegExp(searchKey.search, 'i') } },
                { education: { $regex: new RegExp(searchKey.search, 'i') } },

            ];
        }
        if (searchKey.category) {
            query.category = { $regex: new RegExp(searchKey.category, 'i') };
        }
        if (searchKey.jobType) {
            query.jobType = { $regex: new RegExp(searchKey.jobType, 'i') };

        }
        if (searchKey.location) {
            query.location = { $regex: new RegExp(searchKey.location, 'i') };
        }
        if (searchKey.experience) {
            query.experience = { $regex: new RegExp(searchKey.experience, 'i') };
        }
    }


    try {
        const searchJobs = await jobs.find(query);

        // Use the search results' IDs in the aggregation pipeline
        const jobIds = searchJobs.map(job => job._id);
        const allJobs = await jobs.aggregate([
            {
                $match: { _id: { $in: jobIds } } // Match only the jobs from the search results
            },
            {
                $lookup: {
                    from: 'adminprofiles', // collection name in the database
                    localField: 'userid',
                    foreignField: 'userid',
                    as: 'recruiterDetails'
                }
            },
            {
                $unwind: '$recruiterDetails'  //takes each recruiter with respect to the post
            },
          
        ])
        res.status(200).json(allJobs)

    } catch (error) {
        res.status(401).json(`req failed due to ${error}`)
    }
}


//to get a single job

exports.getAJob = async (req, res) => {
    const { id } = req.params
    try {
        const job = await jobs.findOne({ _id: id })
        const result = await jobs.aggregate([
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
            },
            
        ]);
        res.status(200).json(result)

    } catch (error) {
        res.status(401).json(`req failed due to ${error}`)
    }

}

