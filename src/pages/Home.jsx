import React, { useEffect, useState } from 'react'
import Helmet from '../components/Helmet/Helmet'
import { Col, Container, Row } from 'reactstrap'
import '../styles/home.css'

import hero_img from '../assets/images/hero-img.png'
import counterImg from '../assets/images/counter-timer-img.png'

import { Link } from 'react-router-dom'

import { motion } from 'framer-motion'
import Services from '../services/Services'
import ProductsList from '../components/UI/ProductsList'
import products from '../assets/data/products'
import Clock from '../components/UI/Clock'

const Home = () => {

    const [trendingProducts, setTrendingProducts] = useState([])
    const [bestSalesProducts, setBestSalesProducts] = useState([])
    const [mobileProducts, setMobileProducts] = useState([])
    const [wirelessProducts, setWirelessProducts] = useState([])
    const [popularProducts, setPopularProducts] = useState([])

    const year = new Date().getFullYear()

    useEffect(() => {
        const filteredTrendingProducts = products.filter(item => item.category === 'chair')
        const filteredBeastSalesProducts = products.filter(item => item.category === 'sofa')
        const filteredMobileSalesProducts = products.filter(item => item.category === 'mobile')
        const filteredWirelessProducts = products.filter(item => item.category === 'wireless')
        const filteredPopularProducts = products.filter(item => item.category === 'watch')


        setTrendingProducts(filteredTrendingProducts)
        setBestSalesProducts(filteredBeastSalesProducts)
        setMobileProducts(filteredMobileSalesProducts)
        setWirelessProducts(filteredWirelessProducts)
        setPopularProducts(filteredPopularProducts)
    }, [])

    return (
        <Helmet title='Home'>
            <section className="hero__section">
                <Container>
                    <Row>
                        <Col lg='6' md='6'>
                            <div className="hero__content">
                                <p className="hero__subtitle">Trending product in {year}</p>
                                <h2>Make your Interior More Minimalistic & Modern</h2>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error porro accusantium asperiores voluptate ut ea dolor at quos earum reprehenderit.</p>
                                <motion.button whileTap={{ scale: 1.2 }} className="shop__btn">
                                    <Link to='/shop'>SHOP NOW</Link>
                                </motion.button>
                            </div>
                        </Col>
                        <Col lg='6' md='6'>
                            <div className="hero__img">
                                <img src={hero_img} alt="" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Services />
            <section className="trending__products">
                <Container>
                    <Row>
                        <Col lg='12' className='text-center'>
                            <h2 className="section__title">Trending Products</h2>
                        </Col>
                        <ProductsList data={trendingProducts} />
                    </Row>
                </Container>
            </section>
            <section className="best__sales">
                <Container>
                    <Row >
                        <Col lg='12' className='text-center '>
                            <h2 className="section__title">Best Sales</h2>
                        </Col>
                        <ProductsList data={bestSalesProducts} />
                    </Row>
                </Container>
            </section>
            {/* <section className="timer__count">
                <Container>
                    <Row>
                        <Col lg='6' md='6'>
                            <div className="clock__top-content">
                                <h4 className='text-white fs-6 mb-2'>Limited offers</h4>
                                <h3 className='text-white fs-6 mb-3'>Quality Armchair</h3>
                            </div>
                            <Clock />
                            <motion.button whileHover={{ scale: 1.2 }} className="buy__btn store__btn">
                                <Link to='/shop'>
                                    Visit Store
                                </Link>
                            </motion.button>
                        </Col>
                        <Col lg='6' md='6' className='text-end'>
                            <img src={counterImg} alt="" />
                        </Col>
                    </Row>
                </Container>
            </section> */}
            <section className="new__arrivals">
                <Container>
                    <Row>
                        <Col lg='12' className='text-center mb-5'>
                            <h2 className="section__title">New Arrivals</h2>

                        </Col>
                        <ProductsList data={mobileProducts} />
                        <ProductsList data={wirelessProducts} />
                    </Row>
                </Container>
            </section>
            <section className="popular__category">
                <Container>
                    <Row>
                        <Col lg='12' className='text-center mb-5'>
                            <h2 className="section__title">Popular in Categoty</h2>

                        </Col>
                        <ProductsList data={popularProducts} />
                    </Row>
                </Container>
            </section>
        </Helmet>
    )
}

export default Home