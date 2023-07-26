

import React, { useState } from 'react'
import { Container, Row } from 'reactstrap'

import '../styles/admin-nav.css'

import { BiSearch } from 'react-icons/bi'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { AiOutlineSetting } from 'react-icons/ai'

import useAuth from '../custom-hooks/useAuth'
import { Link } from 'react-router-dom'


const admin__nav = [
    {
        display: 'Dashboard',
        path: '/dashboard'
    },
    {
        display: 'All-Products',
        path: '/dashboard/all-products'
    },
    {
        display: 'Orders',
        path: '/dashboard/orders'
    },
    {
        display: 'Users',
        path: '/dashboard/users'
    },
]

const AdminNav = () => {
    const [activeItem, setActiveItem] = useState(0)
    const { currentUser } = useAuth()

    return (
        <>

            <header className="admin__header">
                <div className="admin__nav-top">
                    <Container>
                        <div className="admin__nav-wrapper-top">
                            <div className="logo">
                                <h2>Multimart</h2>
                            </div>

                            <div className="search__box">

                                <input type="text" placeholder='Search...' />
                                <span><BiSearch /></span>
                            </div>
                            <div className="admin__nav-top-right">

                                <span><IoIosNotificationsOutline /></span>
                                <span><AiOutlineSetting /></span>
                                <img src={currentUser.photoURL} alt="" />
                            </div>

                        </div>
                    </Container>
                </div>
            </header>
            <section className="admin__menu p-0">
                <Container>
                    <Row>
                        <div className="admin__navigation">
                            <ul className="admin__menu-list">
                                {
                                    admin__nav.map((item, i) => (
                                        <li key={i} onClick={() => setActiveItem(i)} className="admin__menu-item">
                                            <Link className={activeItem === i && 'active__admin-menu'} to={item.path}>{item.display}</Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>

                    </Row>
                </Container>
            </section>
        </>
    )

}

export default AdminNav