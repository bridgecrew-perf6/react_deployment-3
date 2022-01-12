// Core Imports
import React, { useState, useEffect } from 'react';
import { useIndexedDB } from 'react-indexed-db';

import Config from '../config'

//Product 2

const Product2 = ({ product, delCallback, editCallback }) => {
    
    // Initial state

    const [productQty, setProductQty] = useState(0);
    const [productSize, setProductSize] = useState('');
    const [productDetail, setProductDetail] = useState(JSON.parse(product.product));
    const { update } = useIndexedDB('cart');
    

    // This is needed to update initially the qty correctly
    useEffect(() => setProductQty(product.qty), [product.qty]);
    useEffect(() => setProductSize(product.size), [product.size]);
  

    const deleteProductFromCart = () => {

        // TODO: Maybe show a warning?

        delCallback(product._id);
    }

    const onChangeQty = (event) => {

        let newValue = event.target.value;

        if (newValue > 0)
        {
            setProductQty(newValue);

            if (editCallback)
            {
                editCallback(product, newValue, 'qty');
            }
        }
    }

    const changeProductSize = (event) => {

        let newValue = event.target.value;
        product.size = newValue;

        update(product).then(

            // Accept
            () => {

                setProductSize(newValue);
                window.postMessage('updateCart', '*');
                localStorage.setItem('cartLastUpdate', Date.now());
            },

            // Reject
            error => {

                console.log(error);
            }
        );

    }

    const renderSizeSelector = () => {

        return (
            <select className="select-size" onChange={changeProductSize} value={productSize}>
                {Config.SIZES.map(option => <option key={option.code} value={option.code}>{option.code}</option>)}
            </select>
        );
    }

    // Main Render
    return (
        <div>
            <div className="checkout-single-product">
                
                <div className="shp__pro__thumb">
                    <a href={`/design/${product.productType}/edit/${product._id}`} className="product-img-link">{}</a>
                    
                    <img src={`${Config.API}/${productDetail.imageURL}`}  onError={(e)=>{
                                                                    e.target.onerror = null; 
                                                                    //e.target.src="images/product/1.png"
                                                                }}
                                                                alt="Product Imagenn"
                                                                style={{maxHeight: '100px'}} />
                </div>
                <div className="shp__pro__details" style={{zIndex:100}}>
                    <a href={`/design/${product.productType}/edit/${product._id}`} className="checkout-name">{productDetail.name}</a>

                    
                </div>
                
                
            </div>
            <ul>
            <li className="subtotal">Total:${(product.order_total).toFixed(2)}</li>
            
            </ul>
        </div>
    );
};




export default Product2;