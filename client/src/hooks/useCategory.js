import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory() {
  const [categories, setCatgories] = useState([]);

  //get cat
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `https://ecommerce-web-app-gcjn.vercel.app/api/v1/category/get-category`
      );
      setCatgories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}
