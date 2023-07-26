import React from 'react'
import './footer.css'
import logo from '../../assets/images/eco-logo.png'
import { Col, Container, ListGroup, ListGroupItem, Row } from 'reactstrap'
import { Link } from 'react-router-dom'

import { GoLocation } from 'react-icons/go'
import { BsTelephone } from 'react-icons/bs'
import { BsFillEnvelopeFill } from 'react-icons/bs'


const Footer = () => {

    const year = new Date().getFullYear()

    return (
        <footer className="footer">
            <Container>
                <Row className=''>
                    <Col lg='4'>
                        <div className="logo">
                            <img src={logo} alt="" />
                            <div>
                                <h1 className='text-white text-center'>Multimart</h1>
                            </div>

                        </div>
                        <p className="footer__text mt-4">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt fugiat nobis quis modi commodi hic accusamus veritatis dolore nisi at.
                        </p>
                    </Col>
                    <Col lg='3'>
                        <div className="footer__quick-links">
                            <h4 className="quick__links-title text-center" >Top Categories</h4>
                            <ListGroup className='mb-3'>
                                <ListGroupItem className='ps-0 border-0'>
                                    <Link to='#'>Mobile Phones</Link>
                                </ListGroupItem>
                                <ListGroupItem className='ps-0 border-0'>
                                    <Link to='#'>Modern Sofa</Link>
                                </ListGroupItem  >
                                <ListGroupItem className='ps-0 border-0'>
                                    <Link to='#'>Arm Chair</Link>
                                </ListGroupItem>
                                <ListGroupItem className='ps-0 border-0'>
                                    <Link to='#'>Smart Watches</Link>
                                </ListGroupItem>
                            </ListGroup>
                        </div>
                    </Col>
                    <Col lg='2' >
                        <div className="footer__quick-links">
                            <h4 className="quick__links-title text-center">Useful Links</h4>
                            <ListGroup className='footer__contact'>
                                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
                                    <Link to='/shop'>Shop</Link>
                                </ListGroupItem>
                                <ListGroupItem className='ps-0 border-0   d-flex align-items-center gap-2'>
                                    <Link to='/cart'>Cart</Link>
                                </ListGroupItem  >
                                <ListGroupItem className='ps-0 border-0  d-flex align-items-center gap-2'>
                                    <Link to='/login'>Login</Link>
                                </ListGroupItem>
                                <ListGroupItem className='ps-0 border-0  d-flex align-items-center gap-2'>
                                    <Link to='#'>Privacy Policy</Link>
                                </ListGroupItem>
                            </ListGroup>
                        </div>
                    </Col>
                    <Col lg='3'>
                        <div className="footer__quick-links">
                            <h4 className="quick__links-title text-center">Contact</h4>
                            <ListGroup className='mb-3'>
                                <ListGroupItem className='ps-0 border-0'>

                                    <p> <span><GoLocation /></span>123,Kyzylorda</p>
                                </ListGroupItem>
                                <ListGroupItem className='ps-0 border-0'>

                                    <p><span><BsTelephone /></span>+98232424</p>
                                </ListGroupItem  >
                                <ListGroupItem className='ps-0 border-0'>

                                    <p><span><BsFillEnvelopeFill /></span>example123@gmail.com</p>
                                </ListGroupItem>
                            </ListGroup>
                        </div>
                    </Col>
                    <Col lg='12'>
                        <p className="footer__copyright text-center mt-4">Copyright {year} developed by Batyr B,All rights reserved</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer