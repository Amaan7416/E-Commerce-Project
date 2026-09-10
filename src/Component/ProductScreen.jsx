import React from "react";
import { Card } from "react-bootstrap";
import { Link } from 'react-router-dom'


function ProductScreen({ products }) {
    return (
        <>
            <Card className="my-3 p-3 rounded">
                <Link to={`/product/${products._id}`}>
                    <Card.Img 
                    varient="top"
                    src={products.image}
                    style={{
                        height:"220px",
                        objectFit:"cover"
                    }} 
                    />
                  </Link> 
                <Card.Body>
                   <Link to={`/product/${products._id}`}>
                    <Card.Title>
                        <strong>{products.name}</strong>
                    </Card.Title>
            </Link>


            <Card.Text as="h6">
            <div className="my-3">
             Rs {products.price}
            </div>
          </Card.Text>

          <Card.Text as="h6">
          
            <Link className="my-3 text-dark" to={`/product/${products._id}`}>
             View More
             </Link>
            
          </Card.Text>
        </Card.Body >
         </Card>
     
    </>
  );
}

export default ProductScreen;
