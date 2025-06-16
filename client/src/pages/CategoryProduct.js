import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/CategoryProductStyles.css";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    if (params?.slug) getProductByCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.slug]);

  const getProductByCategory = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://ecommerce-web-app-gcjn.vercel.app/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mt-3 category">
        <h4 className="text-center">
          Category - {loading ? "Loading..." : category?.name}
        </h4>
        {!loading && (
          <h6 className="text-center">{products.length} result(s) found</h6>
        )}
        <div className="row">
          <div className="col-md-9 offset-1">
            {loading ? (
              <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="d-flex flex-wrap">
                {products.map((p) => (
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
                        <button className="btn btn-secondary ms-1">
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
