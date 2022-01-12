// Core Imports
import React, { useState, useEffect } from 'react';

// Quick access side cart
const Product = ({ product }) => {

    // Initial state
    const [productQty, setProductQty] = useState(0);
    const [productSize, setProductSize] = useState('');

    // This is needed to update initially the qty correctly
    useEffect(() => setProductQty(product.qty), [product.qty]);
    useEffect(() => setProductSize(product.size), [product.size]);

    // Main Render
    return (
        <div className="checkout-single-product">
            
            <div className="shp__pro__thumb">
     
                <img src={product.image} alt="product images" className="image-product-cart"/>
            </div>
            <div className="shp__pro__details" style={{zIndex:100}}>
                <p className="checkout-name" style={{margin:0}}>{product.name}</p>

                <div className="row" style={{ marginTop: 5 }}>
                    <div className="col-sm-6" style={{display: 'flex'}}>
                        <span className="quantity">Quantity: </span>
                        <input className="inline-product-qty" type="text" disabled value={productQty} />
                    </div>
                    <div className="col-sm-6" style={{display: 'flex'}}>
                        <span className="quantity">Size: </span>
                        <input className="inline-product-qty" type="text" disabled value={productSize} />
                    </div>
                </div>
                <div className="row" style={{ marginTop: 5 }}>
                    <div className="col-sm-6" style={{display: 'flex'}}>
                        <span className="quantity">Price: </span>
                        <span className="shp__price" style={{ marginLeft: 5, fontWeight: 500 }}>${product.price}</span>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Product;