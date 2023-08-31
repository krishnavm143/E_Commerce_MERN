import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form, } from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductDetails } from '../slices/productDetailApiSlice'
import Loader from '../components/Loader'
import { addToCart } from '../slices/cartSlice'


const ProductScreen = () => {
    const [qty, setQty] = useState(1)
    const dispatch = useDispatch()
    const { productDetails: product, status, error } = useSelector(state => state.productDetail)
    // console.log('object', product)
    // const [product, setProduct] = useState({})
    const { id: productId } = useParams()
    useEffect(() => {
        const particularProduct = async () => {
            dispatch(fetchProductDetails(productId))
        }
        particularProduct()
    }, [dispatch, productId])
    // const product = products.find(p => p._id === productId)
    // console.log(product)
    const addtoCartHandler = () => {
        dispatch(addToCart({ ...product, qty }))
    }
    return (
        <>
            {status === 'loading' ? (
                <Loader />
            ) :
                error ?
                    (
                        <h2>Something Error Occured</h2>
                    ) :
                    (
                        <>
                            <Link className='btn btn-light my-3' to='/'>Go back</Link>
                            <Row>
                                <Col md={5}>
                                    <Image src={product?.image} alt={product?.name} fluid />
                                </Col>
                                <Col md={4}>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item> <h3>{product?.name}</h3></ListGroup.Item>
                                        <ListGroup.Item> <Rating value={product?.rating} text={`${product?.numReviews} reviews`} /></ListGroup.Item>
                                        <ListGroup.Item> Price : {product?.price}</ListGroup.Item>

                                        <ListGroup.Item> Description: {product?.description}</ListGroup.Item>

                                    </ListGroup>
                                </Col>
                                <Col md={3}>
                                    <Card>
                                        <ListGroup variant='flush'>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Price:</Col>
                                                    <Col><strong>{product?.price}</strong></Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Status:</Col>
                                                    <Col><strong>{product?.countInStock > 0 ? `In Stock` : `Out Of Stock`}</strong></Col>
                                                </Row>
                                            </ListGroup.Item>
                                            {product?.countInStock > 0 && (
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Qty</Col>
                                                        <Col>
                                                            <Form.Control
                                                                as='select'
                                                                value={qty}
                                                                onChange={(e) => setQty(Number(e.target.value))}
                                                            >
                                                                {[...Array(product.countInStock).keys()].map(x => (
                                                                    <option value={x + 1} key={x + 1}>{x + 1}</option>
                                                                ))}
                                                            </Form.Control>
                                                        </Col>
                                                    </Row>

                                                </ListGroup.Item>
                                            )}
                                            <ListGroup.Item>
                                                <Button
                                                    className='btn-block'
                                                    disabled={product?.countInStock === 0}
                                                    type='button'
                                                    onClick={addtoCartHandler}
                                                >
                                                    Add To cart
                                                </Button>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>
                        </>

                    )
            }
        </>
    )
}

export default ProductScreen