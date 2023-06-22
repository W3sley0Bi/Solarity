// const express = require('express');
// const router = express.Router();
// const auth = require('./src/api/auth/auth');
// const user = require('./src/api/user/user');
// const form = require('./src/api/formHandler/fillPDF')
// const passport = require('passport');
// const {deleteProject, deleteProduct} = require('./src/api/delete/deleteFunctions')

// // passport.authenticate('jwt', { session: false }),



// // Auth //////////////////////////////////////////////
// router.post('/registration', async (req,res,next) =>{    
//    await auth.registration(req,res,next)
// });

// router.get(`getPools`, async (req,res,next)=>{
//   await auth.getPools(req,res,next);
// });

// router.post('/login', async (req,res,next) =>{    
//     await auth.login(req,res,next);
// });

// router.post('/deleteProfile', passport.authenticate('jwt', { session: false }), async (req,res,next) =>{    
//     await auth.deleteProfile(req,res,next);
// });

// router.post('/updateUsername', passport.authenticate('jwt', { session: false }), async (req,res,next) =>{    
//     await auth.updateUsername(req,res,next);
// });
// router.post('/updateEmail', passport.authenticate('jwt', { session: false }), async (req,res,next) =>{    
//     await auth.updateEmail(req,res,next);
// });
// router.post('/updatePassword', passport.authenticate('jwt', { session: false }), async (req,res,next) =>{    
//     await auth.updatePassword(req,res,next);
// });

// router.post('/showProfile', passport.authenticate('jwt', { session: false }), async (req,res,next) =>{    
//     await auth.showProfile(req,res,next);
// });

// router.post('/updateToPremium', passport.authenticate('jwt', { session: false }), async (req,res,next) =>{    
//     await auth.updateToPremium(req,res,next);
// });


// router.get('/showSoftDeleteAccounts', async (req,res,next) =>{    
//     await auth.showSoftDeleteAccounts(req,res,next);
// });


// // Users /////////////////////////////////////////////
// router.get('/workers', passport.authenticate('jwt', { session: false }), async (req,res,next) =>{    
//     await user.workers(req,res,next);
// });

// router.post('/:Uid/createProject', passport.authenticate('jwt', { session: false }),async(req, res, next)=>{
//     await user.createProject(req,res,next);
// })

// router.get('/userFolder/:Uid', passport.authenticate('jwt', { session: false }), async (req,res,next)=>{
//     await user.userFolder(req,res,next);
// })

// router.get('/openUserFolder/:Uid', passport.authenticate('jwt', { session: false }), async (req,res,next)=>{
//     await user.opendUserFolder(req,res,next);
// })

// router.get('/closedUserFolder/:Uid', passport.authenticate('jwt', { session: false }), async (req,res,next)=>{
//     await user.closedUserFolder(req,res,next);
// })


// router.get('/userFolder/update/:Uid/:Content', passport.authenticate('jwt', { session: false }), async (req,res,next)=>{
//     await user.userDateForUpdate(req,res,next);
// })

// //get porject content [FolderContent].js Page
// router.get(`/userFolder/:Uid/:Content`, passport.authenticate('jwt', { session: false }),async (req,res,next)=>{
// 	await user.getProjectContent(req,res,next);
// });

// router.post(`/userFolder/:Uid/:Content/addProduct`, passport.authenticate('jwt', { session: false }),async (req,res,next)=>{
// 	await user.addProduct(req,res,next);
// });

// router.post(`/userFolder/:Uid/:Content/updateProduct`, passport.authenticate('jwt', { session: false }),async (req,res,next)=>{
// 	await user.updatedProduct(req,res,next);
// });

// router.post('/:Uid/updateProject', passport.authenticate('jwt', { session: false }),async(req, res, next)=>{
//     await user.updatedProject(req,res,next);
// })

// router.post(`/deleteProjectContentElement`, passport.authenticate('jwt', { session: false }),async (req,res,next)=>{
// 	await user.deleteProjectContentElement(req,res,next);
// });
// // router.post(`/formSign`, passport.authenticate('jwt', { session: false }),async (req,res,next)=>{
// // 	await form.fillPDF(req,res,next);
    
// // });



// router.post(`/deleteProject`, passport.authenticate('jwt', { session: false }),async (req,res,next)=>{
// 	await deleteProject(req,res,next);
    
// });

// router.get('/getAllProducts', passport.authenticate('jwt', { session: false }), async (req,res,next) =>{    
//     await user.getAllProducts(req,res,next);
// });




// // Company ///////////////////////////////////////

// router.get('/companyFolder/:Uid', passport.authenticate('jwt', { session: false }), async (req,res,next)=>{
//     await user.companyDash(req,res,next);
// })

// router.post('/:Uid/createProduct', passport.authenticate('jwt', { session: false }),async(req, res, next)=>{
//     await user.createProduct(req,res,next);
// })

// router.post(`/deleteProduct`, passport.authenticate('jwt', { session: false }),async (req,res,next)=>{
// 	await deleteProduct(req,res,next);
    
// });




// module.exports = router;



const express = require('express');
const router = express.Router();
const auth = require('./src/api/auth/auth');
const user = require('./src/api/user/user');
const form = require('./src/api/formHandler/fillPDF')
const passport = require('passport');
const {deleteProject, deleteProduct} = require('./src/api/delete/deleteFunctions')

/**
 * @swagger
 * components:
 *   schemas:
 *     UserRegistration:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - role
 *       example:
 *         username: Michael
 *         password: 12se3ed
 *         email: MichaelJordan@nba.com
 *         role: 2
 * 
 */

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for user authentication
 */

/**
 * @swagger
 * /registration:
 *   post:
 *     summary: User registration
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistration'
 *     responses:
 *       200:
 *         description: User registration successful
 *       500:
 *         description: Internal server error
 */
router.post('/registration', async (req,res,next) =>{    
   await auth.registration(req,res,next)
});

/**
 * @swagger
 * components:
 *   schemas:
 *     UserLogin:
 *       type: object
 *       required:
 *         - name
 *         - password
 *       example:
 *         username: Michael
 *         password: 12se3ed
 */


/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       500:
 *         description: Internal server error
 */
router.post('/login', async (req,res,next) =>{    
    await auth.login(req,res,next);
});

//securitySchema

/**
 * @swagger
 * 
 * components:
 *      securitySchemes:
 *          bearerAuth:          
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT 
 * 
 * 
 * 
 * 
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserDelete:
 *       type: object
 *       required:
 *         - Uid
 *       properties:
 *         Uid:
 *           type: int
 *           description: User ID
 *       example:
 *         Uid: 15
 */

/**
 * @swagger
 * /deleteProfile:
 *   post:
 *     summary: Delete user profile
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserDelete'
 *     responses:
 *       200:
 *         description: User profile deleted successfully
 *       401:
 *         description: Unauthorized request
 *       500:
 *         description: Internal server error
 */
router.post('/deleteProfile', passport.authenticate('jwt', { session: false }), async (req,res,next) =>{    
    await auth.deleteProfile(req,res,next);
});

/**
 * @swagger
 * components:
 *   schemas:
 *     updateUsername:
 *       type: object
 *       required:
 *         - uid
 *         - data
 *       properties:
 *         uid:
 *           type: int
 *           description: User ID
 *         data:
 *           type: int
 *           description: User data to modify
 *       example:
 *         uid: 15
 *         data: "Jordan"
 *         
 */



/**
 * @swagger
 * /updateUsername:
 *   post:
 *     summary: Update user's username
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updateUsername'
 *     responses:
 *       200:
 *         description: Username updated successfully
 *       401:
 *         description: Unauthorized request
 *       500:
 *         description: Internal server error
 */
router.post('/updateUsername', passport.authenticate('jwt', { session: false }), async (req,res,next) =>{    
    await auth.updateUsername(req,res,next);
});

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateEmail:
 *       type: object
 *       required:
 *         - uid
 *         - data
 *       properties:
 *         uid:
 *           type: int
 *           description: User ID
 *         data:
 *           type: int
 *           description: User data to modify
 *       example:
 *         uid: 15
 *         data: "Lebron@lakers.com"
 *         
 */

/**
 * @swagger
 * /updateEmail:
 *   post:
 *     summary: Update user's email
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateEmail'
 *     responses:
 *       200:
 *         description: Email updated successfully
 *       401:
 *         description: Unauthorized request
 *       500:
 *         description: Internal server error
 */
router.post('/updateEmail', passport.authenticate('jwt', { session: false }), async (req,res,next) =>{    
    await auth.updateEmail(req,res,next);
});

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdatePassword:
 *       type: object
 *       required:
 *         - uid
 *         - data
 *       properties:
 *         uid:
 *           type: int
 *           description: User ID
 *         data:
 *           type: int
 *           description: User data to modify
 *       example:
 *         uid: 15
 *         data: "12345"
 *         
 */

/**
 * @swagger
 * /updatePassword:
 *   post:
 *     summary: Update user's password
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePassword'
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       401:
 *         description: Unauthorized request
 *       500:
 *         description: Internal server error
 */
router.post('/updatePassword', passport.authenticate('jwt', { session: false }), async (req,res,next) =>{    
    await auth.updatePassword(req,res,next);
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Uid:
 *       type: object
 *       required:
 *         - Uid
 *       properties:
 *         uid:
 *           type: int
 *           description: User ID
 *         data:
 *           type: int
 *           description: User data to modify
 *       example:
 *         Uid: 15
 *         
 */

/**
 * @swagger
 * /showProfile:
 *   post:
 *     summary: Show user profile
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Uid'
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Unauthorized request
 *       500:
 *         description: Internal server error
 */
router.post('/showProfile', passport.authenticate('jwt', { session: false }), async (req,res,next) =>{    
    await auth.showProfile(req,res,next);
});

/**
 * @swagger
 * components:
 *   schemas:
 *     uid:
 *       type: object
 *       required:
 *         - uid
 *       properties:
 *         uid:
 *           type: int
 *           description: User ID
 *         data:
 *           type: int
 *           description: User data to modify
 *       example:
 *         uid: 15
 *         
 */

/**
 * @swagger
 * /updateToPremium:
 *   post:
 *     summary: Update user to premium
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/uid'
 *     responses:
 *       200:
 *         description: User updated to premium successfully
 *       401:
 *         description: Unauthorized request
 *       500:
 *         description: Internal server error
 */
router.post('/updateToPremium', passport.authenticate('jwt', { session: false }), async (req,res,next) =>{    
    await auth.updateToPremium(req,res,next);
});

/**
 * @swagger
 * /showSoftDeleteAccounts:
 *   get:
 *     summary: Show soft-deleted accounts
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Soft-deleted accounts retrieved successfully
 *       500:
 *         description: Internal server error
 */
router.get('/showSoftDeleteAccounts', async (req,res,next) =>{    
    await auth.showSoftDeleteAccounts(req,res,next);
});

// I'm here

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for user management
 */

/**
 * @swagger
 * /workers:
 *   get:
 *     summary: Get workers
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved workers
 *       401:
 *         description: Unauthorized request
 *       500:
 *         description: Internal server error
 */
router.get('/workers', passport.authenticate('jwt', { session: false }), async (req,res,next) =>{    
    await user.workers(req,res,next);
});

/**
 * @swagger
 * /:Uid/createProject:
 *   post:
 *     summary: Create a project
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: Uid
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       200:
 *         description: Project created successfully
 *       401:
 *         description: Unauthorized request
 *       500:
 *         description: Internal server error
 */
router.post('/:Uid/createProject', passport.authenticate('jwt', { session: false }),async(req, res, next)=>{
    await user.createProject(req,res,next);
});

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 */

/**
 * @swagger
 * /userFolder/{Uid}:
 *   get:
 *     summary: Get user folder
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: Uid
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User folder retrieved successfully
 *       401:
 *         description: Unauthorized request
 *       500:
 *         description: Internal server error
 */
router.get('/userFolder/:Uid', passport.authenticate('jwt', { session: false }), async (req,res,next)=>{
    await user.userFolder(req,res,next);
});

/**
 * @swagger
 * /openUserFolder/{Uid}:
 *   get:
 *     summary: Open user folder
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: Uid
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User folder opened successfully
 *       401:
 *         description: Unauthorized request
 *       500:
 *         description: Internal server error
 */
router.get('/openUserFolder/:Uid', passport.authenticate('jwt', { session: false }), async (req,res,next)=>{
    await user.opendUserFolder(req,res,next);
});

/**
 * @swagger
 * /closedUserFolder/{Uid}:
 *   get:
 *     summary: Closed user folder
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: Uid
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User folder closed successfully
 *       401:
 *         description: Unauthorized request
 *       500:
 *         description: Internal server error
 */
router.get('/closedUserFolder/:Uid', passport.authenticate('jwt', { session: false }), async (req,res,next)=>{
    await user.closedUserFolder(req,res,next);
});

/**
 * @swagger
 * /userFolder/update/{Uid}/{Content}:
 *   get:
 *     summary: Update user folder
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: Uid
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *       - in: path
 *         name: Content
 *         required: true
 *         description: Content
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User folder updated successfully
 *       401:
 *         description: Unauthorized request
 *       500:
 *         description: Internal server error
 */
router.get('/userFolder/update/:Uid/:Content', passport.authenticate('jwt', { session: false }), async (req,res,next)=>{
    await user.userDateForUpdate(req,res,next);
});


/**
 * @swagger
 * /userFolder/{Uid}/{Content}:
 *   get:
 *     summary: Get project content
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: Uid
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *       - in: path
 *         name: Content
 *         schema:
 *           type: string
 *         required: true
 *         description: The project content
 *     responses:
 *       200:
 *         description: Successfully retrieved project content
 *       401:
 *         description: Unauthorized request
 *       500:
 *         description: Internal server error
 */
router.get(`/userFolder/:Uid/:Content`, passport.authenticate('jwt', { session: false }),async (req,res,next)=>{
	await user.getProjectContent(req,res,next);
});

/**
 * @swagger
 * /userFolder/{Uid}/{Content}/addProduct:
 *   post:
 *     summary: Add a product to project content
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: Uid
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *       - in: path
 *         name: Content
 *         schema:
 *           type: string
 *         required: true
 *         description: The project content
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product added successfully
 *       401:
 *         description: Unauthorized request
 *       500:
 *         description: Internal server error
 */
router.post(`/userFolder/:Uid/:Content/addProduct`, passport.authenticate('jwt', { session: false }),async (req,res,next)=>{
	await user.addProduct(req,res,next);
});

/**
 * @swagger
 * /userFolder/{Uid}/{Content}/updateProduct:
 *   post:
 *     summary: Update a product in project content
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: Uid
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *       - in: path
 *         name: Content
 *         schema:
 *           type: string
 *         required: true
 *         description: The project content
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       401:
 *         description: Unauthorized request
 *       500:
 *         description: Internal server error
 */
router.post(`/userFolder/:Uid/:Content/updateProduct`, passport.authenticate('jwt', { session: false }),async (req,res,next)=>{
	await user.updatedProduct(req,res,next);
});

/**
 * @swagger
 * /:Uid/updateProject:
 *   post:
 *     summary: Update a project
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: Uid
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       401:
 *         description: Unauthorized request
 *       500:
 *         description: Internal server error
 */
router.post(`/:Uid/updateProject`, passport.authenticate('jwt', { session: false }),async(req, res, next)=>{
    await user.updatedProject(req,res,next);
});


/**
 * @swagger
 * /deleteProjectContentElement:
 *   post:
 *     summary: Delete a project content element
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteProjectContentElement'
 *     responses:
 *       200:
 *         description: Project content element deleted successfully
 *       401:
 *         description: Unauthorized request
 *       500:
 *         description: Internal server error
 */
router.post(`/deleteProjectContentElement`, passport.authenticate('jwt', { session: false }),async (req,res,next)=>{
	await user.deleteProjectContentElement(req,res,next);
});

/**
 * @swagger
 * /deleteProject:
 *   post:
 *     summary: Delete a project
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteProject'
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       401:
 *         description: Unauthorized request
 *       500:
 *         description: Internal server error
 */
router.post(`/deleteProject`, passport.authenticate('jwt', { session: false }),async (req,res,next)=>{
	await deleteProject(req,res,next);
});

/**
 * @swagger
 * /getAllProducts:
 *   get:
 *     summary: Get all products
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *        200:
 *          description: Successfully retrieved all products
 *        401:
 *          description: Unauthorized request
 *        500:
 *          description: Internal server error
 */
router.get('/getAllProducts', passport.authenticate('jwt', { session: false }), async (req,res,next) =>{    
    await user.getAllProducts(req,res,next);
});

/**
 * @swagger
 * /companyFolder/{Uid}:
 *   get:
 *     summary: Get company folder
 *     tags: [Company]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: Uid
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Successfully retrieved company folder
 *       401:
 *         description: Unauthorized request
 *       500:
 *         description: Internal server error
 */
router.get('/companyFolder/:Uid', passport.authenticate('jwt', { session: false }), async (req,res,next)=>{
    await user.companyDash(req,res,next);
});

/**
 * @swagger
 * /{Uid}/createProduct:
 *   post:
 *     summary: Create a product
 *     tags: [Company]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: Uid
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProduct'
 *     responses:
 *       200:
 *         description: Product created successfully
 *       401:
 *         description: Unauthorized request
 *       500:
 *         description: Internal server error
 */
router.post('/:Uid/createProduct', passport.authenticate('jwt', { session: false }),async(req, res, next)=>{
    await user.createProduct(req,res,next);
});

/**
 * @swagger
 * /deleteProduct:
 *   post:
 *     summary: Delete a product
 *     tags: [Company]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteProduct'
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       401:
 *         description: Unauthorized request
 *       500:
 *         description: Internal server error
 */
router.post(`/deleteProduct`, passport.authenticate('jwt', { session: false }),async (req,res,next)=>{
	await deleteProduct(req,res,next);
});

module.exports = router;




