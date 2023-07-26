import React, { useEffect, useRef, useState } from 'react'

import { Container, Row, Col } from 'reactstrap'
import Helmet from '../components/Helmet/Helmet'
import CommoSection from '../components/UI/CommoSection'
import { useParams } from 'react-router-dom'
import products from '../assets/data/products'
import '../styles/product-details.css'

import { AiTwotoneStar } from 'react-icons/ai'
import { motion } from 'framer-motion'
import ProductsList from '../components/UI/ProductsList'
import { useDispatch } from 'react-redux'
import { cartActions } from '../redux/slices/cartSlice'
import { toast } from 'react-toastify'

const ProductDetails = () => {

    const [rating, setRating] = useState('')
    const [tab, setTab] = useState('desc')
    const reviewUser = useRef('')
    const reviewMsg = useRef('')
    const dispatch = useDispatch()

    const { id } = useParams()
    const product = products.find(item => item.id === id)

    const { imgUrl, productName, price, avgRating, reviews, description, shortDesc, category } = product

    const relatedProducts = products.filter(item => item.category === category)

    const submitHundler = e => {
        e.preventDefault()

        const reviewUserName = reviewUser.current.value
        const reviewUserMsg = reviewMsg.current.value

        const reviewObj = {
            userName: reviewUserName,
            text: reviewUserMsg,
            rating,
        }
        console.log(reviewObj)
        if (reviewUserName && reviewUserMsg) { toast.success('отправлено') }
    }

    const addToCart = () => {
        dispatch(cartActions.addItem({
            id,
            image: imgUrl,
            productName,
            price,
        }))
        toast.success(`Добавлено в корзину! `)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [product])

    return <Helmet title={productName}>
        <CommoSection title={productName} />pri
        <section className='pt-0 '>
            <Container>
                <Row className='d-flex'>
                    <Col lg='6'>
                        <img src={imgUrl} alt="" />
                    </Col>
                    <Col lg='6'>
                        <div className="product__details
                          mb-10 ">
                            <h2>productName</h2>
                            <div className="product__rating mt-10 mb-10 d-flex align-items-center gap-1 mb-3">
                                <span ><AiTwotoneStar className='start' /></span>
                                <span className='start'><AiTwotoneStar /></span>
                                <span className='start'><AiTwotoneStar /></span>
                                <span className='start'><AiTwotoneStar /></span>
                                <span className='start'><AiTwotoneStar /></span>
                                <p>({avgRating}ratings)</p>
                            </div>
                        </div>
                        <div className='d-flex align-items-center gap-5'>
                            <span className='product__price'>{price}</span>
                            <span>Category:{category.toUpperCase()}</span>
                        </div>
                        <p className='mt-3'>{shortDesc}</p>
                        <motion.button onClick={addToCart} whileTap={{ scale: 1.2 }} className="buy__btn mt-5 ">Add to Cart</motion.button>
                    </Col>
                </Row>
            </Container>
        </section>
        <section>
            <Container>
                <Row>
                    <Col lg='12' className=''>
                        <div className="tab__wrapper d-flex align-items-center gap-5">
                            <h6 className={`${tab === 'desc' ? 'active__tab' : ''}`} onClick={() => setTab('desc')}>Description</h6>
                            <h6 className={`${tab === 'rev' ? 'active__tab' : ''}`} onClick={() => setTab('rev')}>Reviews({reviews.length})</h6>
                        </div>

                        {
                            tab === 'desc' ? <div className='tab__content mt-5'>
                                <p>{description}</p>
                            </div> : <div className="product__review mt-5">
                                <div className="review__wrapper">
                                    <ul>
                                        {reviews?.map((item, index) =>
                                            <li key={index} className='mb-4'>
                                                <h6>Jhon Doe</h6>
                                                <span>{item.rating} (rating)</span>
                                                <p>{item.text}</p></li>
                                        )}
                                    </ul>
                                    <div className="review__form">
                                        <form onSubmit={submitHundler} className=''>
                                            <div className="form__group">
                                                <input type="text"
                                                    placeholder='Enter name' ref={reviewUser}
                                                    required
                                                />

                                            </div>
                                            <div className="form__group d-flex gap-2 fs-10">
                                                <motion.span whileTap={{ scale: 1.4 }} onClick={() => setRating(1)}>1<AiTwotoneStar /> </motion.span>
                                                <motion.span whileTap={{ scale: 1.4 }} onClick={() => setRating(2)}>2<AiTwotoneStar /> </motion.span>
                                                <motion.span whileTap={{ scale: 1.4 }} onClick={() => setRating(3)}>3<AiTwotoneStar /></motion.span>
                                                <motion.span whileTap={{ scale: 1.4 }} onClick={() => setRating(4)}>4<AiTwotoneStar /></motion.span>
                                                <motion.span whileTap={{ scale: 1.4 }} onClick={() => setRating(5)}>5<AiTwotoneStar /> </motion.span>


                                            </div>
                                            <div className="form__group">
                                                <textarea rows={4} type='text' className='mt-5' placeholder='Review message...' ref={reviewMsg}
                                                    required />
                                            </div>
                                            <button type='submit' className='buy__btn'>Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        }

                        <div className="tab__content mt-5">
                            <p>{description}</p>
                        </div>
                    </Col>
                    <Col lg='12' className='mt-5'>
                        <h2 className="related__title">You might also like</h2>
                    </Col>
                    <ProductsList data={relatedProducts} />
                </Row>
            </Container>
        </section>
    </Helmet>
}

export default ProductDetails