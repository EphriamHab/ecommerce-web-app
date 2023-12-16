import slugify from "slugify"
import ProductModel from "../models/ProductModel.js"
import CategoryModel from "../models/CategoryModel.js"
import fs from 'fs'
import { populate } from "dotenv"

export const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files

        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" })
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !price:
                return res.status(500).send({ error: "Price is Required" });
            case !category:
                return res.status(500).send({ error: "Category is Required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" });
            case photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({ error: "Photo is Required and should be less than 1mb" });
        }
        const products = new ProductModel({ ...req.fields, slug: slugify(name) })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success: true,
            message: "Product Created Successfully",
            products,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating product"
        })
    }

}

// get product controller

export const getProductController = async (req, res) => {
    try {
        const products = await ProductModel
            .find({})
            .populate('category')
            .select("-photo")
            .limit(12)
            .sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            counTotal: products.length,
            message: "Product read successfully",
            products,

        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in Fetching products"
        })
    }
};

export const getSingleProductController = async (req, res) => {
    try {
        const product = await ProductModel
            .findOne({ slug: req.params.slug })
            .select("-photo")
            .populate('category')
        res.status(200).send({
            success: true,
            message: "Product fetch successfully",
            product,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in Fetching product"
        })
    }
};

// get product photo

export const productPhotoController = async (req, res) => {
    try {
        const product = await ProductModel
            .findById(req.params.pid)
            .select("photo")
        if (product.photo.data) {
            res.set('Content-type', product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting photo"
        })
    }
};

// delete product

export const deleteProductController = async (req, res) => {
    try {
        await ProductModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            success: true,
            message: "Product Deleted successfully"
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error while deleting product"
        })
    }
}

export const updateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files

        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" })
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !price:
                return res.status(500).send({ error: "Price is Required" });
            case !category:
                return res.status(500).send({ error: "Category is Required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" });
            case photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({ error: "Photo is Required and should be less than 1mb" });
        }
        const products = await ProductModel.findByIdAndUpdate(req.params.pid, {
            ...req.fields, slug: slugify(name)
        }, { new: true }
        )
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success: true,
            message: "Product Updated Successfully",
            products
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error: error.message || "Internal Server Error",
            message: "Error in updating product",
        })
    }
}

//product filter controllers

export const productFlitersController = async (req, res) => {
    try {
        const { checked, radio } = req.body
        let args = {}
        if (checked.length > 0) args.category = checked
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
        const products = await ProductModel.find(args);
        res.status(200).send({
            success: true,
            products,
        });

    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            error,
            message: "Error in Filtering Product"
        })
    }
}

export const productCountController = async (req,res) => {
    try {
        const total = await ProductModel.find({}).estimatedDocumentCount()
        res.status(200).send({
            success: true,
            message: "product counted successfully",
            total,
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            error,
            message: "Error in product count"
        })
    }
}

export const productListController = async(req,res) => {
    try {
        const perPage = 6;
        const page = req.params.page ? req.params.page : 1
        const products = await ProductModel
            .find({})
            .select("-photo")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });
            res.status(200).send({
                success:true,
                message:"Listed pages",
                products,
            })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            error,
            message: "Error in product list"
        })
    }
}

export const searchProductController = async(req,res) =>{
     try {
        const {keyword} = req.params
        const results = await ProductModel.find({
            $or:[
                {name:{$regex:keyword, $options:"i"}},
                {description:{$regex:keyword, $options:"i"}}
            ]
        }).select("-photo")
        res.json(results)
     } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:"Error in Search Product",
            error
        })
     }
}

export const relatedProductController = async(req,res)=>{
    try {
      const {pid,cid} = req.params;
      const products = await ProductModel
      .find({
        category:cid,
        _id:{$ne:pid}
      })
      .select("-photo")
      .limit(3)
      .populate("category")
      res.status(200).send({
        success:true,
        products,
      });
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:"Error in Finding Related Product",
            error
        })
    }
}

export const productCategoryController = async(req,res)=>{
        try {
          const category = await CategoryModel.findOne({slug:req.params.slug})
          const products = await  ProductModel.find({category}).populate('category')
          res.status(200).send({
             success:true,
             category,
             products,

          })
        } catch (error) {
            console.log(error)
            res.status(400).send({
                success:false,
                error,
                message:"Error while getting product "
            })
        }
}