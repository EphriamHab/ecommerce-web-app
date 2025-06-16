import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useCategory from '../hooks/useCategory';
import Layout from '../components/Layout/Layout';

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"All Categories"}>
      <div className="container py-5">
        <h2 className="text-center mb-4">Browse Product Categories</h2>
        <div className="row justify-content-center">
          {categories.map((c) => (
            <div className="col-md-4 col-sm-6 mb-4" key={c._id}>
              <div className="card shadow-sm h-100 border-0">
                <div className="card-body d-flex flex-column justify-content-between">
                  <h4 className="card-title text-primary">{c.name}</h4>
                  <p className="card-text text-muted">
                    Explore our curated collection under the {c.name} category.
                  </p>
                  <Link to={`/category/${c.slug}`} className="btn btn-outline-primary mt-3">
                    Explore {c.name}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
