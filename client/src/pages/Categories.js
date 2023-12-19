import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import useCategory from '../hooks/useCategory'
import Layout from '../components/Layout/Layout'

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"All Categories"}>
      <div className='container'>
        <div className='row'>
          {categories.map(c => (
            <div className='col-md-6 mt-5 mb-3' key={c._id}>
              <div className='card'>
                <div className='card-body'>
                  <h5 className='card-title'>{c.name}</h5>
                  <Link to={`/category/${c.slug}`} className='btn btn-primary'>
                    Explore {c.name}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Categories