import React from 'react'

import '../../styles/product-card.css'

import { AiOutlinePlus } from 'react-icons/ai'
import { Col } from 'reactstrap'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux'
import { cartActions } from '../../redux/slices/cartSlice'

const ProductCard = ({ item }) => {
    const dispatch = useDispatch()

    const addToCart = () => {
        dispatch(cartActions.addItem({
            id: item.id,
            productName: item.productName,
            price: item.price,
            imgUrl: item.imgUrl
        }))
        toast.success('Добавлено в корзину!')
    }

    return (
        <Col lg='3' md='6' >
            <div className="product__item d-flex flex-column justify-content-between" style={{ minHeight: '300px' }}>
                <div className="ptoduct__img">
                    <motion.img whileHover={{ scale: 0.9 }} src={item.imgUrl} alt="" />
                </div>
                <div className="p-2 product__name">
                    <h3 className="product__name">
                        <Link to={`/shop/${item.id}`}>
                            {item.productName}
                        </Link>
                    </h3>
                    <span >{item.category}</span>
                </div>
                <div className="product__card-bottom d-flex justify-content-between align-items-center">
                    <span className="price">${item.price}</span>
                    <motion.span whileTap={{ scale: 0.6 }} className='plus__icon' onClick={addToCart}><AiOutlinePlus /></motion.span>
                </div>
            </div>

        </Col>
    )
}

export default ProductCard