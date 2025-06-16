import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [cart, setCart] = useCart();
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [loadingSimilar, setLoadingSimilar] = useState(false);

  //initial details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://ecommerce-web-app-gcjn.vercel.app/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = (product) => {
    const updatedCart = [...cart];
    const existingItem = updatedCart.find((item) => item._id === product._id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item Added to cart");
  };

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      setLoadingSimilar(true);
      const { data } = await axios.get(
        `https://ecommerce-web-app-gcjn.vercel.app/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
      setLoadingSimilar(false);
    } catch (error) {
      console.log(error);
      setLoadingSimilar(false);
    }
  };

  return (
    <Layout>
      <div className="row container product-details">
        <div className="col-md-6">
          <img
            src={`https://ecommerce-web-app-gcjn.vercel.app/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-center">Product Details</h1>
          <h6>Name: {product.name}</h6>
          <h6>Description: {product.description}</h6>
          <h6>Price: {product.price}</h6>
          <h6>Category: {product?.category?.name}</h6>
          <button
            className="btn btn-secondary ms-1"
            onClick={() => addToCart(product)}
          >
            ADD TO CART
          </button>
        </div>
      </div>

      <hr />

      <div className="row container similar-products">
        <h4>Similar Products ➡️</h4>

        {loadingSimilar || relatedProducts === null ? (
          <div
            className="d-flex justify-content-center align-items-center w-100"
            style={{ minHeight: "150px" }}
          >
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : relatedProducts.length === 0 ? (
          <p className="text-center">No Similar Products found</p>
        ) : (
          <div className="d-flex flex-wrap">
            {relatedProducts.map((p) => (
              <div className="card m-2" key={p._id}>
                <img
                  src={`https://ecommerce-web-app-gcjn.vercel.app/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </h5>
                  </div>
                  <p className="card-text">
                    {p.description.substring(0, 60)}...
                  </p>
                  <div className="card-name-price">
                    <button
                      className="btn btn-info ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetails;
