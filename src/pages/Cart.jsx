import React from 'react'
import '../styles/cart.css'
import Helmet from '../components/Helmet/Helmet'
import '../components/UI/CommoSection'
import CommoSection from '../components/UI/CommoSection'
import { Col, Container, Row } from 'reactstrap'

import { MdDeleteForever } from 'react-icons/md'

import tdImg from '../assets/images/arm-chair-01.jpg'
import { motion } from 'framer-motion'
import { cartActions } from '../redux/slices/cartSlice'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const Cart = () => {

    const { cartItems } = useSelector(state => state.cart)
    const { totalAmount } = useSelector(state => state.cart)

    return (<Helmet title='Cart'>
        <CommoSection title='Shopping Cart' />
        <section>
            <Container>
                <Row>
                    <Col lg='9'>
                        {
                            cartItems.length === 0 ? (
                                <h2 className='fs-4 text-center'>Пусто</h2>
                            ) : (
                                <table className="table bordered">
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Title</th>
                                            <th>Price</th>
                                            <th>Qty</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item, index) =>
                                            <Tr item={item} key={index} />
                                        )}
                                    </tbody>
                                </table>
                            )
                        }

                    </Col>
                    <Col lg='3'>
                        <div>
                            {
                                totalAmount && <h6 className='d-flex align-items-center justify-content-between' > Итого:
                                    <span className='fs-4 fw-bold'>{totalAmount}Тг</span>
                                </h6>
                            }
                        </div>
                        <div>
                            <button className='buy__btn'><Link to='/shop'>Continue shopping</Link></button>
                            <button className='buy__btn mt-3'><Link to='/checkout'>Проверить</Link></button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    </Helmet>)
}

const Tr = ({ item }) => {

    const dispatch = useDispatch()

    const deleteProduct = () => {
        dispatch(cartActions.deleteItem({ id: item.id }))
    }

    return <tr >
        <td><img src={item.imgUrl
        } alt="" /></td>
        <td>{item.productName}</td>
        <td>{item.price}</td>
        <td>{item.quantity}</td>
        <td><span onClick={deleteProduct}><MdDeleteForever /></span></td>
    </tr>
}

export default Cart