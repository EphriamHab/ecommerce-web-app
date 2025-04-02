import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory(){
   const [categories, setCatgories] = useState([])

   //get cat
   const getCategories = async()=>{
      try {
        const {data} = await axios.get(`${import.meta.env.REACT_APP_BACKEND_BASEURL}/api/v1/category/get-category`)
        setCatgories(data?.category)
      } catch (error) {
        console.log(error)
      }
   }

   useEffect(()=>{
    getCategories();
   },[]);
   
   return categories;
}