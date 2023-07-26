import React from 'react'
import { Container, Row, Col, Form, FormGroup } from 'reactstrap'
import Helmet from '../components/Helmet/Helmet'
import CommoSection from '../components/UI/CommoSection'

import '../styles/checkout.css'
import { useSelector } from 'react-redux'

const Checkout = () => {

    const totalQty = useSelector(state => state.cart.totalQuantity)
    const totalAmount = useSelector(state => state.cart.totalAmount)

    return <Helmet title='CheckOut'>
        <CommoSection title='CheckOut' />
        <section>
            <Container>
                <Row>
                    <Col lg='8'>
                        <h6>Billing Information</h6>
                        <Form className='billing__form'>
                            <FormGroup className='form__group'>
                                <input type="text" placeholder='Enter your name' />
                            </FormGroup>

                            <FormGroup className='form__group'>
                                <input type="email" placeholder='Enter your email' />
                            </FormGroup>

                            <FormGroup className='form__group'>
                                <input type="number " placeholder='Phone number' />
                            </FormGroup>

                            <FormGroup className='form__group'>
                                <input type="text " placeholder='Street address' />
                            </FormGroup>

                            <FormGroup className='form__group'>
                                <input type="text " placeholder='City' />
                            </FormGroup>

                            <FormGroup className='form__group'>
                                <input type="text " placeholder='Postal code' />
                            </FormGroup>

                            <FormGroup className='form__group'>
                                <input type="text " placeholder='Country' />
                            </FormGroup>
                        </Form>
                    </Col>
                    <Col lg='4'>
                        <div className="checkout__cart">
                            <h6 >Total Qty: <span>{totalQty}шт.</span></h6>
                            <h6>Subtotal: <span></span></h6>
                            <span>Shipping: <br />free shipping <span>0тг</span></span>
                            <h6>Free shipping:</h6>
                            <h3>Total Cost: <span>{totalAmount}тг</span></h3>
                            <button className="buy__btn auth__btn w-100 mt-3">Оставить заявку</button>
                        </div>

                    </Col>
                </Row>
            </Container>
        </section>
    </Helmet>

}

export default Checkout