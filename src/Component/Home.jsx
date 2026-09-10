import React from 'react'
import products from '../products'
import {Row,Col} from 'react-bootstrap'
import ProductScreen from './ProductScreen'


function Home() {
  return (
    <div>
      <h1 className='text-center mt-2'>LATEST PRODUCTS</h1>
      <Row>
        {products.map((products)=>(
          <Col key={products._id} sm={12} md={6} lg={4} xl={4}>
           {/*  <h3>{products.name}</h3> */}
           <ProductScreen products={products}/>
          </Col>
        ))}
      </Row>
    </div>
    
  )
}

export default Home