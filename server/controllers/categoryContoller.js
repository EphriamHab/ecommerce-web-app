import React from 'react'
import CategoryModel from '../models/CategoryModel.js'
import slugify from 'slugify'

export const createCategoryContoller = async(req,res)=>{
  try {
    const {name} = req.body 
    if(!name){
      return res.status(401).send({
        message:"Name is Required "
      })  
    }
    const existingCategory = await CategoryModel.findOne({name});
    if(existingCategory){
      return res.status(200).send({
        success:true,
        message:"Category Already Exisits"
      }) 
    }
    const category = await new CategoryModel({name,slug:slugify(name)}).save()
    res.status(201).send({
       success:true,
       message:"New Category Created",
       category 
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        error,
        message:"Error in Category"
    })
  }  
}

// updtae category
export const updtaeCategoryController =async(req,res)=>{
    try {
        const {name} = req.body
        const {id} = req.params
        const category = await CategoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.status(200).send({
            success:true,
            message:"Category updated Successfully",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error while updating category"
        })
    }
}

//get all category
export const categoryController = async(req,res)=>{
     try {
       const category = await CategoryModel.find({})
       res.status(200).send({
        success:true,
        message:"Get All categories successfully",
        category
       })
     } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error while Fetch categories"
        })
     }
}


export const singleCategoryController = async(req,res)=>{
    try {
     const category = await CategoryModel.findOne({slug:req.params.slug}) 
     res.status(200).send({
        success:true,
        message:"Fetching category successfully",
        category
     })  
    } catch (error) { 
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error while fetching category"
        })
    }
}

//delete category controller

export const deleteCategoryController = async(req,res) =>{
    try {
        const {id} = req.params
        await CategoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:"Category deleting successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error in deleting category"
        })
    }
}