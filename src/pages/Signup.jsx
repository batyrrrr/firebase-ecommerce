import React, { useState } from 'react'
import Helmet from '../components/Helmet/Helmet'
import { Container, Row, Col, Form, FormGroup } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/login.css'

import { motion } from 'framer-motion'

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { setDoc, doc } from 'firebase/firestore'

import { auth, db } from '../firebase.config'
import { storage } from '../firebase.config'

import { toast } from 'react-toastify'

const Signup = () => {

    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [file, setFile] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const signup = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user
            console.log(user, 'loggined')

            const storageRef = ref(storage, `images/${Date.now() + userName}`)
            const uploadTask = uploadBytesResumable(storageRef, file)

            uploadTask.on((error) => {
                toast.error(error.message)
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    //update user profile
                    await updateProfile(user, {
                        displayName: userName,
                        photoURL: downloadURL,
                    })

                    //store user data in firestore database
                    await setDoc(doc(db, 'users', user.uid), {
                        uid: user.uid,
                        displayName: userName,
                        email,
                        photoURL: downloadURL
                    })
                })
            })
            setLoading(false)
            toast.success('Account created')
            navigate('/login')

        } catch (error) {
            setLoading(false)
            toast.error('something went wrong')
        }
    }

    return <Helmet title='Signup'>
        <section>
            <Container>
                <Row>
                    {
                        loading ? <Col lg='12'><h5>Loading...</h5></Col> : (
                            <Col lg='6' className='m-auto text-center'>
                                <h3 className="fw-bold fs-4 text-center  d-block mb-3 ">Signup</h3>
                                <Form className='auth__form' onSubmit={signup}>

                                    <FormGroup className='form__group'>
                                        <input type="text"
                                            value={userName}
                                            onChange={e => setUserName(e.target.value)}
                                            placeholder='Username' />
                                    </FormGroup>

                                    <FormGroup className='form__group'>
                                        <input type="email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            placeholder='Enter your email' />
                                    </FormGroup>

                                    <FormGroup className='form__group'>
                                        <input type="password" placeholder='Enter your password'
                                            value={password}
                                            onChange={e => setPassword(e.target.value)} />
                                    </FormGroup>

                                    <FormGroup className='form__group'>
                                        <input type="file"
                                            onChange={e => setFile(e.target.files[0])} />
                                    </FormGroup>

                                    <motion.button type='submit' whileTap={{ scale: 1.1 }} className="buy__btn login__btn"   >Create an account</motion.button>
                                    <p>Already have an account? <Link to='/Login'>Login</Link></p>
                                </Form>
                            </Col>
                        )
                    }
                </Row>
            </Container>
        </section>
    </Helmet>

}

export default Signup