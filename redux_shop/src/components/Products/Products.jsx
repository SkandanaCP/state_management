import React from 'react'
import { Link } from 'react-router-dom'
import Category from './Category'
import ProductList from './ProductList'
const Products = () => {
  return (
    <>
    <div className='container'>
    <Link to='/'></Link>
    <div className='row'>
      <div className='col-3'>
        <Category/>
      </div>
      <div className='col-9'>
        <ProductList/>
      </div>
    </div>
    </div>
    </>
   
  )
}

export default Products