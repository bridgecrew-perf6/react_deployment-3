// Core Imports
import React, { useState, useEffect } from 'react';

import Config from '../../config'

// Quick access side cart
const Product = ({ product, delCallback, editCallback }) => {

    // Initial state
    const [productQty, setProductQty] = useState(0);
    const [productSize, setProductSize] = useState('');

    // This is needed to update initially the qty correctly
    useEffect(() => setProductQty(product.qty), [product.qty]);

    const deleteProductFromCart = () => {

        // TODO: Maybe show a warning?

        if (delCallback)
        {
            delCallback(product.id);
        }
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

        setProductSize(newValue);

        if (editCallback)
        {
            editCallback(product, newValue, 'size');
        }
    }

    const renderSizeSelector = () => {

        return (
            <select className="select-size" style={{ height:40, width: 65, paddingLeft: 10, paddingRight: 5 }} onChange={changeProductSize} value={product.size}>
                {Config.SIZES.map(option => <option key={option.code} value={option.code}>{option.code}</option>)}
            </select>
        );
    }

    // Main Render
    return (
        <tr>
            <td className="product-thumbnail">
                <a href={`/design/${product.productType}/edit/${product.id}/print/${product.category.printingType._id}`}>
                    <img className="image-product-cart-full" src={product.image} alt="product images" />
                </a>
            </td>
            <td className="product-name"><a href={`/design/${product.productType}/edit/${product.id}/print/${product.category.printingType._id}`}>{product.name}</a></td>
            <td className="product-price"><span className="amount">${product.price}</span></td>
            <td className="product-quantity"><input type="number" value={productQty} onChange={onChangeQty} /></td>
            <td className="product-size">{renderSizeSelector()}</td>
            <td className="product-subtotal">${(product.price * productQty).toFixed(2)}</td>
            <td className="product-remove"><a href="javascript:void(0)" title="Remove this item" onClick={deleteProductFromCart}><i className="zmdi zmdi-close"></i></a></td>
        </tr>
    );
};

export default Product;