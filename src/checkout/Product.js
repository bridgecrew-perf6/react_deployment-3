// Core Imports
import React, { useState, useEffect } from 'react';
import { useIndexedDB } from 'react-indexed-db';

import Config from '../config'

// Quick access side cart
const Product = ({ product, delCallback, editCallback }) => {

    // Initial state
    const [productQty, setProductQty] = useState(0);
    const [productSize, setProductSize] = useState('');
    const { update } = useIndexedDB('cart');

    // This is needed to update initially the qty correctly
    useEffect(() => setProductQty(product.qty), [product.qty]);
    useEffect(() => setProductSize(product.size), [product.size]);

    const deleteProductFromCart = () => {

        // TODO: Maybe show a warning?

        delCallback(product.id);
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
        <div className="checkout-single-product">
            
            <div className="shp__pro__thumb">
                <a href={`/design/${product.productType}/edit/${product.id}`} className="product-img-link">{}</a>
                <img src={product.image} alt="product image" className="image-product-cart"/>
            </div>
            <div className="shp__pro__details" style={{zIndex:100}}>
                <a href={`/design/${product.productType}/edit/${product.id}`} className="checkout-name">{product.name}</a>

                <div className="row" style={{ marginTop: 5 }}>
                    <div className="col-sm-6" style={{display: 'flex'}}>
                        <span className="quantity">Quantity: </span>
                        <input className="inline-product-qty" type="number" value={productQty} onChange={onChangeQty} />
                    </div>
                    <div className="col-sm-6" style={{display: 'flex'}}>
                        <span className="quantity">Size: </span>
                        {renderSizeSelector()}
                    </div>
                </div>
                <div className="row" style={{ marginTop: 5 }}>
                    <div className="col-sm-6" style={{display: 'flex'}}>
                        <span className="quantity">Price: </span>
                        <span className="shp__price" style={{ marginLeft: 5, fontWeight: 500 }}>${product.price}</span>
                    </div>
                </div>
            </div>
            <div className="remove__btn">
                <a href="javascript:void(0)" title="Remove this item" onClick={() => deleteProductFromCart()}><i className="zmdi zmdi-close"></i></a>
            </div>
            
        </div>
    );
};

export default Product;