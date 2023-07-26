import React, { useEffect, useRef, useState } from 'react'
import { Container, Row } from 'reactstrap'
import './header.css'

import logo from '../../assets/images/eco-logo.png'
import userIccon from '../../assets/images/user-icon.png'

import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import { FiShoppingBag } from 'react-icons/fi'
import { AiOutlineHeart } from 'react-icons/ai'
import { RiMenu4Line } from 'react-icons/ri'
import { Badge } from '@mui/material'
import { useSelector } from 'react-redux'
import useAuth from '../../custom-hooks/useAuth'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase.config'
import { toast } from 'react-toastify'


const nav__link = [
    {
        path: 'home',
        display: 'Home'
    },
    {
        path: 'shop',
        display: 'Shop'
    },
    {
        path: 'cart',
        display: 'Cart'
    }
]


const Header = () => {

    const [clicked, setClicked] = useState('')

    const headerRef = useRef(null)
    const menuRef = useRef(null)
    const profileActionRef = useRef()

    const totalQuantity = useSelector(state => state.cart.totalQuantity)

    const navigate = useNavigate()
    const { currentUser } = useAuth()

    const stickyHeaderFunc = () => {
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add('sticky__header')
                console.log('scrolling')
            } else {
                headerRef.current.classList.remove('sticky__header')
            }
        })
    }
    useEffect(() => {
        stickyHeaderFunc()
        return () => window.removeEventListener('scroll', stickyHeaderFunc)
    })

    const toggleProfileActions = () => profileActionRef.current.classList.toggle('show__profileActions')

    const menuToggle = () => menuRef.current.classList.toggle('active__menu')

    const logout = () => {
        signOut(auth).then(() => {
            toast.success('Logged out succesfully')
            navigate('/home')
        }).catch(e => {
            toast.error(e.message)
        })
    }

    return <header className="header" ref={headerRef}>
        <Container>
            <Row>
                <div className="nav__wrapper">
                    <div className="logo">
                        <img src={logo} alt="" />
                        <div>
                            <h1>Multimart</h1>
                        </div>
                    </div>

                    <div className="navigation" ref={menuRef} onClick={menuToggle}>
                        <ul className="menu">
                            {
                                nav__link.map((item, index) => (
                                    <li key={index} onClick={() => setClicked(index)}
                                        className='nav__item' >
                                        <Link className={`${clicked === index ? 'nav__clicked' : ''}`} to={item.path}>{item.display}</Link>
                                    </li>
                                ))
                            }

                        </ul>
                    </div>
                    <div className="nav__icons">
                        <Badge badgeContent={1} color='primary' >
                            <span className="fav__icon _icon"><AiOutlineHeart /></span>
                        </Badge>
                        <Badge badgeContent={totalQuantity} color='primary'>
                            <span className="cart__icon _icon" onClick={() => { navigate('/cart') }}><FiShoppingBag /></span>
                        </Badge>
                        <div className='profile'>
                            <motion.img onClick={toggleProfileActions} whileTap={{ scale: 1.2 }} style={{ width: '50px', height: '50px ', cursor: 'pointer' }} src={currentUser ? currentUser.photoURL : userIccon} alt="" />

                            <div className="profile__actions" ref={profileActionRef} onClick={toggleProfileActions}>
                                {
                                    currentUser ? <span onClick={logout}>Logout</span> : <div>
                                        <Link to='/Signup'>Signup</Link>
                                        <Link to='/login'>Login</Link>
                                        <Link to='/dashboard/'>Dashboard </Link>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="mobile__menu">
                            <span onClick={menuToggle}><RiMenu4Line /></span>
                        </div>
                    </div>

                </div>
            </Row>
        </Container>
    </header>
}

export default Header