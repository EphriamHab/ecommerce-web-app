import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import {
    createProductController,
    getProductController,
    getSingleProductController,
    productPhotoController,
    deleteProductController,
    updateProductController,
    productFlitersController,
    productCountController,
    productListController,
    searchProductController,
    relatedProductController,
    productCategoryController,
    braintreeTokenController,
    brainTreePaymentController,
} from '../controllers/productController.js';
import formidable from 'express-formidable';
import braintree from 'braintree';

const router = express.Router();

// create product routes
router.post(
    '/create-product',
    requireSignIn,
    isAdmin,
    formidable(),
    createProductController)

// update product
router.put(
    '/update-product/:pid',
    requireSignIn,
    isAdmin,
    formidable(),
    updateProductController)

// get products
router.get('/get-product', getProductController)

//single product
router.get('/get-product/:slug', getSingleProductController)

//get photo
router.get('/product-photo/:pid', productPhotoController)

//delete product
router.delete('/delete-product/:pid',
    requireSignIn,
    isAdmin,
    deleteProductController)

// filter product
router.post('/product-filters',productFlitersController)

//product count 

router.get('/product-count', productCountController)

//product list
router.get('/product-list/:page', productListController)

//search product

router.get('/search/:keyword', searchProductController)

//similar product

router.get('/related-product/:pid/:cid', relatedProductController)

//category wise product
router.get("/product-category/:slug", productCategoryController);
router.get('/')

//Payments routes
//token
router.get('/braintree/token', braintreeTokenController)

//payments
router.post('/braintree/payment', requireSignIn, brainTreePaymentController)

export default router