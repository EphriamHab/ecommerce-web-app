import express from 'express';
import {
    registerController,
    loginController,
    testController,
    forgotPasswordController} from '../controllers/authController.js'
import { requireSignIn,isAdmin } from '../middlewares/authMiddleware.js';

// router object

const router = express.Router();

//routing
// Register || Method post
router.post('/register',registerController)

// login || Post
router.post('/login', loginController)

//Forgot Password ||Post
router.post('/forgot-password', forgotPasswordController)


// test routes
router.get('/test',requireSignIn,isAdmin,testController)

//protected User route auth
router.get('/user-auth', requireSignIn, (req,res) =>{
    res.status(200).send({ok:true}); 
})

//protected Admin route auth
router.get('/admin-auth', requireSignIn, isAdmin, (req,res) =>{
    res.status(200).send({ok:true}); 
})
export default router