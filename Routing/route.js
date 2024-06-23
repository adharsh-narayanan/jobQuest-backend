const express = require('express')
//admin controller
const adminController = require('../controller/adminController')
//usercontroller
const userController = require('../controller/userController')
const jwtMiddleware = require('../middleware/jwtMiddleware')
const multerconfig = require('../middleware/multer')
const multer =require('../middleware/multer')
const jobsController=require('../controller/jobsController')
const multerUserconfig=require('../middleware/multerUser')
const savedJobsController=require('../controller/savedJobsController')
const adminProfileController=require('../controller/adminProfileController')
const userProfileController=require('../controller/userProfileController')
const appliedJobsController=require('../controller/appliedJobs')
const savedCandidatesController=require('../controller/savedCandidatesController')


//object for routing class

const router = new express.Router()





//path for admin registration

router.post('/admin/register',adminController.adminRegister)

//path for admin login
router.post('/admin/login',adminController.adminLogin)

//path to change admin password

router.put('/admin/update-password',jwtMiddleware,adminController.updateAdminPassword)

//path to add admin profile

const multerupload = multerconfig.fields([
    { name: 'companyImage'},
    { name: 'documents' }
]);

router.post('/admin/profile',jwtMiddleware,multerupload,adminProfileController.addAdminProfile)

//path to get admin profile
router.get('/profile',jwtMiddleware,adminProfileController.getAdminProfile)


//path to update admin profile


router.put('/admin/edit/:id',jwtMiddleware,multerupload,adminProfileController.updateAdmin)

//path to get all recruiters

router.get('/admin/recruiters',jwtMiddleware,adminProfileController.getAllRecruiters)



//path to post  a job

router.post('/admin/postjob',jwtMiddleware,jobsController.postJobs)

//path to get recruiter's jobs

router.get('/admin/jobs',jwtMiddleware,jobsController.getRecruiterJobs)

//path to edit job
router.put('/admin/editJob/:jobid',jwtMiddleware,jobsController.editjobs)

//path to delete job

router.delete('/admin/deleteJob/:id',jwtMiddleware,jobsController.deleteJob)
//---------------------------------------------------------------------------------------------------------------------//

//path to register User
router.post('/user/register',userController.userRegister)

//path to login user

router.post('/user/login',userController.userLogin)

//path to change user password

router.put('/user/update-password',jwtMiddleware,userController.updateUserPassword)
//path to add user profile

const multerUserupload = multerUserconfig.fields([
    { name: 'userImage'},
    { name: 'resume' }
]);

router.post('/user/profile',jwtMiddleware,multerUserupload,userProfileController.AddUserProfile)

//path to get user profile
router.get('/candidate/info',jwtMiddleware,userProfileController.getUserProfile)

//path to update user profile
router.put('/user/edit/:id',jwtMiddleware,multerUserupload,userProfileController.updateUserProfile)

//path to get all profiles
router.get('/all-candidates',jwtMiddleware,userProfileController.getAllProfiles)

//path to get home jobs

router.get('/home/jobs',jobsController.getHomejobs)

//path to get all jobs

router.get('/all-jobs',jwtMiddleware,jobsController.getAllJobs)

//path to get a single job

router.get('/view-job/:id',jobsController.getAJob)

//path to save a job

router.post('/jobs/save',jwtMiddleware,savedJobsController.saveJob) 

//path to get saved jobs()

router.get('/saved-jobs',jwtMiddleware,savedJobsController.getSavedJobs)

//to remove saved job

router.delete('/saved-jobs/remove/:id',jwtMiddleware,savedJobsController.removeSavedJob)


//path to get a single saved job

router.get('/savedjob/view-job/:id',savedJobsController.getOneSavedJob)

//path to apply a job

router.post('/user/apply/:id',jwtMiddleware,appliedJobsController.applyJob)

//path to get applied jobs

router.get('/user/applied-jobs',jwtMiddleware,appliedJobsController.appliedJobs)

//path to delete job application
router.delete('/applied-jobs/remove/:id',jwtMiddleware,appliedJobsController.deleteApplication)

//to get applicants of each job for recruiter

router.get('/admin/jobs/candidates/:id',jwtMiddleware,appliedJobsController.JobApplicants)

//to save candidate

router.post('/admin/save-candidate/:id',jwtMiddleware,savedCandidatesController.saveCandidate)

//to get saved candidates

router.get('/saved-candidates',jwtMiddleware,savedCandidatesController.getSavedCandidates)

//remove saved candidate

router.delete('/saved-candidates/remove/:id',jwtMiddleware,savedCandidatesController.removeSavedCandidate)


//to verify admin

router.put('/admin/verify/:id',jwtMiddleware,adminProfileController.verifyAdmin)






//export

module.exports = router
