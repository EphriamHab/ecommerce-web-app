import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
    createCategoryContoller,
    updtaeCategoryController,
    categoryController,
    deleteCategoryController,
    singleCategoryController} from "../controllers/categoryContoller.js"
const router = express.Router()

//create category routes
router.post(
    '/create-category',
     requireSignIn,
     isAdmin, 
     createCategoryContoller)

// update category route
router.put(
    '/update-category/:id',
    requireSignIn,
    isAdmin,
    updtaeCategoryController)
export default router

//getAll category
router.get('/get-category', categoryController);

//single category
router.get('/single-category:slug', singleCategoryController)

//delete category 

router.delete(
    '/delete-category/:id',
     requireSignIn,
     isAdmin,deleteCategoryController)