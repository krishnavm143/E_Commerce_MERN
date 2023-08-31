import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts } from '../slices/productsApiSlice'
import Loader from '../components/Loader'
const HomeScreen = () => {
  const dispatch = useDispatch()
  const { products, error, status } = useSelector(state => state.products)
  console.log(products)
  useEffect(() => {
    const fetchProductsAsync = async () => {
      dispatch(fetchAllProducts())
    }
    fetchProductsAsync()
  }, [dispatch])
  return (
    <>
      {status === 'loading' ? (<Loader/>) : error ? (<h2>Something went wrong</h2>) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {
              products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))
            }
          </Row>
        </>
      )}

    </>
  )
}

export default HomeScreen