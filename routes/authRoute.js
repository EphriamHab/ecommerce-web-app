import express from 'express';
import {
    registerController,
    loginController,
    testController} from '../controllers/authController.js'
import { requireSignIn,isAdmin } from '../middlewares/authMiddleware.js';

// router object

const router = express.Router();

//routing
// Register || Method post
router.post('/register',registerController)

// login || Post
router.post('/login', loginController)

// test routes
router.get('/test',requireSignIn,isAdmin,testController)
export default router