import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Form, FormGroup, Container, Row, Col } from 'reactstrap'

import { db, storage } from '../firebase.config'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { collection, addDoc } from 'firebase/firestore'


const AddProducts = () => {

    const [enterTitle, setEnterTitle] = useState('')
    const [enterShortDesc, setEnterShortDesc] = useState('')
    const [enterDescription, setEnterDescription] = useState('')
    const [enterCategory, setEnterCategory] = useState('')
    const [enterPrice, setEnterPrice] = useState('')
    const [enterProductImg, setEnterProductImg] = useState(null)
    const [loading, setLoadinf] = useState(false)

    const addProduct = async (e) => {
        e.preventDefault()
        // const product = {
        //     title: enterTitle,
        //     shortDesc: enterShortDesc,
        //     description: enterDescription,
        //     category: enterCategory,
        //     price: enterPrice,
        //     imgUrl: enterProductImg
        // }

        // =========add product to the firebase database=====
        try {
            const docRef = await collection(db, 'products')

            const storageRef = ref(storage, `productImages/${Date.now() + enterProductImg.name}`)

            const uploadTask = uploadBytesResumable(storageRef, enterProductImg)

            uploadTask.on(() => {
                toast.error('images not uploaded!')
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
                    await addDoc(docRef, {
                        title: enterTitle,
                        shortDesc: enterShortDesc,
                        description: enterDescription,
                        category: enterCategory,
                        price: enterPrice,
                        imgUrl: downloadUrl
                    })
                })
                toast.success('product succesfully added!')

            })

        } catch (error) {

        }



        toast.success('product successfully added!')
        console.log(product, 'product')
    }

    return <section>
        <Container>
            <Row>
                <Col lg='12'>
                    <h4 className='mb-5'>Add product</h4>
                    <Form onSubmit={addProduct}>

                        <FormGroup className='form__group'>
                            <span>Product title</span>
                            <input type="text" placeholder='Double sofa' value={enterTitle} onChange={e => setEnterTitle(e.target.value)} required />
                        </FormGroup>

                        <FormGroup className='form__group'>
                            <span>Short description</span>
                            <input type="text" placeholder='lorem...' value={enterShortDesc} onChange={e => setEnterShortDesc(e.target.value)} required />
                        </FormGroup>

                        <FormGroup className='form__group'>
                            <span>Description</span>
                            <input type="text" placeholder='Description...' value={enterDescription} onChange={e => setEnterDescription(e.target.value)} required />
                        </FormGroup>

                        <div className='d-flex align-items-center justify-content-between gap-5'>
                            <FormGroup className='form__group w-100'>
                                <span>Price</span>
                                <input type="number" placeholder='$100' value={enterPrice} onChange={e => setEnterPrice(e.target.value)} required />
                            </FormGroup>

                            <FormGroup className='form__group w-100'>
                                <span>Category</span>
                                <select name="" id="" className='w-100 p-2' value={enterCategory} onChange={e => setEnterCategory(e.target.value)}>
                                    <option value="chair">Chair</option>
                                    <option value="sofa" >Sofa</option>
                                    <option value="mobile">Mobile</option>
                                    <option value="watch">Watch</option>
                                    <option value="wireless">Wireless</option>
                                </select>
                            </FormGroup>
                        </div>
                        <div>
                            <FormGroup className='form__group'>
                                <span>Product Image</span>
                                <input type="file" placeholder='$100' onChange={e => setEnterProductImg(e.target.files[0])} required />
                            </FormGroup>
                        </div>

                        <button className="buy__btn" type='submit'>Add product</button>
                    </Form>
                </Col>
            </Row>
        </Container>
    </section>
}

export default AddProducts