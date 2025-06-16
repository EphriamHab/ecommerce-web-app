import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";
import "../styles/Homepage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `https://ecommerce-web-app-gcjn.vercel.app/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://ecommerce-web-app-gcjn.vercel.app/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //get total
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `https://ecommerce-web-app-gcjn.vercel.app/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //add to cart
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

  // loadmore
  const loadMore = async () => {
    try {
      setLoadingMore(true);
      const { data } = await axios.get(
        `https://ecommerce-web-app-gcjn.vercel.app/api/v1/product/product-list/${page}`
      );
      setLoadingMore(false);

      const updatedProducts = data?.products.map((newProduct) => {
        const existingProductIndex = products.findIndex(
          (product) => product._id === newProduct._id
        );

        if (existingProductIndex !== -1) {
          const updatedProduct = { ...products[existingProductIndex] };
          updatedProduct.quantity += newProduct.quantity;
          return updatedProduct;
        } else {
          return newProduct;
        }
      });

      setProducts([...products, ...updatedProducts]);
    } catch (error) {
      console.log(error);
      setLoadingMore(false);
    }
  };

  //filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // get filter product
  const filterProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `https://ecommerce-web-app-gcjn.vercel.app/api/v1/product/product-filters`,
        {
          checked,
          radio,
        }
      );
      setLoading(false);
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout title={"All products - Best Offers"}>
      <img
        src="/images/banner.png"
        className="banner-img"
        alt="bannerimage"
      />
      <div className="container-fluid row mt-3 home-page">
        <div className="filter-wrapper">
          <h4 className="text-center mb-4">Filter By Category</h4>
          <div className="filter-group mb-4">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
                className="filter-item"
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          <h4 className="text-center mb-4">Filter By Prices</h4>
          <Radio.Group
            onChange={(e) => setRadio(e.target.value)}
            className="d-flex flex-column mb-4"
          >
            {Prices?.map((p) => (
              <Radio key={p._id} value={p.array} className="filter-item">
                {p.name}
              </Radio>
            ))}
          </Radio.Group>

          <div className="d-flex justify-content-center">
            <button
              className="btn reset-btn"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>

        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          
          {loading ? (
            <div className="loading-container">
              <div className="loader"></div>
            </div>
          ) : (
            <div className="products-grid">
              {products?.map((p) => (
                <div className="card-container" key={p._id}>
                  <div className="card flex-column h-100">
                    <img
                      src={`https://ecommerce-web-app-gcjn.vercel.app/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body d-flex flex-column">
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
                      <div className="card-name-price mt-auto">
                        <button
                          className="btn btn-primary ms-1"
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          More Details
                        </button>
                        <button
                          className="btn btn-dark ms-1"
                          onClick={() => {
                            addToCart(p);
                          }}
                        >
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="loadmore-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
                disabled={loadingMore}
              >
                {loadingMore ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Loading...
                  </>
                ) : (
                  "Load More"
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;