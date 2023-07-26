import React, { useState } from 'react'
import Helmet from '../components/Helmet/Helmet'
import CommoSection from '../components/UI/CommoSection'
import { Col, Container, Row } from 'reactstrap'
import '../../src/styles/shop.css'

import { BiSearchAlt2 } from 'react-icons/bi'
import products from '../assets/data/products'
import ProductsList from '../components/UI/ProductsList'

const Shop = () => {

    const [productsData, setProductsData] = useState(products)

    const handlefilter = (e) => {
        const filterValue = e.target.value
        if (filterValue === 'sofa') {
            const filteredProducts = products.filter(item => item.category === 'sofa')

            setProductsData(filteredProducts)
        }
        if (filterValue === 'mobile') {
            const filteredProducts = products.filter(item => item.category === 'mobile')

            setProductsData(filteredProducts)
        }
        if (filterValue === 'chair') {
            const filteredProducts = products.filter(item => item.category === 'chair')

            setProductsData(filteredProducts)
        }
        if (filterValue === 'watch') {
            const filteredProducts = products.filter(item => item.category === 'watch')

            setProductsData(filteredProducts)
        }
        if (filterValue === 'wireless') {
            const filteredProducts = products.filter(item => item.category === 'wireless')

            setProductsData(filteredProducts)
        }
    }

    const handleSearch = (e) => {
        const searchTerm = e.target.value
        const searchedProducts = products.filter(item => item.productName.toLowerCase().includes(searchTerm.toLowerCase()))
        setProductsData(searchedProducts)
    }
    console.log(products)

    const sortBy = e => {

        const value = e.target.value

        if (value === 'up') {
            const sortedUp = products.sort((a, b) => b.price > a.price ? -1 : 1)
            setProductsData(sortedUp)

        } if (value === 'down') {
            const sortedDown = products.sort((a, b) => b.price < a.price ? -1 : 1)
            setProductsData(sortedDown)
        }
    }



    return (
        <Helmet title='Shop'>
            <CommoSection title='Products' />


            <section>
                <Container>
                    <Row>
                        <Col lg='3' md='3'>
                            <div className="filter__widget mb-2">
                                <select onChange={handlefilter} name="" id="">
                                    <option>Filter by Category</option>
                                    <option value="sofa">Sofa</option>
                                    <option value="mobile">Mobile</option>
                                    <option value="chair">Chair</option>
                                    <option value="watch">Watch</option>
                                    <option value="wireless">Wireless</option>
                                </select>
                            </div>
                        </Col>
                        <Col lg='3' md='3'>
                            <div className="filter__widget mb-2">
                                <select onChange={sortBy} name="" id="">
                                    <option>Sort By</option>
                                    <option value="up">По возрастанию</option>
                                    <option value="down">По убыванию</option>
                                </select>
                            </div>
                        </Col>
                        <Col lg='6' md='12'>
                            <div className="search__box">
                                <input type="text" placeholder='Search....' onChange={handleSearch} />
                                <span><BiSearchAlt2 /></span>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <section>
                    <Container>
                        <Row>
                            {
                                productsData.length === 0 ? <h1>No products are found</h1> : <ProductsList data={productsData} />
                            }
                        </Row>
                    </Container>
                </section>
            </section>
        </Helmet>
    )
}

export default Shop