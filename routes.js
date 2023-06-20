const express = require('express');
const router = express.Router();
const auth = require('./src/api/auth/auth');
const user = require('./src/api/user/user');
const form = require('./src/api/formHandler/fillPDF')
const passport = require('passport');
const {deleteProject, deleteProduct} = require('./src/api/delete/deleteFunctions')

// passport.authenticate('jwt', { session: false }),


// Auth //////////////////////////////////////////////
router.post('/registration', async (req,res,next) =>{    
   await auth.registration(req,res,next)
});

router.get(`getPools`, async (req,res,next)=>{
  await auth.getPools(req,res,next);
});

router.post('/login', async (req,res,next) =>{    
    await auth.login(req,res,next);
});

router.post('/deleteProfile', passport.authenticate('jwt', { session: false }), async (req,res,next) =>{    
    await auth.deleteProfile(req,res,next);
});

router.post('/updateProfile', passport.authenticate('jwt', { session: false }), async (req,res,next) =>{    
    await auth.updateProfile(req,res,next);
});

router.post('/showProfile', passport.authenticate('jwt', { session: false }), async (req,res,next) =>{    
    await auth.showProfile(req,res,next);
});

//api not tested
router.post('/updateToPremium', passport.authenticate('jwt', { session: false }), async (req,res,next) =>{    
    await auth.updateToPremium(req,res,next);
});





// Users /////////////////////////////////////////////
router.get('/workers', passport.authenticate('jwt', { session: false }), async (req,res,next) =>{    
    await user.workers(req,res,next);
});

router.post('/:Uid/createProject', passport.authenticate('jwt', { session: false }),async(req, res, next)=>{
    await user.createProject(req,res,next);
})

router.get('/userFolder/:Uid', passport.authenticate('jwt', { session: false }), async (req,res,next)=>{
    await user.userFolder(req,res,next);
})

router.get('/userFolder/update/:Uid/:Content', passport.authenticate('jwt', { session: false }), async (req,res,next)=>{
    await user.userDateForUpdate(req,res,next);
})

//get porject content [FolderContent].js Page
router.get(`/userFolder/:Uid/:Content`, passport.authenticate('jwt', { session: false }),async (req,res,next)=>{
	await user.getProjectContent(req,res,next);
});

router.post(`/userFolder/:Uid/:Content/addProduct`, passport.authenticate('jwt', { session: false }),async (req,res,next)=>{
	await user.addProduct(req,res,next);
});

router.post('/:Uid/updateProject', passport.authenticate('jwt', { session: false }),async(req, res, next)=>{
    await user.updatedProject(req,res,next);
})

router.post(`/deleteProjectContentElement`, passport.authenticate('jwt', { session: false }),async (req,res,next)=>{
	await user.deleteProjectContentElement(req,res,next);
});
// router.post(`/formSign`, passport.authenticate('jwt', { session: false }),async (req,res,next)=>{
// 	await form.fillPDF(req,res,next);
    
// });



router.post(`/deleteProject`, passport.authenticate('jwt', { session: false }),async (req,res,next)=>{
	await deleteProject(req,res,next);
    
});

router.get('/getAllProducts', passport.authenticate('jwt', { session: false }), async (req,res,next) =>{    
    await user.getAllProducts(req,res,next);
});




// Company ///////////////////////////////////////

router.get('/companyFolder/:Uid', passport.authenticate('jwt', { session: false }), async (req,res,next)=>{
    await user.companyDash(req,res,next);
})

router.post('/:Uid/createProduct', passport.authenticate('jwt', { session: false }),async(req, res, next)=>{
    await user.createProduct(req,res,next);
})

router.post(`/deleteProduct`, passport.authenticate('jwt', { session: false }),async (req,res,next)=>{
	await deleteProduct(req,res,next);
    
});




module.exports = router;



