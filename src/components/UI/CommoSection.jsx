import React from 'react'
import { Container } from 'reactstrap'
import '../../styles/common-section.css'

const CommoSection = ({ title }) => {
    return <section className="commoon__section">
        <Container className='text-center'>
            <h1 className='text-white'>{title}</h1>
        </Container>
    </section>

}

export default CommoSection